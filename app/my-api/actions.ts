'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export interface AppItem {
  id: string
  name: string
  url: string | null
  description: string | null
  environment: string
  requireEmailVerification: boolean
  createdAt: string
  updatedAt: string
}

export type ListAppsResult =
  | { success: true; apps: AppItem[] }
  | { success: false; error: string }

export async function listAppsAction(): Promise<ListAppsResult> {
  const token = (await cookies()).get('auth-token')?.value
  if (!token) redirect('/auth/login')

  let response: Response
  try {
    response = await fetch('http://localhost:8100/api/apps', {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
  } catch {
    return { success: false, error: 'Não foi possível conectar ao servidor.' }
  }

  if (response.status === 401) redirect('/auth/login')
  if (!response.ok) return { success: false, error: 'Erro ao carregar aplicações.' }

  const apps: AppItem[] = await response.json()
  return { success: true, apps }
}

export type DeleteAppResult =
  | { success: true }
  | { success: false; error: string }

export async function deleteAppAction(id: string): Promise<DeleteAppResult> {
  const token = (await cookies()).get('auth-token')?.value
  if (!token) redirect('/auth/login')

  let response: Response
  try {
    response = await fetch(`http://localhost:8100/api/apps/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch {
    return { success: false, error: 'Não foi possível conectar ao servidor.' }
  }

  if (response.status === 401) redirect('/auth/login')
  if (!response.ok) {
    try {
      const data = await response.json()
      return { success: false, error: data.message ?? 'Erro ao deletar aplicação.' }
    } catch {
      return { success: false, error: 'Erro ao deletar aplicação.' }
    }
  }

  return { success: true }
}
