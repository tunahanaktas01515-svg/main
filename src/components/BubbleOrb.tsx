export default function BubbleOrb() {
  return (
    <div className="bubble-orb-wrap relative w-10 h-10 flex-shrink-0" aria-hidden="true">
      <img
        src="/bubble-orb.png"
        alt=""
        className="bubble-orb w-full h-full object-contain select-none pointer-events-none"
        draggable={false}
      />
    </div>
  )
}
