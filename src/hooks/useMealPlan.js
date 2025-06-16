import { useState, useEffect } from 'react';
import { addRecipeToMealPlan, getUserMealPlan, updateRecipeInMealPlan, deleteMealPlanEntry } from '../app/api/mealplanApi';


export function useMealPlan(user_id) {
    const [recipeCalendar, setRecipeCalendar] = useState([]);
    
    useEffect(() => {
        const fetchMealPlan = async () => {
            try {
                const mealPlan = await getUserMealPlan(user_id);
                if (mealPlan.data && Array.isArray(mealPlan.data)) {
                    const formattedEvents = mealPlan.data.map(item => ({
                        title: item.title,
                        id: item._id,
                        start: new Date(item.date),
                        allDay: true
                    })).sort((a, b) => a.title.localeCompare(b.title));
                    setRecipeCalendar(formattedEvents);
                } else {
                    console.log('No meal plans found for this user.');
                }
            } catch (error) {
                console.error('Error fetching meal plan:', error);
            }
        };
        fetchMealPlan();
    }, [user_id]);

    const addEvent = async (data) => {
        if (!data || !data.draggedEl) {
            console.error('Invalid data structure:', data);
            return;
        }

        const { draggedEl, date } = data;
        const title = draggedEl.innerText;
        const recipeId = draggedEl.getAttribute("data-id");

        if (!recipeId) {
            console.error('Recipe ID not found in dragged element:', draggedEl);
            return;
        }

        const newMealPlanEntry = {
            user_id: user_id,
            recipe_id: recipeId,
            date: date.toISOString(),
            title: title
        };

        try {
            const newRecipeEntry = await addRecipeToMealPlan(newMealPlanEntry);
            const newEvent = {
                title: title,
                start: date.toISOString(),
                allDay: true,
                id: newRecipeEntry.data._id,
                key: newRecipeEntry.data._id
            };
            setRecipeCalendar(recipeCalendar => [...recipeCalendar, newEvent]);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert(error.response.data.message);
            } else {
                console.error('Error adding recipe to meal plan:', error);
            }
        }
    };

    const updateEvent = async (info) => {
        const { event } = info;
        const mealPlanId = event.id;
        const date = event.start;

        if (!mealPlanId) {
            console.error('Meal plan ID not found in event:', event);
            return;
        }

        const updatedMealPlanEntry = {
            _id: mealPlanId,
            date: date.toISOString(),
        };

        try {
            await updateRecipeInMealPlan(updatedMealPlanEntry);
            setRecipeCalendar(prevEvents =>
                prevEvents.map(event =>
                    event.id === mealPlanId ? { ...event, start: date.toISOString() } : event
                )
            );
        } catch (error) {
            console.error('Error updating recipe in meal plan:', error);
        }
    };

    const deleteRecipeFromMealPlan = async (recipe, handleCloseDelete, setIsDeleting) => {
        if (!recipe) return;
        const { id, title } = recipe;

        setIsDeleting(true);
        try {
            await deleteMealPlanEntry(id);
            setRecipeCalendar(prevEvents => prevEvents.filter(event => event.id !== id));
            setIsDeleting(false);
            handleCloseDelete();
        } catch (error) {
            console.error('Error deleting recipe from meal plan:', error);
            setIsDeleting(false);
        }
    };

    return { recipeCalendar, addEvent, updateEvent, deleteRecipeFromMealPlan };
}


