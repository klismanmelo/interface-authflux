import Link from "next/link";
import {
  GridIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  PulseIcon,
  ArrowRightIcon,
  PlusIcon,
  CheckIcon,
  RocketIcon,
  MoreIcon,
} from "../components/Icons";
import { getMeAction } from "./action/action-dashboard";

/* --------- Sparkline SVG estático --------- */
const SPARK_30 = [
  42, 38, 51, 47, 60, 55, 49, 63, 58, 71, 66, 74, 69, 82, 77, 70, 85, 91, 84,
  96, 88, 79, 93, 101, 97, 110, 104, 118, 112, 126,
];

function Sparkline({
  data,
  w = 92,
  h = 34,
  color = "var(--accent)",
}: {
  data: number[];
  w?: number;
  h?: number;
  color?: string;
}) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / (max - min || 1)) * (h - 4) - 2,
  ]);
  const d = pts
    .map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1))
    .join(" ");
  const area = d + ` L${w} ${h} L0 ${h} Z`;

  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs>
        <linearGradient id="spk1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.22" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spk1)" />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* --------- StatCard --------- */
function StatCard({
  label,
  value,
  icon,
  spark,
  trend,
  bar,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  spark?: number[];
  trend?: string;
  bar?: number;
}) {
  return (
    <div
      className="card card-pad"
      style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}
    >
      <div className="row between">
        <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>
          {label}
        </span>
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "var(--accent-soft)",
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </span>
      </div>
      <div
        className="row between"
        style={{ alignItems: "flex-end" }}
      >
        <div>
          <div
            className="display tnum"
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {value}
          </div>
          {trend && (
            <div
              style={{
                fontSize: 12.5,
                color: "var(--green)",
                fontWeight: 600,
                marginTop: 7,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <PulseIcon size={13} /> {trend}
            </div>
          )}
        </div>
        {spark && <Sparkline data={spark} />}
      </div>
      {bar != null && (
        <div>
          <div className="pbar">
            <i style={{ width: bar + "%", background: "var(--accent)" }} />
          </div>
        </div>
      )}
    </div>
  );
}

/* --------- Próximos passos --------- */
const CHECKLIST = [
  { k: "create", label: "Criar aplicação", done: true },
  { k: "roles", label: "Configurar tipos de usuário", done: true },
  { k: "integrate", label: "Integrar no seu código", done: false },
  { k: "test", label: "Testar login", done: false },
  { k: "prod", label: "Ir para produção", done: false },
];

/* --------- Apps mock --------- */
const APPS = [
  {
    id: "ecom",
    name: "Loja Aurora",
    url: "https://loja-aurora.com.br",
    env: "Produção",
    status: "online" as const,
    created: "14 mar 2026",
    users30: 12840,
  },
  {
    id: "saas",
    name: "Painel Nimbus",
    url: "https://app.nimbus.io",
    env: "Produção",
    status: "online" as const,
    created: "02 fev 2026",
    users30: 3210,
  },
  {
    id: "mobile",
    name: "Fitly App",
    url: "https://fitly.app",
    env: "Desenvolvimento",
    status: "paused" as const,
    created: "28 mai 2026",
    users30: 0,
  },
];

function StatusBadge({ status }: { status: "online" | "paused" | "offline" }) {
  if (status === "online")
    return (
      <span className="badge badge-green">
        <span className="dot" style={{ background: "var(--green)" }} />
        Online
      </span>
    );
  if (status === "paused")
    return (
      <span className="badge badge-amber">
        <span className="dot" style={{ background: "var(--amber)" }} />
        Pausado
      </span>
    );
  return (
    <span className="badge badge-gray">
      <span className="dot" style={{ background: "var(--faint)" }} />
      Offline
    </span>
  );
}

function fmtNum(n: number) {
  return n.toLocaleString("pt-BR");
}

/* --------- Dashboard Home page --------- */
export default async function DashboardPage() {
  const user = await getMeAction();
  const doneCount = CHECKLIST.filter((c) => c.done).length;
  const totalUsers = APPS.reduce((s, a) => s + a.users30, 0);

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      {/* Saudação */}
      <div>
        <h1 className="h1">Bem-vindo de volta, {user.username} 👋</h1>
        <p className="sub" style={{ marginTop: 7 }}>
          Aqui está o resumo das suas aplicações nos últimos 30 dias.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
        }}
      >
        <StatCard
          label="Aplicações criadas"
          value={APPS.length}
          icon={<GridIcon size={17} />}
        />
        <StatCard
          label="Usuários autenticados (30d)"
          value={fmtNum(totalUsers)}
          icon={<UsersIcon size={17} />}
          spark={SPARK_30}
          trend="+18% vs. mês anterior"
        />
        <StatCard
          label="Taxa de sucesso"
          value="97.9%"
          icon={<CheckCircleIcon size={17} />}
          bar={97.9}
        />
        <StatCard
          label="Último acesso"
          value="14:32"
          icon={<ClockIcon size={17} />}
          trend="Hoje · 189.45.12.7"
        />
      </div>

      {/* Grid principal */}
      <div
        className="dash-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1fr)",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Aplicações recentes */}
        <div className="card card-pad">
          <div className="row between" style={{ marginBottom: 14, gap: 16 }}>
            <div>
              <h2 className="h3" style={{ fontSize: 16 }}>
                Aplicações recentes
              </h2>
              <p className="sub" style={{ marginTop: 3, fontSize: 13 }}>
                Gerencie ou crie uma nova aplicação
              </p>
            </div>
            <Link href="/dashboard/apps/new" className="btn btn-primary btn-sm">
              <PlusIcon size={16} /> Nova app
            </Link>
          </div>

          <div>
            {APPS.map((app) => (
              <div
                key={app.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 4px",
                  borderBottom: "1px solid var(--line-2)",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    flex: "none",
                    background:
                      app.status === "paused"
                        ? "#eef0f3"
                        : "var(--accent-soft)",
                    color:
                      app.status === "paused"
                        ? "var(--faint)"
                        : "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                    fontSize: 17,
                  }}
                >
                  {app.name[0]}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row" style={{ gap: 9 }}>
                    <span style={{ fontWeight: 600, fontSize: 14.5 }}>
                      {app.name}
                    </span>
                    <StatusBadge status={app.status} />
                    {app.env === "Desenvolvimento" && (
                      <span className="badge badge-outline">Dev</span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "var(--faint)",
                      marginTop: 3,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {app.url} · criado {app.created}
                  </div>
                </div>

                {/* Usuários */}
                <div
                  className="hide-sm"
                  style={{ textAlign: "right", flex: "none" }}
                >
                  <div
                    className="tnum"
                    style={{ fontWeight: 600, fontSize: 14 }}
                  >
                    {fmtNum(app.users30)}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--faint)" }}>
                    usuários
                  </div>
                </div>

                <button className="btn btn-secondary btn-sm">Gerenciar</button>
                <button
                  className="btn btn-ghost btn-icon"
                  style={{ width: 34, height: 34 }}
                >
                  <MoreIcon size={18} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 14 }}>
            <button className="btn btn-ghost btn-sm">
              Ver todas as aplicações <ArrowRightIcon size={15} />
            </button>
          </div>
        </div>

        {/* Próximos passos */}
        <div className="card card-pad">
          <div className="row between" style={{ marginBottom: 14, gap: 16 }}>
            <div>
              <h2 className="h3" style={{ fontSize: 16 }}>
                Próximos passos
              </h2>
              <p className="sub" style={{ marginTop: 3, fontSize: 13 }}>
                {doneCount} de {CHECKLIST.length} concluídos
              </p>
            </div>
          </div>

          <div className="pbar" style={{ marginBottom: 18 }}>
            <i
              style={{
                width: (doneCount / CHECKLIST.length) * 100 + "%",
                background: "var(--accent)",
              }}
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            {CHECKLIST.map((c) => (
              <div
                key={c.k}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  padding: "9px 0",
                }}
              >
                {c.done ? (
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "var(--green)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "none",
                    }}
                  >
                    <CheckIcon size={13} sw={3} />
                  </span>
                ) : (
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: "1.8px dashed #c8cdd6",
                      flex: "none",
                    }}
                  />
                )}
                <span
                  style={{
                    fontSize: 14,
                    color: c.done ? "var(--faint)" : "var(--ink-2)",
                    fontWeight: 500,
                    textDecoration: c.done ? "line-through" : "none",
                  }}
                >
                  {c.label}
                </span>
              </div>
            ))}
          </div>

          <button
            className="btn btn-secondary btn-block btn-sm"
            style={{ marginTop: 14 }}
          >
            <RocketIcon size={16} /> Continuar integração
          </button>
        </div>
      </div>
    </div>
  );
}
