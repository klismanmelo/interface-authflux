'use client'

import { useActionState, useState } from 'react'
import { registerAction, type RegisterState } from '../action/action-auth'
import {
  UserIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  AlertIcon,
  CheckCircleIcon,
} from '../../components/Icons'

function getStrength(pw: string): { level: number; label: string; color: string } {
  if (!pw) return { level: 0, label: '', color: 'var(--line)' }
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^a-zA-Z0-9]/.test(pw)) score++
  if (score <= 1) return { level: 1, label: 'Fraca', color: 'var(--red)' }
  if (score === 2) return { level: 2, label: 'Razoável', color: 'var(--amber)' }
  if (score === 3) return { level: 3, label: 'Boa', color: 'var(--accent)' }
  return { level: 4, label: 'Forte', color: 'var(--green)' }
}

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState<RegisterState, FormData>(registerAction, null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [password, setPassword] = useState('')

  const strength = getStrength(password)

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 15, marginTop: 24 }}>
      {state?.error && (
        <div
          style={{
            display: 'flex',
            background: 'var(--red-soft)',
            border: '1px solid #f7caca',
            borderRadius: 10,
            padding: '11px 14px',
            gap: 9,
            alignItems: 'flex-start',
          }}
        >
          <AlertIcon size={17} style={{ color: 'var(--red)', flex: 'none', marginTop: 1 }} />
          <div style={{ fontSize: 13, color: 'var(--red)', lineHeight: 1.45 }}>
            {state.error}
          </div>
        </div>
      )}

      {/* Username */}
      <div className="field">
        <label className="label" htmlFor="username">Username</label>
        <div className="input-wrap">
          <span className="lead"><UserIcon size={18} /></span>
          <input
            id="username"
            name="username"
            className="input"
            type="text"
            placeholder="mariasouza"
            autoComplete="username"
          />
        </div>
      </div>

      {/* Email */}
      <div className="field">
        <label className="label" htmlFor="email">Email</label>
        <div className="input-wrap">
          <span className="lead"><MailIcon size={18} /></span>
          <input
            id="email"
            name="email"
            className="input"
            type="email"
            placeholder="voce@empresa.com"
            autoComplete="email"
          />
          <span className="trail" style={{ right: 12 }}>
            <CheckCircleIcon size={18} style={{ color: 'var(--faint)' }} />
          </span>
        </div>
      </div>

      {/* Senha */}
      <div className="field">
        <label className="label" htmlFor="password">Senha</label>
        <div className="input-wrap">
          <span className="lead"><LockIcon size={18} /></span>
          <input
            id="password"
            name="password"
            className="input"
            type="password"
            placeholder="Crie uma senha"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="trail">
            <button type="button" className="btn btn-ghost btn-icon" style={{ height: 32, width: 32 }}>
              <EyeIcon size={17} />
            </button>
          </span>
        </div>

        {password && (
          <div style={{ marginTop: 2 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 99,
                    background: i < strength.level ? strength.color : 'var(--line)',
                    transition: 'background .2s',
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: 12, color: strength.color, fontWeight: 600, marginTop: 6 }}>
              {strength.label}
            </div>
          </div>
        )}
        <span className="hint">Mínimo 8 caracteres, com letras e números.</span>
      </div>

      {/* Confirmar senha */}
      <div className="field">
        <label className="label" htmlFor="password2">Confirmar senha</label>
        <div className="input-wrap">
          <span className="lead"><LockIcon size={18} /></span>
          <input
            id="password2"
            name="password2"
            className="input"
            type="password"
            placeholder="Repita a senha"
            autoComplete="new-password"
          />
          <span className="trail">
            <button type="button" className="btn btn-ghost btn-icon" style={{ height: 32, width: 32 }}>
              <EyeIcon size={17} />
            </button>
          </span>
        </div>
      </div>

      {/* Termos — checkbox oculto capturado pelo FormData */}
      <input
        type="checkbox"
        name="terms"
        value="accepted"
        checked={termsAccepted}
        onChange={() => {}}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={() => setTermsAccepted((v) => !v)}
        style={{
          display: 'flex',
          gap: 11,
          alignItems: 'flex-start',
          background: 'none',
          border: 'none',
          padding: 0,
          textAlign: 'left',
          width: '100%',
          cursor: 'pointer',
        }}
      >
        <span style={{ marginTop: 1 }}>
          <span className={termsAccepted ? 'check on' : 'check'}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: termsAccepted ? 1 : 0 }}
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
        </span>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink-2)' }}>
          Li e aceito os{' '}
          <a href="#" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
            Termos de Serviço
          </a>{' '}
          e a{' '}
          <a href="#" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
            Política de Privacidade
          </a>
          .
        </span>
      </button>

      <button
        type="submit"
        className="btn btn-primary btn-lg btn-block"
        disabled={isPending}
      >
        {isPending ? 'Criando conta...' : 'Criar conta'}
      </button>
    </form>
  )
}
