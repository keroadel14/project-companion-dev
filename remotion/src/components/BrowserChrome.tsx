import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// Browser chrome frame – content area is positioned absolute inside
export const BrowserFrame: React.FC<{
  url?: string;
  children: React.ReactNode;
}> = ({ url = "dormlink.com", children }) => {
  return (
    <AbsoluteFill
      style={{
        background: "#0F1535",
        padding: 60,
      }}
    >
      <div
        style={{
          flex: 1,
          background: "#fff",
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 40px 120px #00000080",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* tab bar */}
        <div
          style={{
            height: 56,
            background: "#E8EAF0",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: 14,
            borderBottom: "1px solid #d0d4dc",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FEBC2E" }} />
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#28C840" }} />
          </div>
          <div
            style={{
              flex: 1,
              maxWidth: 700,
              margin: "0 auto",
              background: "#fff",
              borderRadius: 10,
              padding: "10px 18px",
              fontFamily: "DM Sans, sans-serif",
              fontSize: 18,
              color: "#444",
              border: "1px solid #d0d4dc",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ color: "#28C840", fontSize: 16 }}>🔒</span>
            {url}
          </div>
        </div>
        {/* page content */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#fff" }}>
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Animated cursor with click ripple
export const Cursor: React.FC<{
  // Path of waypoints (frame, x, y), absolute coords inside the page area (not the whole video)
  path: { frame: number; x: number; y: number; click?: boolean }[];
}> = ({ path }) => {
  const frame = useCurrentFrame();

  // Find current segment
  let x = path[0].x;
  let y = path[0].y;
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    if (frame >= a.frame && frame <= b.frame) {
      const t = interpolate(frame, [a.frame, b.frame], [0, 1], { extrapolateRight: "clamp" });
      // ease-out-cubic
      const e = 1 - Math.pow(1 - t, 3);
      x = a.x + (b.x - a.x) * e;
      y = a.y + (b.y - a.y) * e;
      break;
    }
    if (frame > b.frame) {
      x = b.x;
      y = b.y;
    }
  }

  // Click ripples
  const ripples = path
    .filter((p) => p.click)
    .map((p, i) => {
      const localF = frame - p.frame;
      if (localF < 0 || localF > 30) return null;
      const scale = interpolate(localF, [0, 30], [0, 2.2]);
      const op = interpolate(localF, [0, 30], [0.6, 0]);
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x - 30,
            top: p.y - 30,
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "3px solid #3F3DCB",
            transform: `scale(${scale})`,
            opacity: op,
            pointerEvents: "none",
          }}
        />
      );
    });

  return (
    <>
      {ripples}
      <svg
        style={{
          position: "absolute",
          left: x - 4,
          top: y - 4,
          pointerEvents: "none",
          filter: "drop-shadow(0 4px 8px #00000040)",
          zIndex: 100,
        }}
        width="32"
        height="40"
        viewBox="0 0 32 40"
      >
        <path
          d="M2 2 L2 28 L9 22 L13 32 L17 30 L13 20 L22 20 Z"
          fill="#fff"
          stroke="#0F1535"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

// Typewriter text reveal
export const Typewriter: React.FC<{
  text: string;
  startFrame: number;
  charsPerFrame?: number;
  style?: React.CSSProperties;
  cursor?: boolean;
}> = ({ text, startFrame, charsPerFrame = 0.8, style, cursor = true }) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - startFrame);
  const count = Math.min(text.length, Math.floor(local * charsPerFrame));
  const visible = text.slice(0, count);
  const showCursor = cursor && Math.floor(frame / 15) % 2 === 0;
  return (
    <span style={style}>
      {visible}
      {count < text.length || showCursor ? (
        <span style={{ opacity: showCursor ? 1 : 0, color: "inherit" }}>|</span>
      ) : null}
    </span>
  );
};
