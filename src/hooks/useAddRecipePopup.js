import { useState } from 'react';
import { addRecipe, fetchRecipes, fetchUserRecipes } from '../app/api/recipesApi';

export const useAddRecipePopup = (setCurrentRecipes, user_id) => {
    
    const [newRecipe, setNewRecipe] = useState({recipe_title: '', method: '', servings: '', image: '',});
    const [showAddRecipe, setShowAddRecipe] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCloseAddRecipe = () => {
        setShowAddRecipe(false);
        setNewRecipe({ recipe_title: '', method: '', servings: '', image: '' }); // Reset input fields
    };

    const handleShowAddRecipe = () => setShowAddRecipe(true);

    const handleAddRecipe = async (e) => {
        e.preventDefault(); // Prevent the browser from refreshing when handling the form
        setIsAdding(true);
        setErrorMessage(''); // Reset error message before adding a new recipe
    
        try {
            const result = await addRecipe(newRecipe, user_id);
            if (result.result === 409) {
                setErrorMessage('Recipe title already exists for this user. Please choose a different title.');
            } else {
                const updatedRecipes = await fetchUserRecipes(user_id);
                const sortedRecipes = updatedRecipes.sort((a, b) => a.recipe_title.localeCompare(b.recipe_title)); // Sort alphabetically
                setCurrentRecipes(sortedRecipes);
                handleCloseAddRecipe();
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
            setErrorMessage('An error occurred while adding the recipe. Please try again.');
        } finally {
            setIsAdding(false);
        }
    };

    return {
        newRecipe,
        setNewRecipe,
        showAddRecipe,
        isAdding,
        errorMessage,
        handleCloseAddRecipe,
        handleShowAddRecipe,
        handleAddRecipe,
    };
};