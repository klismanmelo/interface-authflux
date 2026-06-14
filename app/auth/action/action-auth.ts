'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type LoginState = {
  error?: string
} | null

export async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email e senha são obrigatórios.' }
  }

  let response: Response
  try {
    response = await fetch('http://localhost:8100/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
  } catch {
    return { error: 'Não foi possível conectar ao servidor. Tente novamente.' }
  }

  if (!response.ok) {
    return { error: 'Email ou senha incorretos. Verifique e tente novamente.' }
  }

  const data = await response.json()
  const token: string = data.token

  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  redirect('/dashboard')
}

export type RegisterState = {
  error?: string
} | null

export async function registerAction(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const password2 = formData.get('password2') as string
  const terms = formData.get('terms')

  if (!username || !email || !password || !password2) {
    return { error: 'Preencha todos os campos.' }
  }

  if (password.length < 8) {
    return { error: 'A senha deve ter pelo menos 8 caracteres.' }
  }

  if (password !== password2) {
    return { error: 'As senhas não coincidem.' }
  }

  if (!terms) {
    return { error: 'Você precisa aceitar os Termos de Serviço.' }
  }

  let response: Response
  try {
    response = await fetch('http://localhost:8100/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
  } catch {
    return { error: 'Não foi possível conectar ao servidor. Tente novamente.' }
  }

  if (!response.ok) {
    try {
      const data = await response.json()
      return { error: data.message ?? 'Não foi possível criar a conta. Tente novamente.' }
    } catch {
      return { error: 'Não foi possível criar a conta. Tente novamente.' }
    }
  }

  redirect('/auth/login')
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
  redirect('/auth/login')
}
