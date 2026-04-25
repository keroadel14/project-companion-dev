import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const Background: React.FC<{ tone?: "dark" | "light" }> = ({ tone = "dark" }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 60) * 40;
  const drift2 = Math.cos(frame / 80) * 60;
  const bg = tone === "dark" ? "#0F1535" : "#F5F6FF";
  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          left: -200 + drift,
          top: -200 + drift2,
          borderRadius: "50%",
          background: "radial-gradient(circle, #3F3DCB55, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          right: -150 - drift,
          bottom: -150 - drift2,
          borderRadius: "50%",
          background: "radial-gradient(circle, #6B5BFF44, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      {/* subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: tone === "dark" ? 1 : 0.3,
        }}
      />
    </AbsoluteFill>
  );
};
