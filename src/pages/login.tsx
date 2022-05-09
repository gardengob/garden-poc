import css from './index.module.scss'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/auth/Auth'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className={css.container} style={{ padding: '50px 0 100px 0' }}>
      LoginPage
      {!session && <Auth />}
    </div>
  )
}
