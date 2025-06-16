import { useState } from 'react';

export const useRecipeDetailsPopup = () => {
    const [showRecipeDetails, setShowRecipeDetails] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleShowRecipeDetails = (recipe) => {
        setSelectedRecipe(recipe);
        setShowRecipeDetails(true);
    };

    const handleCloseRecipeDetails = () => {
        setShowRecipeDetails(false);
    };

    return {
        showRecipeDetails,
        selectedRecipe,
        handleShowRecipeDetails,
        handleCloseRecipeDetails,
    };
};