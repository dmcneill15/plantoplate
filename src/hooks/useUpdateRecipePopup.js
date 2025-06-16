import { useState } from 'react';
import { updateRecipe, fetchUserRecipes } from '../app/api/recipesApi';

export const useUpdateRecipePopup = (setCurrentRecipes,user_id) => {
    const [recipeToUpdate, setRecipeToUpdate] = useState('');
    const [showUpdateRecipe, setShowUpdateRecipe] = useState(false);
    const [updatedRecipe, setUpdatedRecipe] = useState({ recipe_title: '', method: '', servings: '', image: '' });
    const [isUpdating, setIsUpdating] = useState(false);

    const handleCloseUpdateRecipe = () => {
        setShowUpdateRecipe(false);
        setUpdatedRecipe({ recipe_title: '', method: '', servings: '', image: '' }); // Reset input fields
    };

    const handleShowUpdateRecipe = (recipe) => {
        setRecipeToUpdate(recipe);
        setUpdatedRecipe({
            recipe_title: recipe.recipe_title,
            method: recipe.method,
            servings: recipe.servings,
            image: recipe.image || '',
        });
        setShowUpdateRecipe(true);
    };

    const handleUpdateRecipe = async (e) => {
        e.preventDefault(); // Prevent the browser from refreshing when handling a form
        setIsUpdating(true);

        const recipeUpdates = {}; // Only send updated fields to the API
        if (updatedRecipe.recipe_title !== recipeToUpdate) recipeUpdates.new_title = updatedRecipe.recipe_title;
        if (updatedRecipe.method) recipeUpdates.new_method = updatedRecipe.method;
        if (updatedRecipe.servings) recipeUpdates.new_servings = updatedRecipe.servings;
        if (updatedRecipe.image) recipeUpdates.new_image = updatedRecipe.image;

        try {
            await updateRecipe(recipeToUpdate._id, recipeUpdates); // Call the API function
            const updatedRecipes = await fetchUserRecipes(user_id);
            const sortedRecipes = updatedRecipes.sort((a, b) => a.recipe_title.localeCompare(b.recipe_title)); // Sort alphabetically
            setCurrentRecipes([...sortedRecipes]);

        } catch (error) {
            console.error('Error updating recipe:', error);
        } finally {
            setIsUpdating(false);
            handleCloseUpdateRecipe();
        }
    };

    return {
        recipeToUpdate,
        showUpdateRecipe,
        updatedRecipe,
        isUpdating,
        handleCloseUpdateRecipe,
        handleShowUpdateRecipe,
        handleUpdateRecipe,
        setUpdatedRecipe,
    };
};