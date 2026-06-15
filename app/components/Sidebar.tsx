import Link from "next/link";
import Logo from "./Logo";
import {
  HomeIcon,
  GridIcon,
  PulseIcon,
  BookIcon,
  GearIcon,
  LogoutIcon,
  ExternalIcon,
} from "./Icons";
import { logoutAction } from "../auth/action/action-auth";

const NAV_ITEMS = [
  { k: "dashboard", label: "Home", icon: HomeIcon, href: "/dashboard" },
  { k: "apps", label: "Minhas aplicações", icon: GridIcon, href: "/my-api" },
  { k: "monitoring", label: "Monitoramento", icon: PulseIcon, href: "/dashboard/monitoring" },
  { k: "docs", label: "Documentação", icon: BookIcon, href: "/dashboard/docs", ext: true },
  { k: "account", label: "Configurações da conta", icon: GearIcon, href: "/dashboard/account" },
];

interface SidebarProps {
  activeRoute?: string;
}

export default function Sidebar({ activeRoute = "dashboard" }: SidebarProps) {
  return (
    <aside
      className="side-scope main-side"
      style={{
        width: 248,
        flex: "none",
        background: "var(--side)",
        borderRight: "1px solid var(--side-line)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "auto",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "20px 18px 18px" }}>
        <Logo size={28} dark />
      </div>

      {/* Navegação */}
      <nav
        style={{
          padding: "6px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
        }}
      >
        {NAV_ITEMS.map((n) => {
          const active = activeRoute === n.k;
          const IconComp = n.icon;
          return (
            <Link
              key={n.k}
              href={n.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 9,
                border: "none",
                textAlign: "left",
                background: active ? "var(--accent)" : "transparent",
                color: active ? "#fff" : "var(--side-muted)",
                fontSize: 14,
                fontWeight: 500,
                transition: "all .12s",
                textDecoration: "none",
              }}
            >
              <IconComp size={19} />
              <span style={{ flex: 1 }}>{n.label}</span>
              {n.ext && (
                <ExternalIcon size={13} style={{ opacity: 0.5 }} />
              )}
            </Link>
          );
        })}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Sair */}
        <form action={logoutAction}>
          <button
            type="submit"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 9,
              border: "none",
              width: "100%",
              textAlign: "left",
              background: "transparent",
              color: "var(--side-muted)",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            <LogoutIcon size={19} />
            Sair
          </button>
        </form>
      </nav>

      {/* Rodapé versão */}
      <div
        style={{
          padding: "14px 18px",
          borderTop: "1px solid var(--side-line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          className="mono"
          style={{ fontSize: 11.5, color: "var(--side-faint)" }}
        >
          v2.4.1
        </span>
        <a
          href="#"
          style={{
            fontSize: 12,
            color: "var(--side-muted)",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Feedback
        </a>
      </div>
    </aside>
  );
}
