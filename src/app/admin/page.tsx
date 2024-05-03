import { createGame } from '@/app/_actions/admin'
import { db } from '@/server/db'
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerAuthSession()
  if (!session || session.user.role !== 'admin') {
    redirect('/api/auth/signin')
  }
  const countries = await db.country.findMany({
    select: {
      name: true,
      id: true,
    },
  })
  return (
    <div>
      <h1>{session.user.email}</h1>
      <form action={createGame} className="flex flex-col">
        <input type="date" name="date" id="date" />
        <input
          type="file"
          name="image"
          id="image"
          accept="image/png, image/jpeg"
        />
        <input type="text" name="hints[0].content" />
        <input type="number" name="hints[0].unlock" />

        <input type="text" name="hints[1].content" />
        <input type="number" name="hints[1].unlock" />

        <input type="text" name="hints[2].content" />
        <input type="number" name="hints[2].unlock" />

        <select name="category">
          <option value="dish">Dish</option>
          <option value="dance">Dance</option>
        </select>

        <select name="correctCountry">
          {countries.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
