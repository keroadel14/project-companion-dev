import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, Img, staticFile, interpolate } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { Background } from "../../components/Background";

const jakarta = loadJakarta("normal", { weights: ["700", "800"] }).fontFamily;
const dm = loadDM("normal", { weights: ["400", "500"] }).fontFamily;

export const SceneFlowOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoScale = spring({ frame, fps, config: { damping: 12 } });
  const titleOp = interpolate(frame, [15, 40], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(spring({ frame: frame - 15, fps, config: { damping: 18 } }), [0, 1], [40, 0]);
  const tagOp = interpolate(frame, [45, 70], [0, 1], { extrapolateRight: "clamp" });
  const urlOp = interpolate(frame, [60, 85], [0, 1], { extrapolateRight: "clamp" });
  const float = Math.sin(frame / 18) * 8;

  return (
    <AbsoluteFill>
      <Background tone="dark" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 32 }}>
        <div style={{
          transform: `scale(${logoScale}) translateY(${float}px)`,
          width: 180, height: 180, borderRadius: "50%", overflow: "hidden",
          boxShadow: "0 30px 100px #3F3DCB99",
          border: "4px solid #ffffff20",
        }}>
          <Img src={staticFile("images/dormlink-logo.jpeg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: "center" }}>
          <h1 style={{
            fontFamily: jakarta, fontSize: 130, color: "#fff", margin: 0,
            letterSpacing: -4, fontWeight: 800, lineHeight: 1,
          }}>
            Search. Chat.<br/>
            <span style={{
              background: "linear-gradient(90deg, #6B5BFF, #A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Move in.</span>
          </h1>
        </div>
        <p style={{
          opacity: tagOp, fontFamily: dm, fontSize: 30, color: "#A8B0E8",
          margin: 0, textAlign: "center",
        }}>
          The simplest way to find verified student housing in Egypt.
        </p>
        <div style={{
          opacity: urlOp, marginTop: 20,
          padding: "18px 44px",
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
