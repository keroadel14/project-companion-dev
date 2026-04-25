import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { BrowserFrame, Cursor, Typewriter } from "../../components/BrowserChrome";

const jakarta = loadJakarta("normal", { weights: ["700", "800"] }).fontFamily;
const dm = loadDM("normal", { weights: ["400", "500", "600"] }).fontFamily;

const oldMessages = [
  { from: "them", text: "Hi! Yes the studio is still available for next semester." },
  { from: "me", text: "Great! Can I book a viewing this weekend?" },
  { from: "them", text: "Absolutely. Saturday 2pm works for me." },
];

export const SceneChat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cursor: move to input, click, type, then hit send
  const cursorPath = [
    { frame: 0, x: 100, y: 100 },
    { frame: 25, x: 950, y: 800 }, // input
    { frame: 35, x: 950, y: 800, click: true },
    { frame: 130, x: 1620, y: 800 }, // send button
    { frame: 145, x: 1620, y: 800, click: true },
  ];

  // Sent message appears after click ~150
  const sentVisible = frame > 148;
  const sentSpring = spring({ frame: frame - 148, fps, config: { damping: 16 } });
  const sentY = interpolate(sentSpring, [0, 1], [20, 0]);
  const sentOp = interpolate(frame, [148, 165], [0, 1], { extrapolateRight: "clamp" });

  return (
    <BrowserFrame url="dormlink.com/messages">
      <div style={{ display: "flex", height: "100%" }}>
        {/* Sidebar conversations */}
        <div style={{ width: 360, borderRight: "1px solid #eee", background: "#FAFAFC" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #eee" }}>
            <p style={{ fontFamily: jakarta, fontSize: 22, color: "#0F1535", margin: 0, fontWeight: 800 }}>Messages</p>
          </div>
          {[
            { name: "Ahmed Hassan", preview: "Saturday 2pm works for me.", active: true, online: true },
            { name: "Sara Mostafa", preview: "Thanks for the review!", online: false },
            { name: "Khaled Ali", preview: "Is the deposit refundable?", online: true },
          ].map((c, i) => (
            <div key={c.name} style={{
              padding: "16px 24px",
              background: c.active ? "#fff" : "transparent",
              borderLeft: c.active ? "3px solid #3F3DCB" : "3px solid transparent",
              display: "flex", gap: 12, alignItems: "center",
            }}>
              <div style={{ position: "relative" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: `linear-gradient(135deg, hsl(${i*60+220}, 60%, 55%), hsl(${i*60+260}, 70%, 65%))`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontFamily: jakarta, fontWeight: 700,
                }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
                {c.online && (
                  <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderRadius: "50%", background: "#10B981", border: "2px solid #fff" }} />
                )}
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <p style={{ fontFamily: dm, fontSize: 15, color: "#0F1535", margin: 0, fontWeight: 600 }}>{c.name}</p>
                <p style={{ fontFamily: dm, fontSize: 13, color: "#888", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.preview}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff" }}>
          {/* Header */}
          <div style={{
            padding: "16px 28px", borderBottom: "1px solid #eee",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "linear-gradient(135deg, #3F3DCB, #6B5BFF)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontFamily: jakarta, fontWeight: 700, fontSize: 18,
            }}>AH</div>
            <div>
              <p style={{ fontFamily: jakarta, fontSize: 18, color: "#0F1535", margin: 0, fontWeight: 700 }}>Ahmed Hassan</p>
              <p style={{ fontFamily: dm, fontSize: 13, color: "#10B981", margin: "2px 0 0" }}>● Online · Verified Landlord</p>
            </div>
            <div style={{ marginLeft: "auto", fontFamily: dm, fontSize: 12, color: "#888", padding: "6px 12px", background: "#F5F6FF", borderRadius: 8 }}>
              🔒 Messages cannot be edited or deleted
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: "28px 40px", display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
            {oldMessages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.from === "me" ? "flex-end" : "flex-start",
                maxWidth: "65%",
              }}>
                <div style={{
                  background: m.from === "me" ? "linear-gradient(135deg, #3F3DCB, #6B5BFF)" : "#F0F2FA",
                  color: m.from === "me" ? "#fff" : "#0F1535",
                  padding: "14px 20px", borderRadius: 18,
                  borderBottomRightRadius: m.from === "me" ? 4 : 18,
                  borderBottomLeftRadius: m.from === "me" ? 18 : 4,
                  fontFamily: dm, fontSize: 17, lineHeight: 1.4,
                }}>{m.text}</div>
                {m.from === "me" && (
                  <p style={{ fontFamily: dm, fontSize: 11, color: "#888", margin: "4px 8px 0", textAlign: "right" }}>✓✓ Read</p>
                )}
              </div>
            ))}

            {/* New typed message – appears at 148+ */}
            {sentVisible && (
              <div style={{
                alignSelf: "flex-end", maxWidth: "65%",
                opacity: sentOp, transform: `translateY(${sentY}px)`,
              }}>
                <div style={{
                  background: "linear-gradient(135deg, #3F3DCB, #6B5BFF)",
                  color: "#fff",
                  padding: "14px 20px", borderRadius: 18,
                  borderBottomRightRadius: 4,
                  fontFamily: dm, fontSize: 17, lineHeight: 1.4,
                }}>Perfect, see you Saturday at 2pm!</div>
                <p style={{ fontFamily: dm, fontSize: 11, color: "#888", margin: "4px 8px 0", textAlign: "right" }}>✓ Sent</p>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{
            padding: "20px 28px", borderTop: "1px solid #eee",
            display: "flex", gap: 12, alignItems: "center",
          }}>
            <div style={{
              flex: 1, padding: "16px 22px",
              background: "#F5F6FF", borderRadius: 999,
              border: frame > 30 ? "2px solid #3F3DCB" : "2px solid transparent",
              fontFamily: dm, fontSize: 17, color: "#0F1535",
            }}>
              {frame < 35 ? (
                <span style={{ color: "#999" }}>Type a message...</span>
              ) : frame < 148 ? (
                <Typewriter text="Perfect, see you Saturday at 2pm!" startFrame={40} charsPerFrame={0.45} />
              ) : (
                <span style={{ color: "#999" }}>Type a message...</span>
              )}
            </div>
            <div style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "#3F3DCB",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 22,
            }}>➤</div>
          </div>
        </div>
      </div>

      <Cursor path={cursorPath} />
    </BrowserFrame>
  );
};
