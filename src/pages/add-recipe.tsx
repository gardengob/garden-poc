import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
import ProgressBar from '../components/progressBar/ProgressBar'
import RecipeInformationsStep from '../components/recipeInformationsStep/RecipeInformationsStep'
import RecipeIngredientsStep from '../components/recipeIngredientsStep/RecipeIngredientsStep'
import RecipeInstructionsStep from '../components/recipeInstructionsStep/RecipeInstructionsStep'
import FamilyService from '../services/FamilyService'
import RecipeService from '../services/RecipeService'
import UserService from '../services/UserService'
import { merge } from '../utils/arrayUtils'
import { supabase } from '../utils/supabaseClient'
import css from './add-recipe.module.scss'

const MAX_FORM_STEP = 3

export default function AddRecipe() {
  const router = useRouter()
  const [progress, setProgress] = useState<number>(1)
  const [step, setStep] = useState(1)

  const [recipe, setRecipe] = useState({})

  // TODO: Ask yourselves if stocking this in localStorage is useful, maybe for keeping info when offline / refreshing ? Delete it when posting

  const [name, setName] = useState('')
  const [people, setPeople] = useState(0)
  const [prepTime, setPrepTime] = useState('')
  const [cookTime, setCookTime] = useState('')

  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState([])

  useEffect(() => {
    setRecipe({
      name: name,
      people: people,
      preparation_time: prepTime,
      cooking_time: cookTime,
      ingredients: ingredients,
      instructions: instructions,
    })
  }, [name, people, prepTime, cookTime, ingredients, instructions])

  const prevForm = (e) => {
    e.preventDefault()
    setStep((currentStep) => currentStep - 1)
  }

  const nextForm = (e) => {
    e.preventDefault()
    setStep((currentStep) => currentStep + 1)
  }

  const finishForm = (e) => {
    RecipeService.add(recipe, () => {
      setStep((currentStep) => currentStep + 1)
    })
  }

  return (
    <div className={css.root} style={{ padding: '100px 50px' }}>
      {/* <ProgressBar progress={progress} /> */}

      <div className={css.container}>
        <h2 className={css.title}>Ajouter une recette</h2>

        {step === 1 && (
          <RecipeInformationsStep
            name={name}
            nameChange={(e) => setName(e.target.value)}
            people={people}
            peopleChange={(e) => setPeople(e.target.value)}
            prepTime={prepTime}
            prepTimeChange={(e) => setPrepTime(e.target.value)}
            cookTime={cookTime}
            cookTimeChange={(e) => setCookTime(e.target.value)}
          />
        )}
        {step === 2 && (
          <RecipeIngredientsStep
            ingredients={ingredients}
            ingredientsChange={(newIngredients) =>
              setIngredients(newIngredients)
            }
          />
        )}
        {step === 3 && (
          <RecipeInstructionsStep
            instructions={instructions}
            instructionsChange={(newInstructions) =>
              setInstructions(newInstructions)
            }
          />
        )}
        {step === MAX_FORM_STEP + 1 && (
          <div>
            <p className={css.congrats}>Vous avez ajouté une recette bravo !</p>
            <button
              className={css.btn}
              name="button"
              onClick={() => router.push('/recipes')}
            >
              Revenir aux recettes
            </button>
          </div>
        )}

        <div className={css.actions}>
          {step > 1 && step < MAX_FORM_STEP + 1 && (
            <button className={css.btn} name="button" onClick={prevForm}>
              Précédent
            </button>
          )}
          {step === MAX_FORM_STEP && (
            <button className={merge([css.btn, css['btn-finish']])} name="button" onClick={finishForm}>
              Terminer
            </button>
          )}
          {step < MAX_FORM_STEP && (
            <button className={css.btn} name="button" onClick={nextForm}>
              Suivant
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
