import { motion, type MotionValue } from "framer-motion";

const lats = [-60, -30, 0, 30, 60];
const meridians = Array.from({ length: 8 }, (_, i) => i * 22.5);

/** A true-3D CSS wireframe globe that rotates with scroll. */
export default function Globe({ rotate }: { rotate: MotionValue<number> }) {
  return (
    <div className="relative aspect-square w-[min(78vw,460px)]" style={{ perspective: 1300 }}>
      <motion.div
        style={{ rotateY: rotate, rotateX: -20, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {meridians.map((deg, i) => (
          <div
            key={deg}
            className={`absolute inset-0 rounded-full border ${i === 0 ? "border-accent" : "border-paper/35"}`}
            style={{ transform: `rotateY(${deg}deg)` }}
          />
        ))}
        {lats.map((a) => {
          const r = (a * Math.PI) / 180;
          return (
            <div
              key={a}
              className="absolute inset-0 rounded-full border border-paper/25"
              style={{
                transform: `translateY(${Math.sin(r) * 50}%) rotateX(90deg) scale(${Math.cos(r)})`,
              }}
            />
          );
        })}
        {/* tilted orbit ring */}
        <div
          className="absolute -inset-[12%] rounded-full border-2 border-dashed border-accent/80"
          style={{ transform: "rotateX(75deg) rotateY(12deg)" }}
        />
        {/* core */}
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_40px_10px_rgba(225,6,0,0.6)]" />
      </motion.div>
    </div>
  );
}
