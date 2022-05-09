import css from './RecipeIngredientsStep.module.scss'
import { useEffect, useRef, useState } from 'react'

export default function RecipeIngredientsStep({
  ingredients,
  ingredientsChange,
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const addIngredientHandler = (ingredient_name: string) => {
    if (ingredient_name === '' || ingredient_name.trim().length === 0) return

    ingredientsChange((ingredients) => [...ingredients, ingredient_name])
    inputRef.current.value = ''
  }

  return (
    <div className={css.root}>
      <h3 className={css.title}>Ingrédients</h3>

      <div className={css.ingredients}>
        {ingredients.map(function (item, i) {
          return <li key={i}>{item}</li>
        })}
      </div>

      <div className={css.combo}>
        <input
          id="ingredient"
          type="text"
          placeholder="Ingrédient à ajouter"
          ref={inputRef}
        />
        <button
          className={css.button}
          onClick={(e) => addIngredientHandler(inputRef.current.value)}
        >
          Ajouter ingrédient
        </button>
      </div>
    </div>
  )
}
