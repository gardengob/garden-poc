import css from './RecipeInstructionsStep.module.scss'
import { useEffect, useRef, useState } from 'react'

export default function RecipeInstructionsStep({
  instructions,
  instructionsChange,
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const addInstructionHandler = (ingredient_name: string) => {
    if (ingredient_name === '' || ingredient_name.trim().length === 0) return

    instructionsChange((instructions) => [...instructions, ingredient_name])
    inputRef.current.value = ''
  }

  return (
    <div className={css.root}>
      <h3 className={css.title}>Étapes</h3>

      <div className={css.instructions}>
        {instructions.map(function (item, i) {
          return <li key={i}>{item}</li>
        })}
      </div>
      
      <div className={css.combo}>
        <input
          id="instruction"
          type="text"
          placeholder="Étape à ajouter"
          ref={inputRef}
        />
        <button
          className={css.button}
          onClick={(e) => addInstructionHandler(inputRef.current.value)}
        >
          Ajouter étape
        </button>
      </div>
    </div>
  )
}
