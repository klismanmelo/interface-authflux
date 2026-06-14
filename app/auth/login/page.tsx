import Link from 'next/link'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '28px 40px',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span style={{ fontSize: 13.5, color: 'var(--muted)' }}>
          Primeira vez aqui?
        </span>
        <Link href="/auth/register" className="btn btn-secondary btn-sm">
          Criar conta
        </Link>
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
        <div style={{ width: '100%', maxWidth: 380 }} className="fade-in">
          <h1 className="h1">Bem-vindo de volta</h1>
          <p className="sub" style={{ marginTop: 8 }}>
            Autenticação simples para os seus usuários. Entre para gerenciar
            suas aplicações.
          </p>

          <LoginForm />

          <p
            style={{
              fontSize: 13,
              color: 'var(--muted)',
              textAlign: 'center',
              marginTop: 22,
            }}
          >
            Primeira vez aqui?{' '}
            <Link
              href="/auth/register"
              style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}
            >
              Clique em &quot;Criar conta&quot;
            </Link>
          </p>
        </div>
      </div>

      <footer
        style={{
          padding: '22px 40px',
          display: 'flex',
          gap: 22,
          justifyContent: 'center',
          borderTop: '1px solid var(--line-2)',
        }}
      >
        {['Termos de Serviço', 'Documentação', 'Contato'].map((t) => (
          <a
            key={t}
            href="#"
            style={{ fontSize: 12.5, color: 'var(--faint)', textDecoration: 'none' }}
          >
            {t}
          </a>
        ))}
      </footer>
    </>
  )
}
