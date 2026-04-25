import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { Background } from "../components/Background";

const jakarta = loadJakarta("normal", { weights: ["700", "800"] }).fontFamily;
const dm = loadDM("normal", { weights: ["400", "500"] }).fontFamily;

const features = [
  { icon: "⌂", title: "Smart Listings", desc: "Filter by city, price, and verified status" },
  { icon: "✓", title: "ID Verification", desc: "Every landlord and student verified by admins" },
  { icon: "★", title: "3-Way Reviews", desc: "Rate dorms, landlords, and students transparently" },
  { icon: "✉", title: "Secure Chat", desc: "Messages can never be edited or deleted" },
  { icon: "⌘", title: "Bilingual", desc: "Full Arabic and English support" },
  { icon: "◆", title: "Admin Control", desc: "Block, monitor, and report bad actors" },
];

export const SceneFeatures: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headerOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(spring({ frame, fps, config: { damping: 18 } }), [0, 1], [30, 0]);

  return (
    <AbsoluteFill>
      <Background tone="dark" />
      <AbsoluteFill style={{ padding: "100px 140px", flexDirection: "column", gap: 50 }}>
        <div style={{ opacity: headerOp, transform: `translateY(${headerY}px)` }}>
          <p style={{ fontFamily: dm, fontSize: 22, color: "#6B5BFF", letterSpacing: 6, textTransform: "uppercase", margin: 0 }}>
            What's inside
          </p>
          <h2 style={{ fontFamily: jakarta, fontSize: 88, color: "#fff", margin: "8px 0 0 0", fontWeight: 800, letterSpacing: -3 }}>
            Built for the way<br/>students actually rent.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, flex: 1 }}>
          {features.map((f, i) => {
            const delay = 25 + i * 8;
            const op = interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateRight: "clamp" });
            const y = interpolate(spring({ frame: frame - delay, fps, config: { damping: 16 } }), [0, 1], [50, 0]);
            return (
              <div
                key={f.title}
                style={{
                  opacity: op,
                  transform: `translateY(${y}px)`,
                  background: "linear-gradient(160deg, #1A2155, #141A45)",
                  border: "1px solid #3F3DCB40",
                  borderRadius: 24,
                  padding: 36,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: "#3F3DCB30",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 36,
                }}>{f.icon}</div>
                <h3 style={{ fontFamily: jakarta, fontSize: 32, color: "#fff", margin: 0, fontWeight: 700 }}>{f.title}</h3>
                <p style={{ fontFamily: dm, fontSize: 20, color: "#A8B0E8", margin: 0, lineHeight: 1.4 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
