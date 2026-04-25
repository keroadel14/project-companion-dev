import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { Background } from "../components/Background";

const jakarta = loadJakarta("normal", { weights: ["700", "800"] }).fontFamily;
const dm = loadDM("normal", { weights: ["400", "500"] }).fontFamily;

const problems = [
  "Scams & fake listings",
  "No verified landlords",
  "No way to compare dorms",
  "Zero student reviews",
];

export const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headerOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(spring({ frame, fps, config: { damping: 18 } }), [0, 1], [30, 0]);

  return (
    <AbsoluteFill>
      <Background tone="dark" />
      <AbsoluteFill style={{ padding: "120px 160px", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ opacity: headerOp, transform: `translateY(${headerY}px)`, marginBottom: 60 }}>
          <p style={{ fontFamily: dm, fontSize: 24, color: "#FF6B6B", letterSpacing: 6, textTransform: "uppercase", margin: 0 }}>
            The Problem
          </p>
          <h2 style={{ fontFamily: jakarta, fontSize: 96, color: "#fff", margin: "12px 0 0 0", lineHeight: 1, fontWeight: 800, letterSpacing: -3 }}>
            Finding student<br />housing is <span style={{ color: "#FF6B6B" }}>broken.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 1200 }}>
          {problems.map((p, i) => {
            const delay = 30 + i * 10;
            const op = interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateRight: "clamp" });
            const x = interpolate(
              spring({ frame: frame - delay, fps, config: { damping: 18 } }),
              [0, 1],
              [-40, 0]
            );
            return (
              <div
                key={p}
                style={{
                  opacity: op,
                  transform: `translateX(${x}px)`,
                  background: "#1A2155",
                  border: "1px solid #FF6B6B40",
                  borderRadius: 20,
                  padding: "28px 36px",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <div style={{ fontSize: 36 }}>⚠️</div>
                <p style={{ fontFamily: dm, fontSize: 30, color: "#fff", margin: 0, fontWeight: 500 }}>{p}</p>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
