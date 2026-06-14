import Logo from "../components/Logo";
import { TerminalIcon } from "../components/Icons";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ height: "100vh", display: "flex", overflow: "auto" }}>
      {/* Painel de marca escuro — lado esquerdo */}
      <div
        className="auth-brand side-scope"
        style={{ flex: "1 1 0", minWidth: 0 }}
      >
        <div
          style={{
            flex: "1 1 0",
            minWidth: 0,
            background: "var(--side)",
            color: "var(--side-ink)",
            padding: "48px 52px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            height: "100%",
          }}
        >
          {/* Grade técnica de fundo */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(var(--side-line) 1px, transparent 1px), linear-gradient(90deg, var(--side-line) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              opacity: 0.4,
              maskImage:
                "radial-gradient(120% 90% at 70% 10%, #000 30%, transparent 75%)",
            }}
          />
          {/* Blur circular de destaque */}
          <div
            style={{
              position: "absolute",
              top: -120,
              right: -120,
              width: 360,
              height: 360,
              borderRadius: "50%",
              background: "var(--accent)",
              filter: "blur(120px)",
              opacity: 0.28,
            }}
          />

          {/* Logo */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <Logo size={32} dark />
          </div>

          {/* Copy principal */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              className="eyebrow"
              style={{ color: "var(--accent)", marginBottom: 18 }}
            >
              Auth · Infra para devs
            </div>
            <h1
              className="display"
              style={{
                fontSize: 38,
                lineHeight: 1.12,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                margin: 0,
                color: "#fff",
              }}
            >
              Autenticação pronta
              <br />
              em minutos, não meses.
            </h1>
            <p
              style={{
                color: "var(--side-muted)",
                fontSize: 15.5,
                lineHeight: 1.6,
                marginTop: 18,
                maxWidth: 420,
              }}
            >
              Login, papéis, tokens e logs para o seu app. Você cria a
              aplicação, configura as regras e recebe uma chave. Nós cuidamos do
              resto.
            </p>

            {/* Métricas */}
            <div style={{ display: "flex", gap: 26, marginTop: 34 }}>
              {[
                ["99.98%", "uptime"],
                ["<40ms", "latência p50"],
                ["SOC 2", "compliance"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div
                    className="display"
                    style={{ fontSize: 24, fontWeight: 600, color: "#fff" }}
                  >
                    {n}
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "var(--side-faint)",
                      marginTop: 2,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé SDK */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              gap: 8,
              alignItems: "center",
              color: "var(--side-faint)",
              fontSize: 12.5,
            }}
          >
            <TerminalIcon size={15} />
            <span className="mono">npm i @authflux/sdk</span>
          </div>
        </div>
      </div>

      {/* Área do formulário — lado direito */}
      <div
        style={{
          flex: "1 1 0",
          display: "flex",
          flexDirection: "column",
          background: "var(--surface)",
          minWidth: "min(100%, 560px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
