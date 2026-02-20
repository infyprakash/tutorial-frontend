'use server'

import { createSession } from './utils'
import { redirect } from 'next/navigation'
import { deleteSession } from './utils'

export async function loginAction(bearerToken) {
    await createSession(bearerToken)
    redirect('/')
}

export async function logoutAction() {
    await deleteSession()
    redirect('/login')
}