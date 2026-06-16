"use client";

import { useState } from "react";
import Link from "next/link";
import { createApp, type AppBasic, type AppRole } from "./action";
import {
  ChevronRightIcon,
  GridIcon,
  LinkIcon,
  AlertIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  ShieldIcon,
  TrashIcon,
  EditIcon,
  PlusIcon,
  KeyIcon,
  TerminalIcon,
  CheckCircleIcon,
  BookIcon,
} from "../../components/Icons";

/* --------- Tipos --------- */
interface Role extends AppRole {
  count: number;
}

/* --------- Dados --------- */
const DEFAULT_ROLES: Role[] = [
  { name: "ADMIN", desc: "Acesso total — gerencia usuários, configurações e cobrança.", manage: true, count: 0, builtin: true },
  { name: "USER", desc: "Usuário comum autenticado. Acesso ao app.", manage: false, count: 0, builtin: true },
  { name: "GUEST", desc: "Apenas visualização, sem login persistente.", manage: false, count: 0, builtin: true },
];

const ROLE_COLORS: Record<string, string> = {
  ADMIN: "accent",
  USER: "blue",
  GUEST: "gray",
};

function roleColor(name: string): string {
  return ROLE_COLORS[name] ?? "gray";
}

/* --------- Stepper --------- */
const STEPS = [
  { t: "Informações básicas", d: "Nome e ambiente" },
  { t: "Tipos de usuário", d: "Papéis e permissões" },
  { t: "Resumo", d: "Revisar e criar" },
];

function Stepper({ step, onJump }: { step: number; onJump: (i: number) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {STEPS.map((s, i) => {
        const state: "done" | "active" | "locked" =
          i < step ? "done" : i === step ? "active" : "locked";
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : undefined, minWidth: 0 }}>
            <button
              onClick={() => state === "done" && onJump(i)}
              disabled={state !== "done"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                background: "none",
                border: "none",
                padding: 0,
                cursor: state === "done" ? "pointer" : "default",
                flex: "none",
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  flex: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13.5,
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  background:
                    state === "done"
                      ? "var(--green)"
                      : state === "active"
                      ? "var(--accent)"
                      : "#eef0f3",
                  color: state === "locked" ? "var(--faint)" : "#fff",
                  boxShadow: state === "active" ? "0 0 0 4px var(--accent-soft)" : "none",
                  transition: "all .2s",
                }}
              >
                {state === "done" ? <CheckIcon size={15} sw={3} /> : i + 1}
              </span>
              <div style={{ textAlign: "left" }} className="hide-sm">
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: state === "locked" ? "var(--faint)" : "var(--ink)",
                  }}
                >
                  {s.t}
                </div>
                <div style={{ fontSize: 11.5, color: "var(--faint)" }}>{s.d}</div>
              </div>
            </button>

            {i < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: i < step ? "var(--green)" : "var(--line)",
                  margin: "0 14px",
                  borderRadius: 2,
                  transition: "background .3s",
                  minWidth: 24,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* --------- Toggle --------- */
function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={"toggle" + (on ? " on" : "")}
      onClick={onClick}
      aria-pressed={on}
    />
  );
}

/* --------- CheckRow --------- */
function CheckRow({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        gap: 11,
        alignItems: "center",
        background: "none",
        border: "none",
        padding: 0,
        textAlign: "left",
        width: "100%",
        cursor: "pointer",
      }}
    >
      <span className={"check" + (on ? " on" : "")}>
        <CheckIcon size={13} sw={3.2} />
      </span>
      <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-2)" }}>
        {children}
      </span>
    </button>
  );
}

