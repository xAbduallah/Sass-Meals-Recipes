import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MealDetails = () => {
    const { mealID } = useParams();
    const [meal, setMeal] = useState(null);

    let ingredients = [{}];
    if (meal) {
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            if (ingredient !== '') {
                let measure = meal[`strMeasure${i}`];
                ingredients.push({ ingredient, measure });
            }
        }
    }

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then((response) => {
            console.log(response);
            setMeal(response.data.meals[0]);
        });

    }, [mealID]);

    return (
        <div className='mealDetails p-4'>
            {meal ? (
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='mb-2 text-3xl font-bold'>{meal.strMeal}</h1>
                    <div className='flex flex-col lg:flex-row items-center justify-around w-full mb-4 gap-5'>
                        <img src={meal.strMealThumb} alt={meal.strMeal} className='mealThumb rounded-3xl mb-4 lg:mb-0 w-1/2 lg:w-2/4' />
                        <div className='bg-white p-4 rounded-3xl mealThumb text-center shadow-lg'>
                            <h2 className='text-xl font-semibold mb-4'>Ingredients</h2>
                            <hr className='w-full my-4 h-1 bg-gray-200'></hr>
                            <div className='flex flex-col'>
                                {ingredients?.map((inge, index) => (
                                    <div key={index} className="flex flex-row justify-between py-2">
                                        <span className='text-lg'>{inge.ingredient}</span>
                                        <span className='text-lg'>{inge.measure}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <h2 className='text-2xl font-semibold mb-4'>Instructions</h2>
                    <hr className='w-3/4 my-4 h-1 bg-gray-200'></hr>
                    <div className='w-3/4'>
                        <p className='instructions text-lg leading-relaxed'>{meal.strInstructions}</p>
                    </div>
                    <hr className='w-3/4 my-4 h-1 bg-gray-200'></hr>
                </div>
            ) : (
                <div className='text-center'>
                    <h1 className='text-2xl font-bold'>Meal not found</h1>
                </div>
            )}
        </div>
    );

    {
    /*
    "idMeal": "52772",
    "strYoutube": "https://www.youtube.com/watch?v=4aZr5hZXP_s",

    "strIngredient1": "soy sauce",
    "strIngredient2": "water",
    "strIngredient3": "brown sugar",
    "strIngredient4": "ground ginger",
    "strIngredient5": "minced garlic",
    "strIngredient6": "cornstarch",
    "strIngredient7": "chicken breasts",
    "strIngredient8": "stir-fry vegetables",
    "strIngredient9": "brown rice",
    "strMeasure1": "3/4 cup",
    "strMeasure2": "1/2 cup",
    "strMeasure3": "1/4 cup",
    "strMeasure4": "1/2 teaspoon",
    "strMeasure5": "1/2 teaspoon",
    "strMeasure6": "4 Tablespoons",
    "strMeasure7": "2",
    "strMeasure8": "1 (12 oz.)",
    "strMeasure9": "3 cups",                    
    */}
};

export default MealDetails;