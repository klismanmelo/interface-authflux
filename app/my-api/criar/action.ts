'use server'

import { cookies } from 'next/headers'

export interface AppBasic {
  name: string
  url: string
  desc: string
  env: 'Desenvolvimento' | 'Produção'
  emailVerify: boolean
}

export interface AppRole {
  name: string
  desc: string
  manage: boolean
  builtin: boolean
}

export type CreateAppResult =
  | { success: true; appId: string }
  | { success: false; error: string }

export async function createApp(basic: AppBasic, roles: AppRole[]): Promise<CreateAppResult> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return { success: false, error: 'Sessão expirada. Faça login novamente.' }
  }

  const payload = {
    name: basic.name.trim(),
    url: basic.url.trim() || null,
    description: basic.desc.trim() || null,
    environment: basic.env === 'Produção' ? 'production' : 'development',
    requireEmailVerification: basic.emailVerify,
    roles: roles.map((r) => ({
      name: r.name,
      description: r.desc,
      canManageUsers: r.manage,
      builtin: r.builtin,
    })),
  }

  let response: Response
  try {
    response = await fetch('http://localhost:8100/api/apps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
  } catch {
    return { success: false, error: 'Não foi possível conectar ao servidor. Tente novamente.' }
  }

  if (!response.ok) {
    try {
      const data = await response.json()
      return { success: false, error: data.message ?? 'Erro ao criar aplicação. Tente novamente.' }
    } catch {
      return { success: false, error: 'Erro ao criar aplicação. Tente novamente.' }
    }
  }

  const app = await response.json()
  return { success: true, appId: app.id }
}
