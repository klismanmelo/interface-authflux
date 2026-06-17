import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function NavbarPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      {/* Prévia da Topbar */}
      <section style={{ padding: "32px 40px 0" }}>
        <p
          className="eyebrow"
          style={{ color: "var(--accent)", marginBottom: 12 }}
        >
          Componente · Topbar
        </p>
        <div
          className="card"
          style={{ overflow: "hidden", boxShadow: "var(--shadow)" }}
        >
          <Topbar title="Home" username="Maria Souza" />
        </div>
      </section>

      {/* Prévia da Sidebar */}
      <section style={{ padding: "32px 40px 40px" }}>
        <p
          className="eyebrow"
          style={{ color: "var(--accent)", marginBottom: 12 }}
        >
          Componente · Sidebar
        </p>
        <div
          style={{
            display: "flex",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-lg)",
            height: 480,
          }}
        >
          {/* Sidebar real */}
          <Sidebar activeRoute="dashboard" />

          {/* Área de conteúdo simulada */}
          <div
            style={{
              flex: 1,
              background: "var(--bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "var(--accent-soft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
                <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
                <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
                <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
              </svg>
            </div>
            <p
              className="sub"
              style={{ fontSize: 13, textAlign: "center", maxWidth: 220 }}
            >
              Área de conteúdo do dashboard. A sidebar fica à esquerda.
            </p>
          </div>
        </div>
      </section>

      {/* Prévia completa (sidebar + topbar + conteúdo) */}
      <section style={{ padding: "0 40px 60px" }}>
        <p
          className="eyebrow"
          style={{ color: "var(--accent)", marginBottom: 12 }}
        >
          Shell completo · Sidebar + Topbar
        </p>
        <div
          style={{
            display: "flex",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-lg)",
            height: 340,
            border: "1px solid var(--line)",
          }}
        >
          <Sidebar activeRoute="dashboard" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Topbar title="Home" username="Maria Souza" />
            <div
              style={{
                flex: 1,
                background: "var(--bg)",
                padding: "24px 28px",
                overflow: "hidden",
              }}
            >
              {/* Cards simulados */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 14,
                }}
              >
                {[
                  ["Aplicações", "3"],
                  ["Usuários (30d)", "16.050"],
                  ["Taxa de sucesso", "97.9%"],
                  ["Último acesso", "14:32"],
                ].map(([label, value]) => (
                  <div key={label} className="card card-pad" style={{ padding: 16 }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        fontWeight: 600,
                        marginBottom: 8,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      className="display"
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "var(--ink)",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
