import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, Img, staticFile, interpolate } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { Background } from "../components/Background";

const jakarta = loadJakarta("normal", { weights: ["700", "800"] }).fontFamily;
const dm = loadDM("normal", { weights: ["400", "500"] }).fontFamily;

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoScale = spring({ frame, fps, config: { damping: 12 } });
  const logoFloat = Math.sin(frame / 20) * 8;
  const titleOp = interpolate(frame, [15, 40], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(spring({ frame: frame - 15, fps, config: { damping: 18 } }), [0, 1], [40, 0]);
  const urlOp = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: "clamp" });
  const tagOp = interpolate(frame, [55, 80], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Background tone="dark" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 36 }}>
        <div style={{
          transform: `scale(${logoScale}) translateY(${logoFloat}px)`,
          width: 200, height: 200, borderRadius: "50%", overflow: "hidden",
          boxShadow: "0 30px 100px #3F3DCB99",
          border: "4px solid #ffffff20",
        }}>
          <Img src={staticFile("images/dormlink-logo.jpeg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: "center" }}>
          <h1 style={{
            fontFamily: jakarta, fontSize: 160, color: "#fff", margin: 0,
            letterSpacing: -5, fontWeight: 800, lineHeight: 1,
          }}>DORMLINK</h1>
        </div>
        <p style={{
          opacity: tagOp, fontFamily: dm, fontSize: 36, color: "#A8B0E8",
          margin: 0, textAlign: "center", maxWidth: 1200, lineHeight: 1.3,
        }}>
          Where Egyptian students<br/>find a place to call home.
        </p>
        <div style={{
          opacity: urlOp,
          marginTop: 20,
          padding: "18px 40px",
          background: "linear-gradient(90deg, #3F3DCB, #6B5BFF)",
          borderRadius: 999,
          fontFamily: dm, fontSize: 28, color: "#fff", fontWeight: 600,
          letterSpacing: 2,
          boxShadow: "0 20px 60px #3F3DCB80",
        }}>
          dormlink.com
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
