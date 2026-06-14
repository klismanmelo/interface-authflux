interface LogoProps {
  size?: number;
  dark?: boolean;
  mark?: boolean;
}

export default function Logo({ size = 30, dark = false, mark = false }: LogoProps) {
  const ink = dark ? "#fff" : "var(--ink)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.28,
          flex: "none",
          background: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px -2px var(--accent), inset 0 1px 0 rgba(255,255,255,.25)",
        }}
      >
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8h7l4 8h7" />
          <path d="M3 16h5" />
          <path d="M16 8h5" />
        </svg>
      </div>
      {!mark && (
        <span
          className="display"
          style={{
            fontWeight: 600,
            fontSize: size * 0.6,
            color: ink,
            letterSpacing: "-0.02em",
          }}
        >
          Auth<span style={{ color: "var(--accent)" }}>Flux</span>
        </span>
      )}
    </div>
  );
}
