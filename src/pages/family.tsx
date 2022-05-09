import { useEffect, useLayoutEffect, useState } from 'react'
import AddFamily from '../components/addFamily/AddFamily'
import { supabase } from '../utils/supabaseClient'
import css from './family.module.scss'

export default function Family() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className={css.root} style={{ padding: '100px 50px' }}>
      <AddFamily />
    </div>
  )
}
