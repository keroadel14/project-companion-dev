import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { BrowserFrame, Cursor, Typewriter } from "../../components/BrowserChrome";

const jakarta = loadJakarta("normal", { weights: ["700", "800"] }).fontFamily;
const dm = loadDM("normal", { weights: ["400", "500", "600"] }).fontFamily;

export const SceneReview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cursor: hover stars, click 5th star, then click submit
  const starPositions = [780, 850, 920, 990, 1060]; // x of stars
  const starY = 380;

  const cursorPath = [
    { frame: 0, x: 200, y: 100 },
    { frame: 30, x: starPositions[0], y: starY },
    { frame: 50, x: starPositions[2], y: starY },
    { frame: 70, x: starPositions[4], y: starY },
    { frame: 80, x: starPositions[4], y: starY, click: true },
    { frame: 130, x: 950, y: 700 }, // textarea
    { frame: 145, x: 950, y: 700, click: true },
    { frame: 240, x: 1400, y: 870 }, // submit
    { frame: 255, x: 1400, y: 870, click: true },
  ];

  // Stars filled count progresses with cursor
  let filled = 0;
  if (frame >= 30) filled = 1;
  if (frame >= 50) filled = 3;
  if (frame >= 70) filled = 5;

  const submittedOp = interpolate(frame, [258, 280], [0, 1], { extrapolateRight: "clamp" });
  const submittedScale = spring({ frame: frame - 258, fps, config: { damping: 12 } });

  return (
    <BrowserFrame url="dormlink.com/review/dorm">
      <div style={{ height: 70, display: "flex", alignItems: "center", padding: "0 60px", borderBottom: "1px solid #eee" }}>
        <span style={{ fontFamily: jakarta, fontSize: 22, fontWeight: 800, color: "#0F1535" }}>DORMLINK</span>
        <span style={{ marginLeft: 30, fontFamily: dm, fontSize: 14, color: "#888" }}>Leave a review</span>
      </div>

      <div style={{ padding: "40px 80px", maxWidth: 1400, margin: "0 auto" }}>
        <h1 style={{ fontFamily: jakarta, fontSize: 42, color: "#0F1535", margin: 0, fontWeight: 800, letterSpacing: -1 }}>
          How was Maadi Modern Studio?
        </h1>
        <p style={{ fontFamily: dm, fontSize: 17, color: "#666", margin: "8px 0 32px" }}>
          Your review helps other students find a great home. Reviews are public and tied to your verified profile.
        </p>

        {/* Stars */}
        <div style={{
          background: "#fff", border: "1px solid #eee", borderRadius: 18,
          padding: "32px 40px", boxShadow: "0 4px 20px #00000008",
        }}>
          <p style={{ fontFamily: dm, fontSize: 14, color: "#888", margin: 0, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>
            Overall rating
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 12, alignItems: "center" }}>
            {[0,1,2,3,4].map((i) => (
              <div key={i} style={{
                fontSize: 60,
                color: i < filled ? "#FFD700" : "#ddd",
                transform: i < filled ? "scale(1.1)" : "scale(1)",
                transition: "none",
              }}>★</div>
            ))}
            {filled > 0 && (
              <span style={{ fontFamily: jakarta, fontSize: 32, color: "#0F1535", marginLeft: 20, fontWeight: 800 }}>
                {filled}.0
              </span>
            )}
          </div>

          {/* Categories */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 36 }}>
            {[
              { k: "Cleanliness", v: 5 },
              { k: "Location", v: 5 },
              { k: "Value", v: 4 },
            ].map((c) => (
              <div key={c.k}>
                <p style={{ fontFamily: dm, fontSize: 14, color: "#666", margin: 0, fontWeight: 600 }}>{c.k}</p>
                <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                  {[0,1,2,3,4].map((i) => (
                    <span key={i} style={{ fontSize: 22, color: i < c.v && frame > 90 ? "#FFD700" : "#ddd" }}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Comment */}
          <p style={{ fontFamily: dm, fontSize: 14, color: "#888", margin: "32px 0 8px", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>
            Your experience
          </p>
          <div style={{
            border: frame > 145 ? "2px solid #3F3DCB" : "2px solid #eee",
            borderRadius: 12,
            padding: "18px 22px",
            minHeight: 120,
            fontFamily: dm, fontSize: 17, color: "#0F1535", lineHeight: 1.5,
          }}>
            {frame < 145 ? (
              <span style={{ color: "#999" }}>Tell other students what you loved...</span>
            ) : (
              <Typewriter
                text="Quiet street, super clean, and the landlord is very responsive. Highly recommend for AUC students."
                startFrame={150}
                charsPerFrame={0.55}
              />
            )}
          </div>

          {/* Submit */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
            <div style={{
              background: "#3F3DCB", color: "#fff",
              padding: "16px 36px", borderRadius: 12,
              fontFamily: dm, fontSize: 17, fontWeight: 600,
            }}>
              Submit Review
            </div>
          </div>
        </div>

        {/* Submitted toast */}
        {frame > 258 && (
          <div style={{
            position: "absolute", bottom: 40, left: "50%",
            transform: `translateX(-50%) scale(${submittedScale})`,
            opacity: submittedOp,
            background: "#10B981", color: "#fff",
            padding: "20px 36px", borderRadius: 14,
            fontFamily: dm, fontSize: 18, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 12,
            boxShadow: "0 20px 60px #10B98180",
          }}>
            <span style={{ fontSize: 24 }}>✓</span>
            Review submitted! Thank you 🎉
          </div>
        )}
      </div>

      <Cursor path={cursorPath} />
    </BrowserFrame>
  );
};
