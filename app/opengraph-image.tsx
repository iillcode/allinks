import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WA.link — Free WhatsApp Link Generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #059669 0%, #10b981 40%, #34d399 100%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Background decorative circles */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          display: "flex",
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          zIndex: 1,
        }}
      >
        {/* Logo icon */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 24,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.346a9.945 9.945 0 0 0 4.881 1.279h.005c5.505 0 9.988-4.478 9.989-9.985 0-2.67-1.037-5.18-2.92-7.062C17.18 3.036 14.67 2 12.012 2z" />
          </svg>
        </div>

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-2px",
            }}
          >
            WA
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "-2px",
            }}
          >
            .link
          </span>
        </div>

        {/* Tagline */}
        <span
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "rgba(255,255,255,0.95)",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Free WhatsApp Link Generator
        </span>

        <span
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Create click-to-chat links with custom messages, emojis, and QR codes.
          Single or bulk generation — 100% private and free.
        </span>

        {/* Feature badges */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
          }}
        >
          {["No Signup", "Bulk Creator", "QR Codes", "100% Private"].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  padding: "10px 20px",
                  borderRadius: 50,
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  fontSize: 18,
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {badge}
              </div>
            ),
          )}
        </div>
      </div>

      {/* Bottom URL bar */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
            fontWeight: 500,
          }}
        >
          wa.link
        </span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
