import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { BrowserFrame, Cursor } from "../../components/BrowserChrome";

const jakarta = loadJakarta("normal", { weights: ["700", "800"] }).fontFamily;
const dm = loadDM("normal", { weights: ["400", "500", "600"] }).fontFamily;

const listings = [
  { name: "Maadi Modern Studio", city: "Maadi, Cairo", price: 6500, rating: 4.9, reviews: 28, color: ["#6B5BFF", "#A78BFA"] },
  { name: "Zamalek Riverview", city: "Zamalek, Cairo", price: 8200, rating: 4.8, reviews: 41, color: ["#3F3DCB", "#6B5BFF"] },
  { name: "New Cairo Dorm Loft", city: "5th Settlement, Cairo", price: 7400, rating: 4.7, reviews: 19, color: ["#10B981", "#34D399"] },
  { name: "Heliopolis Garden Suite", city: "Heliopolis, Cairo", price: 5900, rating: 4.6, reviews: 33, color: ["#F59E0B", "#FBBF24"] },
];

export const SceneListings: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cursor: enter, scroll a bit, hover first card, click it
  const cursorPath = [
    { frame: 0, x: 1700, y: 100 },
    { frame: 30, x: 900, y: 400 },
    { frame: 70, x: 460, y: 500 },
    { frame: 95, x: 460, y: 500, click: true },
  ];

  return (
    <BrowserFrame url="dormlink.com/listings?city=Cairo">
      {/* Navbar lite */}
      <div style={{
        height: 70, display: "flex", alignItems: "center", padding: "0 60px",
        borderBottom: "1px solid #eee", background: "#fff",
      }}>
        <span style={{ fontFamily: jakarta, fontSize: 22, fontWeight: 800, color: "#0F1535" }}>DORMLINK</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ fontFamily: dm, fontSize: 15, color: "#666" }}>Searching: <b style={{ color: "#3F3DCB" }}>Cairo</b></div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        padding: "20px 60px", background: "#F5F6FF",
        borderBottom: "1px solid #eee", display: "flex", gap: 12, alignItems: "center",
      }}>
        <span style={{ fontFamily: dm, fontSize: 15, color: "#666", fontWeight: 600 }}>Filters:</span>
        {["Studio", "Shared", "Female only", "Verified", "Under 8000 EGP"].map((f, i) => (
          <div key={f} style={{
            padding: "8px 18px",
            background: i === 3 ? "#3F3DCB" : "#fff",
            color: i === 3 ? "#fff" : "#444",
            border: i === 3 ? "none" : "1px solid #ddd",
            borderRadius: 999, fontFamily: dm, fontSize: 14, fontWeight: 500,
          }}>{f}{i === 3 && " ✓"}</div>
        ))}
      </div>

      {/* Results count */}
      <div style={{ padding: "24px 60px 12px", fontFamily: jakarta, fontSize: 26, color: "#0F1535", fontWeight: 700 }}>
        24 verified dorms in Cairo
      </div>

      {/* Cards grid */}
      <div style={{ padding: "12px 60px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {listings.map((l, i) => {
          const delay = 5 + i * 8;
          const op = interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateRight: "clamp" });
          const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
          const y = interpolate(s, [0, 1], [40, 0]);
          // first card hover state from frame 70
          const isHovered = i === 0 && frame > 65;
          const lift = isHovered ? -8 : 0;
          return (
            <div key={l.name} style={{
              opacity: op,
              transform: `translateY(${y + lift}px)`,
              background: "#fff",
              borderRadius: 18,
              overflow: "hidden",
              border: isHovered ? "2px solid #3F3DCB" : "1px solid #eee",
              boxShadow: isHovered ? "0 24px 60px #3F3DCB40" : "0 4px 12px #00000010",
            }}>
              <div style={{
                height: 180,
                background: `linear-gradient(135deg, ${l.color[0]}, ${l.color[1]})`,
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  background: "#10B981", color: "#fff",
                  padding: "4px 12px", borderRadius: 999,
                  fontFamily: dm, fontSize: 12, fontWeight: 600,
                }}>✓ Verified</div>
                <div style={{
                  position: "absolute", top: 12, right: 12,
                  background: "#000000aa", color: "#FFD700",
                  padding: "4px 12px", borderRadius: 999,
                  fontFamily: dm, fontSize: 13, fontWeight: 600,
                }}>★ {l.rating}</div>
              </div>
              <div style={{ padding: 18 }}>
                <p style={{ fontFamily: dm, fontSize: 13, color: "#888", margin: 0 }}>{l.city}</p>
                <h3 style={{ fontFamily: jakarta, fontSize: 19, color: "#0F1535", margin: "4px 0 8px", fontWeight: 700 }}>{l.name}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: jakarta, fontSize: 22, color: "#3F3DCB", fontWeight: 800 }}>
                    {l.price} <span style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>EGP/mo</span>
                  </span>
                  <span style={{ fontFamily: dm, fontSize: 12, color: "#888" }}>{l.reviews} reviews</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Cursor path={cursorPath} />
    </BrowserFrame>
  );
};
