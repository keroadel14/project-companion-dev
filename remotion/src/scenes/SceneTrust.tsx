import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { Background } from "../components/Background";

const jakarta = loadJakarta("normal", { weights: ["700", "800"] }).fontFamily;
const dm = loadDM("normal", { weights: ["400", "500"] }).fontFamily;

const stats = [
  { num: "100%", label: "ID-verified users" },
  { num: "3-Way", label: "Review system" },
  { num: "27", label: "Egyptian cities covered" },
  { num: "0", label: "Editable / deletable messages" },
];

export const SceneTrust: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headerOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(spring({ frame, fps, config: { damping: 18 } }), [0, 1], [30, 0]);

  return (
    <AbsoluteFill>
      <Background tone="dark" />
      <AbsoluteFill style={{ padding: "120px 140px", flexDirection: "column", justifyContent: "center", gap: 80 }}>
        <div style={{ opacity: headerOp, transform: `translateY(${headerY}px)`, textAlign: "center" }}>
          <p style={{ fontFamily: dm, fontSize: 24, color: "#10B981", letterSpacing: 6, textTransform: "uppercase", margin: 0 }}>
            Trust by design
          </p>
          <h2 style={{ fontFamily: jakarta, fontSize: 96, color: "#fff", margin: "12px 0 0 0", fontWeight: 800, letterSpacing: -3 }}>
            Numbers that <span style={{ color: "#10B981" }}>matter</span>.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {stats.map((s, i) => {
            const delay = 25 + i * 12;
            const op = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
            const sp = spring({ frame: frame - delay, fps, config: { damping: 12 } });
            const scale = interpolate(sp, [0, 1], [0.6, 1]);
            return (
              <div
                key={s.label}
                style={{
                  opacity: op,
                  transform: `scale(${scale})`,
                  background: "#1A2155",
                  border: "1px solid #3F3DCB60",
                  borderRadius: 28,
                  padding: 40,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <p style={{
                  fontFamily: jakarta, fontSize: 84, margin: 0, fontWeight: 800,
                  background: "linear-gradient(135deg, #6B5BFF, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: -3,
                }}>{s.num}</p>
                <p style={{ fontFamily: dm, fontSize: 22, color: "#A8B0E8", margin: 0 }}>{s.label}</p>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
