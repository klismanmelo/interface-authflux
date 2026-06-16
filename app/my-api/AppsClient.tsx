"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteAppAction, type AppItem } from "./actions";
import {
  PlusIcon,
  SearchIcon,
  MoreIcon,
  EditIcon,
  TrashIcon,
  ArrowRightIcon,
} from "../components/Icons";

/* --------- Tipos --------- */
type AppStatus = "online" | "paused" | "offline";

interface App {
  id: string;
  name: string;
  url: string | null;
  desc: string | null;
  env: "Produção" | "Desenvolvimento";
  status: AppStatus;
  created: string;
  users30: number;
  rate: number | null;
}

function mapAppItem(item: AppItem): App {
  return {
    id: item.id,
    name: item.name,
    url: item.url,
    desc: item.description,
    env: item.environment === "production" ? "Produção" : "Desenvolvimento",
    status: "online",
    created: new Date(item.createdAt).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    users30: 0,
    rate: null,
  };
}

function fmtNum(n: number) {
  return n.toLocaleString("pt-BR");
}

/* --------- StatusBadge --------- */
function StatusBadge({ status }: { status: AppStatus }) {
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

/* --------- Menu dropdown --------- */
function AppMenu({ app, onDelete }: {
  app: App;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        className="btn btn-ghost btn-icon"
        style={{ width: 32, height: 32 }}
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      >
        <MoreIcon size={18} />
      </button>

      {open && (
        <div
          className="scale-in"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 10,
            boxShadow: "var(--shadow-pop)",
            padding: 6,
            minWidth: 170,
            zIndex: 40,
            transformOrigin: "top right",
          }}
        >
          <button
            onClick={() => setOpen(false)}
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
              cursor: "pointer",
            }}
          >
            <EditIcon size={16} />
            Editar
          </button>
          <hr className="divider" style={{ margin: "5px 0" }} />
          <button
            onClick={() => { setOpen(false); onDelete(); }}
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
            <TrashIcon size={16} />
            Deletar
          </button>
        </div>
      )}
    </div>
  );
}

/* --------- AppCard --------- */
function AppCard({ app, onDelete }: {
  app: App;
  onDelete: () => void;
}) {
  const isPaused = app.status === "paused";

  return (
    <div
      className="card card-pad"
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div className="row between">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 11,
            background: isPaused ? "#eef0f3" : "var(--accent-soft)",
            color: isPaused ? "var(--faint)" : "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            fontSize: 19,
            flex: "none",
          }}
        >
          {app.name[0]}
        </div>

        <AppMenu app={app} onDelete={onDelete} />
      </div>

      <div>
        <div className="row" style={{ gap: 9, marginBottom: 5 }}>
          <span className="h3" style={{ fontSize: 16 }}>
            {app.name}
          </span>
          <StatusBadge status={app.status} />
        </div>
        <p className="sub" style={{ fontSize: 13, minHeight: 38 }}>
          {app.desc ?? app.url ?? "—"}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 22,
          padding: "12px 0",
          borderTop: "1px solid var(--line-2)",
          borderBottom: "1px solid var(--line-2)",
        }}
      >
        <div>
          <div
            className="tnum"
            style={{ fontWeight: 600, fontFamily: "var(--font-display)" }}
          >
            {fmtNum(app.users30)}
          </div>
          <div style={{ fontSize: 11.5, color: "var(--faint)" }}>
            usuários 30d
          </div>
        </div>
        <div>
          <div
            className="tnum"
            style={{ fontWeight: 600, fontFamily: "var(--font-display)" }}
          >
            {app.rate != null ? app.rate + "%" : "—"}
          </div>
          <div style={{ fontSize: 11.5, color: "var(--faint)" }}>sucesso</div>
        </div>
      </div>

      <button className="btn btn-secondary btn-block btn-sm">
        Gerenciar <ArrowRightIcon size={15} />
      </button>
    </div>
  );
}

/* --------- Card dashed "Criar nova aplicação" --------- */
function NewAppCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/my-api/criar"
      style={{
        border: `1.5px dashed ${hovered ? "var(--accent)" : "var(--line)"}`,
        borderRadius: "var(--radius)",
        background: "var(--surface-2)",
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        color: hovered ? "var(--accent)" : "var(--muted)",
        transition: "all .15s",
        textDecoration: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          width: 44,
          height: 44,
          borderRadius: 11,
          background: "var(--surface)",
          border: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PlusIcon size={22} />
      </span>
      <span style={{ fontWeight: 600, fontSize: 14 }}>Criar nova aplicação</span>
    </Link>
  );
}

/* --------- AppsClient --------- */
export default function AppsClient({
  initialApps,
  fetchError,
}: {
  initialApps: AppItem[];
  fetchError?: string;
}) {
  const [apps, setApps] = useState<App[]>(initialApps.map(mapAppItem));
  const [q, setQ] = useState("");

  const filtered = apps.filter((a) =>
    a.name.toLowerCase().includes(q.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const result = await deleteAppAction(id);
    if (result.success) {
      setApps((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="fade-in">
      {/* Cabeçalho */}
      <div
        className="row between"
        style={{ marginBottom: 22, gap: 16, flexWrap: "wrap" }}
      >
        <div>
          <h1 className="h1">Minhas aplicações</h1>
          <p className="sub" style={{ marginTop: 7 }}>
            {apps.length} {apps.length === 1 ? "aplicação" : "aplicações"} no total
          </p>
        </div>
        <Link href="/my-api/criar" className="btn btn-primary">
          <PlusIcon size={18} /> Nova aplicação
        </Link>
      </div>

      {fetchError && (
        <div
          className="card card-pad"
          style={{
            background: "var(--red-soft, #fff0f0)",
            border: "1px solid var(--red-line, #fca5a5)",
            color: "var(--red)",
            fontSize: 14,
            marginBottom: 18,
          }}
        >
          {fetchError}
        </div>
      )}

      {/* Busca */}
      <div className="input-wrap" style={{ maxWidth: 340, marginBottom: 18 }}>
        <span className="lead">
          <SearchIcon size={17} />
        </span>
        <input
          className="input"
          placeholder="Buscar aplicação…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* Grid de cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          gap: 18,
        }}
      >
        {filtered.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            onDelete={() => handleDelete(app.id)}
          />
        ))}

        <NewAppCard />
      </div>
    </div>
  );
}
