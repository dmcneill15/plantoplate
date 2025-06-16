const baseURL = "/api/recipes"; // base URL using NextJS API Router

export const fetchRecipes = async () => {
    try {
        const response = await fetch(`${baseURL}`, { cache: 'no-cache' });
        
        if (!response.ok) 
            throw new Error('Failed to fetch recipes');

        const result = await response.json();
        const recipesArray = result.data;
        return recipesArray;

    } catch (error) {
        console.error('Failed to fetch recipes:', error);
        throw error; 
    }
};

export const fetchUserRecipes = async (user_id) => {
    try {
        const response = await fetch(`${baseURL}/${user_id}`, { cache: 'no-cache' });
        if (!response.ok) 
            throw new Error('Failed to fetch recipes');

        const result = await response.json();
        const recipesArray = result.data;
        return recipesArray;
    } catch (error) {
        console.error('Failed to fetch recipes:', error);
        throw error; 
    }
};

export const addRecipe = async (newRecipe, user_id) => {
    const newRecipeWithId = {
        ...newRecipe,
        user_id: user_id,
    };
    console.log('New recipe with userid:', newRecipeWithId);
    try {
        const response = await fetch(`${baseURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipeWithId)
        });

        if (response.ok) {
            return response.json();
        } else {
            console.error('Failed to add recipe');
            return response.json();
        }
    } catch (error) {
        console.error('Error adding recipe:', error);
        throw error;
    }
};

export const deleteRecipe = async (recipeId) => {
    try {
        const response = await fetch(`${baseURL}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: recipeId }),
        });

        if (response.ok) {
            return { success: true };
        } else {
            console.error('Failed to delete recipe');
            return { success: false };
        }
    } catch (error) {
        console.error('Error deleting recipe:', error);
        return { success: false, error };
    }
};

export const updateRecipe = async (recipeToUpdateId, recipeUpdates) => {
    try {
        const response = await fetch(`${baseURL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: recipeToUpdateId,
                ...recipeUpdates,
            }),
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to update recipe');
        }
    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error;
    }
}