/* --------- Spinner --------- */
function Spinner({ size = 18 }: { size?: number }) {
  return (
    <svg className="spin" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.6" opacity=".25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/* --------- Página --------- */
export default function CriarAppPage() {
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  const [basic, setBasic] = useState<AppBasic>({
    name: "",
    url: "",
    desc: "",
    env: "Desenvolvimento" as "Desenvolvimento" | "Produção",
    emailVerify: true,
  });

  const [roles, setRoles] = useState<Role[]>(
    DEFAULT_ROLES.map((r) => ({ ...r }))
  );
  const [draft, setDraft] = useState({ name: "", desc: "", manage: false });

  const nameOk = basic.name.trim().length > 0;
  const urlOk = /^https?:\/\/.+\..+/.test(basic.url.trim());
  const step1Ok = nameOk && urlOk;

  const next = () => {
    if (step === 0) {
      setTouched(true);
      if (!step1Ok) return;
      setTouched(false);
    }
    setStep((s) => Math.min(s + 1, 2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addRole = () => {
    const n = draft.name.trim().toUpperCase();
    if (!n || roles.some((r) => r.name === n)) return;
    setRoles((prev) => [
      ...prev,
      { name: n, desc: draft.desc || "Tipo customizado.", manage: draft.manage, builtin: false, count: 0 },
    ]);
    setDraft({ name: "", desc: "", manage: false });
  };

  const create = async () => {
    setCreating(true);
    setCreateError(null);
    const result = await createApp(basic, roles);
    if (!result.success) {
      setCreating(false);
      setCreateError(result.error);
      return;
    }
    window.location.href = "/my-api";
  };

  return (
    <div className="fade-in" style={{ maxWidth: 760, margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          color: "var(--muted)",
          marginBottom: 16,
        }}
      >
        <Link href="/my-api" style={{ color: "var(--muted)", textDecoration: "none" }}>
          Minhas aplicações
        </Link>
        <ChevronRightIcon size={14} style={{ color: "var(--faint)" }} />
        <span style={{ color: "var(--ink-2)", fontWeight: 600 }}>Criar aplicação</span>
      </div>

      <h1 className="h1">Criar nova aplicação</h1>
      <p className="sub" style={{ marginTop: 7 }}>Adicione uma nova app em 3 passos.</p>

      {/* Stepper */}
      <div className="card card-pad" style={{ marginTop: 22, marginBottom: 22 }}>
        <Stepper step={step} onJump={setStep} />
      </div>

      {/* ── PASSO 1 — Informações básicas ── */}
      {step === 0 && (
        <div
          className="card card-pad scale-in"
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          {/* Nome */}
          <div className="field">
            <label className="label">Nome da aplicação</label>
            <div className="input-wrap">
              <span className="lead"><GridIcon size={18} /></span>
              <input
                className={"input" + (touched && !nameOk ? " err" : "")}
                value={basic.name}
                placeholder="Meu E-commerce"
                onChange={(e) => setBasic({ ...basic, name: e.target.value })}
              />
            </div>
            {touched && !nameOk && (
              <span className="hint error">
                <AlertIcon size={13} /> O nome é obrigatório.
              </span>
            )}
          </div>

          {/* URL */}
          <div className="field">
            <label className="label">URL da aplicação</label>
            <div className="input-wrap">
              <span className="lead"><LinkIcon size={18} /></span>
              <input
                className={"input" + (touched && !urlOk ? " err" : "")}
                value={basic.url}
                placeholder="https://meu-app.com"
                onChange={(e) => setBasic({ ...basic, url: e.target.value })}
              />
            </div>
            {touched && !urlOk && (
              <span className="hint error">
                <AlertIcon size={13} /> URL obrigatória. Use o formato https://exemplo.com
              </span>
            )}
          </div>

          {/* Descrição */}
          <div className="field">
            <label className="label">
              Descrição <span className="opt">(opcional)</span>
            </label>
            <textarea
              className="textarea"
              value={basic.desc}
              placeholder="Para que serve esta aplicação?"
              onChange={(e) => setBasic({ ...basic, desc: e.target.value })}
            />
          </div>

          {/* Ambiente */}
          <div className="field">
            <label className="label">Ambiente</label>
            <div className="seg" style={{ alignSelf: "flex-start" }}>
              {(["Desenvolvimento", "Produção"] as const).map((e) => (
                <button
                  key={e}
                  className={basic.env === e ? "on" : ""}
                  onClick={() => setBasic({ ...basic, env: e })}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <hr className="divider" />

          {/* Email verificado */}
          <div className="row between">
            <div>
              <div className="label" style={{ marginBottom: 3 }}>
                Requerer email verificado?
              </div>
              <div className="hint">
                Usuários precisam confirmar o email antes do primeiro login.
              </div>
            </div>
            <Toggle
              on={basic.emailVerify}
              onClick={() => setBasic({ ...basic, emailVerify: !basic.emailVerify })}
            />
          </div>

          {/* Ações */}
          <div className="row between" style={{ marginTop: 6 }}>
            <Link href="/my-api" className="btn btn-ghost">
              Cancelar
            </Link>
            <button className="btn btn-primary" onClick={next}>
              Próximo <ArrowRightIcon size={17} />
            </button>
          </div>
        </div>
      )}

      {/* ── PASSO 2 — Tipos de usuário ── */}
      {step === 1 && (
        <div className="scale-in" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <h2 className="h3">Tipos de usuário</h2>
            <p className="sub" style={{ marginTop: 4 }}>
              Defina os papéis que sua app precisa. ADMIN, USER e GUEST já vêm pré-configurados.
            </p>
          </div>

          {/* Criar novo tipo */}
          <div className="card card-pad" style={{ background: "var(--surface-2)" }}>
            <div className="label" style={{ marginBottom: 14 }}>Criar novo tipo</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 12 }}>
              <input
                className="input"
                value={draft.name}
                placeholder="Nome (ex: Cliente)"
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && addRole()}
              />
              <input
                className="input"
                value={draft.desc}
                placeholder="Descrição (opcional)"
                onChange={(e) => setDraft({ ...draft, desc: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && addRole()}
              />
            </div>
            <div className="row between" style={{ marginTop: 14 }}>
              <CheckRow
                on={draft.manage}
                onClick={() => setDraft({ ...draft, manage: !draft.manage })}
              >
                Pode gerenciar outros usuários?
              </CheckRow>
              <button
                className="btn btn-success btn-sm"
                onClick={addRole}
                disabled={!draft.name.trim()}
              >
                <PlusIcon size={16} /> Adicionar tipo
              </button>
            </div>
          </div>

          {/* Lista de tipos */}
          <div className="label">Tipos configurados ({roles.length})</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            {roles.map((r) => (
              <div key={r.name} className="card card-pad" style={{ position: "relative" }}>
                <div className="row between" style={{ marginBottom: 8 }}>
                  <span className={`badge badge-${roleColor(r.name)}`}>{r.name}</span>
                  {r.builtin ? (
                    <span className="badge badge-outline">Padrão</span>
                  ) : (
                    <button
                      className="btn btn-ghost btn-icon"
                      style={{ width: 28, height: 28 }}
                      onClick={() =>
                        setRoles((prev) => prev.filter((x) => x.name !== r.name))
                      }
                    >
                      <TrashIcon size={15} />
                    </button>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "var(--muted)",
                    lineHeight: 1.45,
                    minHeight: 34,
                  }}
                >
                  {r.desc}
                </div>
                {r.manage && (
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 11.5,
                      color: "var(--accent)",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <ShieldIcon size={13} /> Gerencia usuários
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Ações */}
          <div className="row between" style={{ marginTop: 6 }}>
            <button className="btn btn-secondary" onClick={() => setStep(0)}>
              <ArrowLeftIcon size={17} /> Voltar
            </button>
            <button className="btn btn-primary" onClick={next}>
              Próximo <ArrowRightIcon size={17} />
            </button>
          </div>
        </div>
      )}

      {/* ── PASSO 3 — Resumo ── */}
      {step === 2 && (
        <div className="scale-in" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <h2 className="h3">Resumo da aplicação</h2>
            <p className="sub" style={{ marginTop: 4 }}>Revise as informações antes de criar.</p>
          </div>

          {/* Cards de resumo */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Informações básicas */}
            <div className="card card-pad" style={{ background: "var(--surface-2)" }}>
              <div className="row between" style={{ marginBottom: 14 }}>
                <span className="label">Informações básicas</span>
                <button className="btn btn-ghost btn-sm" onClick={() => setStep(0)}>
                  <EditIcon size={15} /> Editar
                </button>
              </div>
              {(
                [
                  ["Nome", basic.name || "—"],
                  ["URL", basic.url || "—"],
                  ["Ambiente", basic.env],
                  ["Email verificado", basic.emailVerify ? "Sim" : "Não"],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div
                  key={k}
                  className="row between"
                  style={{
                    padding: "8px 0",
                    borderBottom: "1px solid var(--line-2)",
                    fontSize: 13.5,
                  }}
                >
                  <span style={{ color: "var(--muted)" }}>{k}</span>
                  <span
                    style={{
                      fontWeight: 600,
                      maxWidth: "60%",
                      textAlign: "right",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>

            {/* Tipos de usuário */}
            <div className="card card-pad" style={{ background: "var(--surface-2)" }}>
              <div className="row between" style={{ marginBottom: 14 }}>
                <span className="label">Tipos de usuário ({roles.length})</span>
                <button className="btn btn-ghost btn-sm" onClick={() => setStep(1)}>
                  <EditIcon size={15} /> Editar
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {roles.map((r) => (
                  <span key={r.name} className={`badge badge-${roleColor(r.name)}`}>
                    {r.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* O que acontece depois */}
          <div
            className="card card-pad"
            style={{
              background: "var(--accent-softer)",
              border: "1px solid var(--accent-soft)",
            }}
          >
            <span className="label" style={{ color: "var(--accent-ink)" }}>
              O que acontece depois
            </span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 16,
                marginTop: 14,
              }}
            >
              {(
                [
                  [<KeyIcon key="k" size={16} />, "Você receberá uma chave de API"],
                  [<TerminalIcon key="t" size={16} />, "Use-a para integrar no seu código"],
                  [<CheckCircleIcon key="c" size={16} />, "Teste o fluxo de login"],
                  [<BookIcon key="b" size={16} />, "Veja a documentação de integração"],
                ] as [React.ReactNode, string][]
              ).map(([ic, text], i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "#fff",
                      color: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "none",
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      color: "var(--ink-2)",
                      lineHeight: 1.4,
                      paddingTop: 4,
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Confirmação */}
          <CheckRow on={confirm} onClick={() => setConfirm((c) => !c)}>
            Entendi e quero criar esta aplicação.
          </CheckRow>

          {createError && (
            <div
              className="hint error"
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5 }}
            >
              <AlertIcon size={14} /> {createError}
            </div>
          )}

          {/* Ações */}
          <div className="row between">
            <button className="btn btn-secondary" onClick={() => setStep(1)}>
              <ArrowLeftIcon size={17} /> Voltar
            </button>
            <button
              className="btn btn-primary btn-lg"
              disabled={!confirm || creating}
              onClick={create}
            >
              {creating ? (
                <>
                  <Spinner /> Criando…
                </>
              ) : (
                <>
                  Criar aplicação <CheckIcon size={17} sw={2.6} />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
