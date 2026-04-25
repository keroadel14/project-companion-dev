import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, Img, staticFile, interpolate } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { BrowserFrame, Cursor, Typewriter } from "../../components/BrowserChrome";

const jakarta = loadJakarta("normal", { weights: ["700", "800"] }).fontFamily;
const dm = loadDM("normal", { weights: ["400", "500", "600"] }).fontFamily;

// Page is ~1800w x 924h
export const SceneHome: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Search field starts empty, typing starts at frame 40, click search at 110
  const searchText = "Cairo";
  const cursorPath = [
    { frame: 0, x: 1500, y: 700 },
    { frame: 25, x: 700, y: 360 }, // hover search input
    { frame: 35, x: 700, y: 360, click: true },
    { frame: 90, x: 700, y: 360 },
    { frame: 110, x: 1100, y: 360 }, // search button
    { frame: 120, x: 1100, y: 360, click: true },
  ];

  return (
    <BrowserFrame url="dormlink.com">
      {/* Navbar */}
      <div style={{
        height: 70, display: "flex", alignItems: "center", padding: "0 60px",
        borderBottom: "1px solid #eee", background: "#fff",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Img src={staticFile("images/dormlink-logo.jpeg")} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontFamily: jakarta, fontSize: 22, fontWeight: 800, color: "#0F1535", letterSpacing: -0.5 }}>DORMLINK</span>
        </div>
        <div style={{ marginLeft: 60, display: "flex", gap: 28 }}>
          {["Home", "Listings", "About", "Contact"].map((l, i) => (
            <span key={l} style={{ fontFamily: dm, fontSize: 17, color: i === 0 ? "#3F3DCB" : "#666", fontWeight: i === 0 ? 600 : 500 }}>{l}</span>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ background: "#3F3DCB", color: "#fff", padding: "10px 22px", borderRadius: 999, fontFamily: dm, fontSize: 15, fontWeight: 600 }}>Sign Up</div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "80px 80px 40px", background: "linear-gradient(180deg, #F5F6FF, #fff)" }}>
        <h1 style={{
          fontFamily: jakarta, fontSize: 72, color: "#0F1535", margin: 0,
          fontWeight: 800, letterSpacing: -2, lineHeight: 1.05,
        }}>
          Find your next<br/>
          <span style={{ color: "#3F3DCB" }}>student home.</span>
        </h1>
        <p style={{ fontFamily: dm, fontSize: 22, color: "#666", marginTop: 20, maxWidth: 700 }}>
          Verified dorms, trusted landlords, real student reviews — across Egypt.
        </p>

        {/* Search bar */}
        <div style={{
          marginTop: 40, background: "#fff",
          border: "2px solid #3F3DCB",
          borderRadius: 999, padding: "8px 8px 8px 28px",
          display: "flex", alignItems: "center", gap: 16,
          maxWidth: 900, boxShadow: "0 20px 60px #3F3DCB30",
        }}>
          <span style={{ color: "#888", fontSize: 22 }}>⌕</span>
          <div style={{ flex: 1, fontFamily: dm, fontSize: 22, color: "#0F1535", padding: "16px 0" }}>
            <Typewriter text="Cairo" startFrame={40} charsPerFrame={0.25} style={{}} />
            {frame < 40 && <span style={{ color: "#aaa" }}>Search by city, neighborhood, or university...</span>}
          </div>
          <div style={{
            background: "#3F3DCB", color: "#fff",
            padding: "16px 36px", borderRadius: 999,
            fontFamily: dm, fontSize: 17, fontWeight: 600,
          }}>Search</div>
        </div>

        <div style={{ marginTop: 30, display: "flex", gap: 12 }}>
          {["Cairo", "Alexandria", "Giza", "Mansoura"].map((c, i) => (
            <div key={c} style={{
              padding: "10px 22px", background: "#fff",
              border: "1px solid #ddd", borderRadius: 999,
              fontFamily: dm, fontSize: 15, color: "#444",
            }}>{c}</div>
          ))}
        </div>
      </div>

      <Cursor path={cursorPath} />
    </BrowserFrame>
  );
};
