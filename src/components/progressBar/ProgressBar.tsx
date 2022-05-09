import css from './ProgressBar.module.scss'
import { useEffect } from 'react'

export default function ProgressBar(progress: number) {

  useEffect(() => {
  }, [])


  return (
    <div className={css.root}>
      ProgressBar
      <div className="progress" style={{width: `${progress}%`}}></div>
    </div>
  )
}