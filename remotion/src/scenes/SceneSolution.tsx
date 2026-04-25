import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, Img, staticFile, interpolate } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { Background } from "../components/Background";

const jakarta = loadJakarta("normal", { weights: ["700", "800"] }).fontFamily;
const dm = loadDM("normal", { weights: ["400", "500"] }).fontFamily;

export const SceneSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const logoScale = spring({ frame, fps, config: { damping: 14 } });
  const titleOp = interpolate(frame, [15, 40], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(spring({ frame: frame - 15, fps, config: { damping: 18 } }), [0, 1], [30, 0]);
  const lineW = interpolate(spring({ frame: frame - 30, fps, config: { damping: 200, durationInFrames: 40 } }), [0, 1], [0, 100]);
  const subOp = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Background tone="dark" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 40, padding: 80 }}>
        <div style={{ opacity: logoOp, transform: `scale(${logoScale})`, width: 140, height: 140, borderRadius: "50%", overflow: "hidden", boxShadow: "0 20px 60px #3F3DCB80" }}>
          <Img src={staticFile("images/dormlink-logo.jpeg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: "center" }}>
          <p style={{ fontFamily: dm, fontSize: 24, color: "#6B5BFF", letterSpacing: 8, textTransform: "uppercase", margin: 0 }}>
            Introducing
          </p>
          <h2 style={{ fontFamily: jakarta, fontSize: 130, color: "#fff", margin: "16px 0", lineHeight: 1, fontWeight: 800, letterSpacing: -4 }}>
            One platform.<br />
            <span style={{
              background: "linear-gradient(90deg, #6B5BFF, #A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Total trust.</span>
          </h2>
        </div>
        <div style={{ width: `${lineW}%`, maxWidth: 600, height: 4, background: "linear-gradient(90deg, #3F3DCB, #A78BFA)", borderRadius: 2 }} />
        <p style={{ opacity: subOp, fontFamily: dm, fontSize: 32, color: "#A8B0E8", margin: 0, textAlign: "center", maxWidth: 1100 }}>
          Verified listings · Verified landlords · Verified students
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
