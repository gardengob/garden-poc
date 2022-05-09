import css from './RecipeInformationsStep.module.scss'
import { useEffect, useState } from 'react'

export default function RecipeInformationsStep({
  name,
  nameChange,
  people,
  peopleChange,
  prepTime,
  prepTimeChange,
  cookTime,
  cookTimeChange,
}) {
  useEffect(() => {}, [])

  return (
    <div className={css.root}>
      <h3 className={css.title}>Information</h3>
      <input
        name="name"
        id="name"
        type="text"
        placeholder="Nom de la recette"
        value={name}
        onChange={nameChange}
      />
      <input
        name="people"
        id="people"
        type="text"
        placeholder="Nombre de personnes"
        value={people}
        onChange={peopleChange}
      />
      <input
        name="prepTime"
        id="prepTime"
        type="text"
        placeholder="Temps de préparation"
        value={prepTime}
        onChange={prepTimeChange}
      />
      <input
        name="cookTime"
        id="cookTime"
        type="text"
        placeholder="Temps de cuisson"
        value={cookTime}
        onChange={cookTimeChange}
      />
    </div>
  )
}
