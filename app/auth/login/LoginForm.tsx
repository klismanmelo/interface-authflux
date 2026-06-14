'use client'

import { useActionState } from 'react'
import { loginAction, type LoginState } from '../action/action-auth'
import { MailIcon, LockIcon, EyeIcon, AlertIcon } from '../../components/Icons'

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(loginAction, null)

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
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

      <div className="field">
        <label className="label" htmlFor="email">Email</label>
        <div className="input-wrap">
          <span className="lead"><MailIcon size={18} /></span>
          <input
            id="email"
            name="email"
            className="input"
            type="email"
            defaultValue="dev@aurora.com.br"
            placeholder="voce@empresa.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="field">
        <div className="row between">
          <label className="label" htmlFor="password">Senha</label>
          <a
            href="#"
            style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}
          >
            Esqueci minha senha
          </a>
        </div>
        <div className="input-wrap">
          <span className="lead"><LockIcon size={18} /></span>
          <input
            id="password"
            name="password"
            className="input"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <span className="trail">
            <button type="button" className="btn btn-ghost btn-icon" style={{ height: 32, width: 32 }}>
              <EyeIcon size={17} />
            </button>
          </span>
        </div>
      </div>

      <button
        type="button"
        style={{
          display: 'flex',
          gap: 11,
          alignItems: 'center',
          background: 'none',
          border: 'none',
          padding: 0,
          textAlign: 'left',
          width: '100%',
          cursor: 'pointer',
        }}
      >
        <span className="check on">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink-2)' }}>Manter conectado</span>
      </button>

      <button
        type="submit"
        className="btn btn-primary btn-lg btn-block"
        disabled={isPending}
      >
        {isPending ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
