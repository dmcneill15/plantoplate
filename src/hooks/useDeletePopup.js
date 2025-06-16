import { useState } from 'react';
import { deleteRecipe, fetchUserRecipes } from '../app/api/recipesApi';

export const useDeletePopup = (setCurrentRecipes,user_id) => {
    const [showDelete, setShowDelete] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState('');
    const [recipeTitle, setRecipeTitle] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);    // State can be used to give user feedback of progress(spinning wheel)

    const handleShowDelete = (recipe) => {
        setRecipeToDelete(recipe);
        setRecipeTitle(recipe.recipe_title);    //Title for display
        setShowDelete(true);                    //Show the popup
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setRecipeToDelete('');
        setRecipeTitle('');
    };

    const onDeleteSuccess = () => {           
        fetchUserRecipes(user_id);   // Fetch recipes after the delete is successful
        handleCloseDelete();
    };

    const handleDelete = async () => {
        if (!recipeToDelete) return;

        const { _id, recipe_title } = recipeToDelete;
        setIsDeleting(true);

        const result = await deleteRecipe(_id);
        setIsDeleting(false);

        if (result.success) {
            const updatedRecipes = await fetchUserRecipes(user_id);
            const sortedRecipes = updatedRecipes.sort((a, b) => a.recipe_title.localeCompare(b.recipe_title)); // Sort alphabetically
            setCurrentRecipes([...sortedRecipes]);
        } else {
            console.error(`Failed to delete recipe: ${recipe_title}`);
        }
        handleCloseDelete();
    };

    return {
        showDelete,
        recipeToDelete,
        recipeTitle,
        isDeleting,
        setIsDeleting,
        handleShowDelete,
        handleCloseDelete,
        onDeleteSuccess,
        handleDelete,
    };
};