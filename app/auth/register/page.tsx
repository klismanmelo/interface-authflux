import Link from 'next/link'
import { ArrowLeftIcon } from '../../components/Icons'
import RegisterForm from './RegisterForm'

export default function RegisterPage() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '28px 40px',
          alignItems: 'center',
        }}
      >
        <Link
          href="/auth/login"
          className="btn btn-ghost btn-sm"
          style={{ marginLeft: -8, textDecoration: 'none' }}
        >
          <ArrowLeftIcon size={17} /> Voltar para login
        </Link>
        <span className="badge badge-gray">Passo 1 de 1</span>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px 40px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 392 }} className="fade-in">
          <h1 className="h1">Criar conta</h1>
          <p className="sub" style={{ marginTop: 8 }}>
            Leva apenas 2 minutos. Sem cartão de crédito.
          </p>

          <RegisterForm />

          <p
            style={{
              fontSize: 13,
              color: 'var(--muted)',
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            Já tem conta?{' '}
            <Link
              href="/auth/login"
              style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}
            >
              Volte ao login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
