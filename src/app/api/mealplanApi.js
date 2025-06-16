const baseURL = "/api/mealplan"; // base URL using NextJS API Router

export const addRecipeToMealPlan = async (mealPlanData) => {
      try {
        const response = await fetch(`${baseURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mealPlanData),
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to add recipe to meal plan');
        }
    } catch (error) {
        console.error('Error adding recipe to meal plan:', error);
        throw error;
    }
};

export const getUserMealPlan = async (user_id) => {
    try {
        const response = await fetch(`${baseURL}/${user_id}`);

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch meal plan');
        }
    } catch (error) {
        console.error('Error fetching meal plan:', error);
        throw error;
    }
};

export const updateRecipeInMealPlan = async (mealPlanData) => {
    try {
        const response = await fetch(`${baseURL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mealPlanData),
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to update recipe in meal plan');
        }
    } catch (error) {
        console.error('Error updating recipe in meal plan:', error);
        throw error;
    }
};

export const deleteMealPlanEntry = async (mealPlanID) => {
    console.log(`Meal plan to delete: ${mealPlanID}`)
    try {
        const response = await fetch(`${baseURL}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: mealPlanID }),
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