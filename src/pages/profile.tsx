import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
import Account from '../components/account/Account'
import { supabase } from '../utils/supabaseClient'
import css from './profile.module.scss'

export default function Profile() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className={css.container} style={{ padding: '100px 50px' }}>
      {session && <Account key={session.user.id} session={session} />}
    </div>
  )
}
