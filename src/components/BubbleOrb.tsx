export default function BubbleOrb() {
  return (
    <div className="bubble-orb-wrap relative w-10 h-10 flex-shrink-0 bg-transparent" aria-hidden="true">
      <img
        src="/bubble-orb.png?v=2"
        alt=""
        className="bubble-orb w-full h-full object-contain select-none pointer-events-none bg-transparent"
        draggable={false}
      />
    </div>
  )
}
