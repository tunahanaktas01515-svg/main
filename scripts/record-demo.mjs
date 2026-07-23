import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:4173'
const OUT = '/tmp/rec'
mkdirSync(OUT, { recursive: true })

const cursorInit = () => {
  const c = document.createElement('div')
  c.id = '__cur'
  c.style.cssText = [
    'position:fixed', 'left:0', 'top:0', 'width:22px', 'height:22px',
    'margin-left:-4px', 'margin-top:-2px', 'z-index:999999', 'pointer-events:none',
    'transition:transform .05s linear',
  ].join(';')
  c.innerHTML =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="1"><path d="M4 2 L4 20 L9 15 L12 22 L15 21 L12 14 L19 14 Z"/></svg>'
  document.body.appendChild(c)
  const ring = document.createElement('div')
  ring.id = '__ring'
  ring.style.cssText = [
    'position:fixed', 'left:0', 'top:0', 'width:34px', 'height:34px',
    'margin-left:-17px', 'margin-top:-17px', 'border-radius:50%',
    'border:2px solid rgba(245,196,81,.9)', 'z-index:999998', 'pointer-events:none',
    'opacity:0', 'transform:scale(.4)', 'transition:opacity .25s, transform .25s',
  ].join(';')
  document.body.appendChild(ring)
  window.__setCur = (x, y) => {
    c.style.transform = `translate(${x}px,${y}px)`
    ring.style.left = x + 'px'
    ring.style.top = y + 'px'
  }
  window.__click = (x, y) => {
    ring.style.left = x + 'px'
    ring.style.top = y + 'px'
    ring.style.opacity = '1'
    ring.style.transform = 'scale(1)'
    setTimeout(() => {
      ring.style.opacity = '0'
      ring.style.transform = 'scale(.4)'
    }, 300)
  }
}

const run = async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: { dir: OUT, size: { width: 1280, height: 800 } },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()

  const injectCursor = async () => {
    await page.addStyleTag({ content: '*{cursor:none !important}' })
    await page.evaluate(cursorInit)
  }

  let cur = { x: 120, y: 60 }
  const moveTo = async (x, y, steps = 26) => {
    const sx = cur.x
    const sy = cur.y
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // easeInOut
      const px = sx + (x - sx) * e
      const py = sy + (y - sy) * e
      await page.mouse.move(px, py)
      await page.evaluate(([X, Y]) => window.__setCur(X, Y), [px, py])
      await page.waitForTimeout(14)
    }
    cur = { x, y }
  }
  const clickSel = async (sel) => {
    const box = await page.locator(sel).first().boundingBox()
    if (!box) throw new Error('no box for ' + sel)
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await moveTo(x, y)
    await page.evaluate(([X, Y]) => window.__click(X, Y), [x, y])
    await page.waitForTimeout(180)
    await page.mouse.click(x, y)
  }

  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await injectCursor()
  await page.waitForTimeout(1200)

  // Ana Sayfa -> Borsa
  await clickSel('a[href="/borsa"]')
  await page.waitForTimeout(700) // stay < 1s on markets
  await injectCursor()

  // Borsa -> Ana Sayfa (home icon)
  await clickSel('a[href="/"]')
  await page.waitForTimeout(1200)

  await context.close()
  await browser.close()
  console.log('done')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
