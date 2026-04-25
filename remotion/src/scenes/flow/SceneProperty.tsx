import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { BrowserFrame, Cursor } from "../../components/BrowserChrome";

const jakarta = loadJakarta("normal", { weights: ["700", "800"] }).fontFamily;
const dm = loadDM("normal", { weights: ["400", "500", "600"] }).fontFamily;

export const SceneProperty: React.FC = () => {
  const frame = useCurrentFrame();
  // Cursor moves to "Contact landlord" button
  const cursorPath = [
    { frame: 0, x: 100, y: 100 },
    { frame: 30, x: 800, y: 400 },
    { frame: 70, x: 1500, y: 720 }, // contact button
    { frame: 85, x: 1500, y: 720, click: true },
  ];

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <BrowserFrame url="dormlink.com/listings/maadi-modern-studio">
      <div style={{ height: 70, display: "flex", alignItems: "center", padding: "0 60px", borderBottom: "1px solid #eee" }}>
        <span style={{ fontFamily: jakarta, fontSize: 22, fontWeight: 800, color: "#0F1535" }}>DORMLINK</span>
        <span style={{ marginLeft: 30, fontFamily: dm, fontSize: 14, color: "#888" }}>← Back to results</span>
      </div>

      <div style={{ padding: "32px 60px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 40, opacity: fadeIn }}>
        {/* Left: gallery + info */}
        <div>
          <div style={{
            height: 380,
            background: "linear-gradient(135deg, #6B5BFF, #A78BFA)",
            borderRadius: 20,
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: 16, left: 16,
              background: "#10B981", color: "#fff",
              padding: "6px 16px", borderRadius: 999,
              fontFamily: dm, fontSize: 14, fontWeight: 600,
            }}>✓ Verified Listing</div>
            <div style={{
              position: "absolute", bottom: 16, right: 16,
              background: "#000000aa", color: "#fff",
              padding: "6px 14px", borderRadius: 8,
              fontFamily: dm, fontSize: 13,
            }}>1 / 8 photos</div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            {[0,1,2,3].map((i) => (
              <div key={i} style={{
                flex: 1, height: 80,
                background: `linear-gradient(135deg, hsl(${230 + i * 25}, 60%, 65%), hsl(${260 + i * 20}, 70%, 70%))`,
                borderRadius: 10,
                border: i === 0 ? "2px solid #3F3DCB" : "none",
              }} />
            ))}
          </div>

          <h1 style={{ fontFamily: jakarta, fontSize: 38, color: "#0F1535", margin: "24px 0 6px", fontWeight: 800, letterSpacing: -1 }}>
            Maadi Modern Studio
          </h1>
          <p style={{ fontFamily: dm, fontSize: 17, color: "#666", margin: 0 }}>📍 Road 9, Maadi, Cairo · 12 min walk to AUC bus stop</p>

          <div style={{ display: "flex", gap: 24, marginTop: 22, flexWrap: "wrap" }}>
            {[
              { k: "Type", v: "Studio" },
              { k: "Size", v: "45 m²" },
              { k: "Furnished", v: "Yes" },
              { k: "Wi-Fi", v: "Fiber" },
              { k: "Min stay", v: "3 mo" },
            ].map((item) => (
              <div key={item.k}>
                <p style={{ fontFamily: dm, fontSize: 12, color: "#888", margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>{item.k}</p>
                <p style={{ fontFamily: jakarta, fontSize: 18, color: "#0F1535", margin: "4px 0 0", fontWeight: 700 }}>{item.v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: pricing + landlord */}
        <div>
          <div style={{
            background: "#fff", border: "1px solid #eee",
            borderRadius: 20, padding: 28,
            boxShadow: "0 20px 50px #00000010",
          }}>
            <p style={{ fontFamily: jakarta, fontSize: 42, color: "#3F3DCB", margin: 0, fontWeight: 800 }}>
              6,500 <span style={{ fontSize: 18, color: "#888", fontWeight: 500 }}>EGP / month</span>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
              <span style={{ color: "#FFD700", fontSize: 18 }}>★★★★★</span>
              <span style={{ fontFamily: dm, fontSize: 14, color: "#666" }}>4.9 · 28 student reviews</span>
            </div>

            {/* Landlord card */}
            <div style={{
              marginTop: 24, padding: 18,
              background: "#F5F6FF", borderRadius: 14,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "linear-gradient(135deg, #3F3DCB, #6B5BFF)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontFamily: jakarta, fontSize: 22, fontWeight: 700,
              }}>AH</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: jakarta, fontSize: 17, color: "#0F1535", margin: 0, fontWeight: 700 }}>Ahmed Hassan</p>
                <p style={{ fontFamily: dm, fontSize: 13, color: "#10B981", margin: "2px 0 0", fontWeight: 600 }}>✓ ID Verified Landlord</p>
              </div>
            </div>

            <div style={{
              marginTop: 20,
              background: "#3F3DCB", color: "#fff",
              padding: "18px 24px", borderRadius: 12,
              fontFamily: dm, fontSize: 18, fontWeight: 600,
              textAlign: "center",
            }}>
              💬 Contact Landlord
            </div>
            <div style={{
              marginTop: 10, padding: "16px 24px",
              border: "1px solid #ddd", borderRadius: 12,
              fontFamily: dm, fontSize: 16, color: "#444", fontWeight: 500,
              textAlign: "center",
            }}>
              ❤ Save to favorites
            </div>
          </div>
        </div>
      </div>

      <Cursor path={cursorPath} />
    </BrowserFrame>
  );
};
