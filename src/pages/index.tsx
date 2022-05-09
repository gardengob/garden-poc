import css from './index.module.scss'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/auth/Auth'
import Account from '../components/account/Account'
import { useRouter } from 'next/router'
import UserService from '../services/UserService'

export default function Home() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    UserService.getProfile().then((profile) => {
      setUsername(profile.username)
    })
  }, [])

  return (
    <div className={css.container} style={{ padding: '100px 50px' }}>
      <h1>Bienvenue {username},</h1>
    </div>
  )
}
