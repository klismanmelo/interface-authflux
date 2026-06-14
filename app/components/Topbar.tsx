import {
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  GearIcon,
  LogoutIcon,
  ShieldIcon,
  UsersIcon,
  CheckCircleIcon,
  ListIcon,
} from "./Icons";
import { logoutAction } from "../auth/action/action-auth";

interface TopbarProps {
  title?: string;
}

export default function Topbar({ title = "AuthFlux" }: TopbarProps) {
  return (
    <header
      style={{
        height: 64,
        flex: "none",
        borderBottom: "1px solid var(--line)",
        background: "var(--surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        gap: 16,
      }}
    >
      {/* Título + hamburger mobile */}
      <div className="row" style={{ gap: 12, minWidth: 0 }}>
        <button
          className="btn btn-ghost btn-icon hamburger"
          style={{ display: "none" }}
          aria-label="Abrir menu"
        >
          <ListIcon size={20} />
        </button>
        <span
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: "var(--ink-2)",
          }}
        >
          {title}
        </span>
      </div>

      {/* Ações do lado direito */}
      <div className="row" style={{ gap: 8 }}>
        {/* Notificações */}
        <div style={{ position: "relative" }}>
          <button
            className="btn btn-ghost btn-icon"
            style={{ position: "relative" }}
            aria-label="Notificações"
          >
            <BellIcon size={19} />
            <span
              style={{
                position: "absolute",
                top: 7,
                right: 8,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--red)",
                border: "2px solid var(--surface)",
              }}
            />
          </button>

          {/* Dropdown de notificações (estático) */}
          <div
            aria-hidden="true"
            style={{
              display: "none",
              position: "absolute",
              top: "calc(100% + 6px)",
              right: 0,
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              boxShadow: "var(--shadow-pop)",
              padding: 6,
              minWidth: 260,
              zIndex: 40,
            }}
          >
            {[
              { icon: <ShieldIcon size={16} />, label: "Login suspeito detectado" },
              { icon: <UsersIcon size={16} />, label: "127 novos usuários hoje" },
              { icon: <CheckCircleIcon size={16} />, label: "Painel Nimbus está online" },
            ].map((item, i) => (
              <button
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "8px 10px",
                  border: "none",
                  background: "none",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "var(--ink-2)",
                  textAlign: "left",
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Avatar + nome do usuário */}
        <div style={{ position: "relative" }}>
          <button
            className="btn btn-ghost"
            style={{ gap: 9, padding: "0 8px 0 4px", height: 42 }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "var(--accent)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 13,
                fontFamily: "var(--font-display)",
              }}
            >
              MS
            </span>
            <span
              className="hide-sm"
              style={{ fontSize: 13.5, fontWeight: 600 }}
            >
              Maria Souza
            </span>
            <ChevronDownIcon size={15} style={{ color: "var(--faint)" }} />
          </button>

          {/* Dropdown do usuário (estático) */}
          <div
            aria-hidden="true"
            style={{
              display: "none",
              position: "absolute",
              top: "calc(100% + 6px)",
              right: 0,
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              boxShadow: "var(--shadow-pop)",
              padding: 6,
              minWidth: 180,
              zIndex: 40,
            }}
          >
            {[
              { icon: <UserIcon size={16} />, label: "Minha conta" },
              { icon: <GearIcon size={16} />, label: "Configurações" },
            ].map((item, i) => (
              <button
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "8px 10px",
                  border: "none",
                  background: "none",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "var(--ink-2)",
                  textAlign: "left",
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <hr className="divider" style={{ margin: "5px 0" }} />
            <form action={logoutAction}>
              <button
                type="submit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "8px 10px",
                  border: "none",
                  background: "none",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "var(--red)",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <LogoutIcon size={16} /> Sair
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
