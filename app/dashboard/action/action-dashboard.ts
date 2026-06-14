'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type UserProfile = {
  username: string
  email: string
}

export async function getMeAction(): Promise<UserProfile> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    redirect('/auth/login')
  }

  let response: Response
  try {
    response = await fetch('http://localhost:8100/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
  } catch {
    redirect('/auth/login')
  }

  if (!response.ok) {
    redirect('/auth/login')
  }

  return response.json()
}
