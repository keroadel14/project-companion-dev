import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, Img, staticFile, interpolate } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { Background } from "../components/Background";

const jakarta = loadJakarta("normal", { weights: ["700", "800"] }).fontFamily;
const dm = loadDM("normal", { weights: ["400", "500"] }).fontFamily;

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const logoRot = interpolate(frame, [0, 60], [-30, 0], { extrapolateRight: "clamp" });
  const titleY = interpolate(spring({ frame: frame - 18, fps, config: { damping: 18 } }), [0, 1], [40, 0]);
  const titleOpacity = interpolate(frame, [18, 40], [0, 1], { extrapolateRight: "clamp" });
  const subY = interpolate(spring({ frame: frame - 32, fps, config: { damping: 18 } }), [0, 1], [30, 0]);
  const subOpacity = interpolate(frame, [32, 55], [0, 1], { extrapolateRight: "clamp" });
  const ringScale = interpolate(frame, [0, 90], [0.6, 1.4]);
  const ringOpacity = interpolate(frame, [0, 90], [0.5, 0]);

  return (
    <AbsoluteFill>
      <Background tone="dark" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 30 }}>
        <div style={{ position: "relative", width: 240, height: 240 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "3px solid #6B5BFF",
              transform: `scale(${ringScale})`,
              opacity: ringOpacity,
            }}
          />
          <div
            style={{
              transform: `scale(${logoScale}) rotate(${logoRot}deg)`,
              width: 240,
              height: 240,
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 30px 80px #3F3DCB80",
              border: "4px solid #ffffff20",
            }}
          >
            <Img src={staticFile("images/dormlink-logo.jpeg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        <div style={{ transform: `translateY(${titleY}px)`, opacity: titleOpacity, textAlign: "center" }}>
          <h1 style={{ fontFamily: jakarta, fontSize: 140, color: "#fff", margin: 0, letterSpacing: -4, fontWeight: 800 }}>
            DORMLINK
          </h1>
        </div>
        <div style={{ transform: `translateY(${subY}px)`, opacity: subOpacity, textAlign: "center" }}>
          <p style={{ fontFamily: dm, fontSize: 32, color: "#A8B0E8", margin: 0, letterSpacing: 8, textTransform: "uppercase" }}>
            Student Housing · Reimagined
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
