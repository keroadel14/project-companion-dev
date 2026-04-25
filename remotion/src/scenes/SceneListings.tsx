import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { Background } from "../components/Background";

const jakarta = loadJakarta("normal", { weights: ["700", "800"] }).fontFamily;
const dm = loadDM("normal", { weights: ["400", "500"] }).fontFamily;

const listings = [
  { name: "Maadi Modern Studio", city: "Cairo", price: 6500, rating: 4.9 },
  { name: "Smouha Garden Suite", city: "Alexandria", price: 5200, rating: 4.7 },
  { name: "New Cairo Dorm Loft", city: "Cairo", price: 8000, rating: 4.8 },
];

export const SceneListings: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headerOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(spring({ frame, fps, config: { damping: 18 } }), [0, 1], [30, 0]);

  return (
    <AbsoluteFill>
      <Background tone="dark" />
      <AbsoluteFill style={{ padding: "100px 140px", flexDirection: "column", gap: 60 }}>
        <div style={{ opacity: headerOp, transform: `translateY(${headerY}px)` }}>
          <p style={{ fontFamily: dm, fontSize: 22, color: "#6B5BFF", letterSpacing: 6, textTransform: "uppercase", margin: 0 }}>
            Browse
          </p>
          <h2 style={{ fontFamily: jakarta, fontSize: 88, color: "#fff", margin: "8px 0 0 0", fontWeight: 800, letterSpacing: -3 }}>
            Verified dorms across Egypt.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, flex: 1 }}>
          {listings.map((l, i) => {
            const delay = 25 + i * 12;
            const op = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
            const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
            const scale = interpolate(s, [0, 1], [0.85, 1]);
            const float = Math.sin((frame - delay) / 25) * 6;
            return (
              <div
                key={l.name}
                style={{
                  opacity: op,
                  transform: `scale(${scale}) translateY(${float}px)`,
                  background: "#fff",
                  borderRadius: 28,
                  overflow: "hidden",
                  boxShadow: "0 30px 80px #00000050",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{
                  height: 240,
                  background: `linear-gradient(135deg, hsl(${230 + i * 30}, 60%, 55%), hsl(${260 + i * 20}, 70%, 65%))`,
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute", top: 16, left: 16,
                    background: "#10B981", color: "#fff",
                    padding: "6px 14px", borderRadius: 999,
                    fontFamily: dm, fontSize: 16, fontWeight: 600,
                  }}>✓ Verified</div>
                  <div style={{
                    position: "absolute", top: 16, right: 16,
                    background: "#000000aa", color: "#FFD700",
                    padding: "6px 14px", borderRadius: 999,
                    fontFamily: dm, fontSize: 18, fontWeight: 600,
                  }}>★ {l.rating}</div>
                </div>
                <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 8 }}>
                  <p style={{ fontFamily: dm, fontSize: 16, color: "#888", margin: 0 }}>{l.city}</p>
                  <h3 style={{ fontFamily: jakarta, fontSize: 28, color: "#0F1535", margin: 0, fontWeight: 700 }}>{l.name}</h3>
                  <p style={{ fontFamily: jakarta, fontSize: 32, color: "#3F3DCB", margin: "8px 0 0 0", fontWeight: 800 }}>
                    {l.price} <span style={{ fontSize: 18, color: "#888", fontWeight: 500 }}>EGP/mo</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
