import { getServerAuthSession } from '@/server/auth'
import 'server-only'

export async function isSessionAndAdminOrThrow() {
  const session = await getServerAuthSession()
  if (!session || session.user.role !== 'admin') {
    throw new Error('unauthorized')
  }
}
