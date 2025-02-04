import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import LeftMenu from '../LeftMenu';

export default function Home() {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const getAllRecipes = () => {
        axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
            .then(data => {
                setRecipes(data.data.meals);
            });
    }

    const getMealsByCategory = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            getAllRecipes();
        }
        else {
            axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
                .then(data => {
                    setRecipes(data.data.meals);
                });
        }
    }

    useEffect(() => {
        getAllRecipes();

        axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
            .then(data => {
                setCategories([{ strCategory: "All" }, ...data.data.meals]);
            });
    }, []);


    return <>
        <div className='mainMenu flex flex-wrap'>
            <div className='w-full'>
                <h1 className='text-orange'>Learn, Cook, Eat Your Food</h1>
                <div className='flex gap-3 my-4 flex-wrap'>
                    {
                        categories.map((category, index) => (
                            <button key={index} className={`${category.strCategory === selectedCategory ? 'activeCategory ' : ''}categoryButton`} onClick={() => { getMealsByCategory(category.strCategory) }}>{category.strCategory}</button>
                        ))
                    }
                </div>
                <hr className='my-8' />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {recipes?.map((recipe, index) => (
                    <div key={index} className="recipeCard rounded-3xl text-center mx-2 my-6">
                        <div className="flex flex-col justify-between gap-3">
                            <div className="relative cardImg">
                                <img src={recipe.strMealThumb} className="w-3/4 rounded-full" alt="" />
                            </div>
                            <h2>{recipe.strMeal.split(" ").slice(0, 2).join(" ")}</h2>
                            <h3 className="text-green">{recipe.strArea}</h3>
                            <h2 className="viewRecipe" onClick={() => navigate(`/mealdetails/${recipe.idMeal}`)}>View Recipe</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
}
