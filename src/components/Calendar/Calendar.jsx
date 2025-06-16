'use client' // client component, not server rendered
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'; // Import List plugin
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { fetchRecipes, fetchUserRecipes } from '@/app/api/recipesApi';
import AddRecipePopup from '../AddRecipePopup';
import DeletePopup from '../DeletePopup';
import { useAddRecipePopup } from '@/hooks/useAddRecipePopup'
import { useMealPlan } from '@/hooks/useMealPlan';
import { useDeletePopup } from '@/hooks/useDeletePopup';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import { Button, Form } from 'react-bootstrap';
import { faunaOne, montega } from '@/lib/fonts';

import { useState, useEffect, useRef } from 'react'


export default function Calendar({ user }) {

    //const userId = '66f739adc717200fa34ac24b';          // Hardcoded user ID for now
    const user_id = user._id;
    const [recipeList, setRecipeList] = useState([]);   // List of all users recipes
    const [refresh, setRefresh] = useState(false);      // Flag to refresh the calendar display
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [loading, setLoading] = useState(true);

    const draggableInitialized = useRef(false);         // Track Draggable initialization
    const calendarRef = useRef(null);

    const forceRerender = () => {
        setRefresh(prev => !prev);
    };

    /*---ADD Recipe to Meal Plan Hook---*/
    const {
        recipeCalendar,
        addEvent,
        updateEvent,
        deleteRecipeFromMealPlan
    } = useMealPlan(user_id);
    /*--------------------------------*/

    /*---ADD Recipe to Catalog Hook---*/
    const {
        newRecipe,
        setNewRecipe,
        showAddRecipe,
        isAdding,
        handleCloseAddRecipe,
        handleShowAddRecipe,
        handleAddRecipe,
    } = useAddRecipePopup(setRecipeList, user_id);
    /*--------------------------------*/

    /*---DELETE Recipe from Meal Plan Hook---*/
    const {
        showDelete,
        recipeToDelete,
        isDeleting,
        setIsDeleting,
        handleShowDelete,
        handleCloseDelete,
    } = useDeletePopup();
    /*--------------------------------*/

    // Fetch recipes when the component mounts to display list on the right hand side
    useEffect(() => {
        const getRecipes = async () => {
            try {
                setLoading(true);
                const recipes = await fetchUserRecipes(user_id);
                const formattedRecipes = recipes.map(recipe => ({
                    recipe_title: recipe.recipe_title,
                    id: recipe.recipe_id,
                })).sort((a, b) => a.recipe_title.localeCompare(b.title)); //Sort alphabetically
                setRecipeList(formattedRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                setLoading(false);
            }
        };
        getRecipes();
    }, [refresh]);  //can't use recipeList here as it may cause infinte loop. Rather use a flag to refresh recipe display on calendar 


    // Filter recipes based on search query 
    const filteredRecipes = recipeList.filter(recipe =>
        recipe.recipe_title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    useEffect(() => {
        if (!draggableInitialized.current) {
            let draggableEl = document.getElementById('draggable-el');
            if (draggableEl) {
                new Draggable(draggableEl, {
                    itemSelector: ".fc-event",
                    eventData: function (eventEl) {
                        let title = eventEl.getAttribute("title");
                        let id = eventEl.getAttribute("data");
                        return { title, id };
                    }
                });
                draggableInitialized.current = true; // Mark as initialized
            }
        }
    }, []);

    // Handle adding external event/recipe to the calendar 
    const handleEventReceive = async (info) => {
        try {
            const dropInfo = {
                draggedEl: info.draggedEl,
                date: info.event.start, // Convert to UTC
            };
            await addEvent(dropInfo);
            calendarRef.current.getApi().refetchEvents(); // Force calendar to refresh
        } catch (error) {
            console.error('Error during event receive:', error);
            info.revert();  //used to maintain consistency should the event add operation fail
        }
    };

    // Handle the event when the recipe is dropped onto the calendar
    const handleEventDrop = async (info) => {
        try {
            await updateEvent(info);
            forceRerender();
        } catch (error) {
            console.error('Error during event drop:', error);
            info.revert();      //used to maintain consistency should the event update operation fail. Event will default back to where it was.
        }
    };

    // Handle what happens when a recipe on the calendar is clicked
    const handleEventClick = (info) => {
        const recipe = {
            id: info.event.id,
            title: info.event.title
        };
        handleShowDelete(recipe);
    };

    // Handle removing the recipe from the meal plan
    const handleDeleteFromMealPlan = () => {
        deleteRecipeFromMealPlan(recipeToDelete, handleCloseDelete, setIsDeleting);
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSide} className={`${faunaOne.className}`}>
                <div style={styles.calendarContainer}>
                    <FullCalendar
                        ref={calendarRef}
                        headerToolbar={{
                            left: 'today prev next',
                            center: 'title',
                            right: 'dayGridMonth listMonth'
                        }}
                        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        timeZone="local"
                        events={recipeCalendar}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        eventReceive={handleEventReceive}   //handles when external recipe is added
                        eventDrop={handleEventDrop}         //handles when exisiting recipe is moved
                        eventClick={handleEventClick}       //handles removing the entry from the mealplan
                    />
                </div>
            </div>
            <div style={styles.rightSide} id="draggable-el" className='me-3'>
                <h2 className={`${montega.className} sub-head center`}>Add Your Recipes</h2>
                <div className="center mb-2 bg-white">
                    <Form className="d-flex me-2" size="sm">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Form>
                    <Tooltip title="Create New Recipe" arrow>
                        <a className={`${faunaOne.className} title center`} href="#" role="button" onClick={handleShowAddRecipe}>
                            <Button variant="outline-dark"><AddIcon className='custom-icon footer-icon-size' /></Button>
                        </a>
                    </Tooltip>
                </div>
                <div style={{ ...styles.content, display: 'block' }} className='scroll-list-box intro-paragraph center border border-secondary rounded-3'>
                    {loading ? (
                        <p>Loading recipes...</p>
                    ) : (
                        filteredRecipes.map(recipe => (
                            <div
                                className={`${faunaOne.className} fc-event center mb-2`}
                                title={recipe.recipe_title}
                                data-id={recipe.id}
                                key={recipe.id}
                                style={{ cursor: 'pointer' }}
                            >
                                {recipe.recipe_title}
                            </div>
                        ))
                    )}
                </div>
            </div>
            {/**ADD RECIPE Modal Pop UP */}
            <AddRecipePopup
                show={showAddRecipe}
                onHide={handleCloseAddRecipe}
                newRecipe={newRecipe}
                setNewRecipe={setNewRecipe}
                handleAddRecipe={handleAddRecipe}
                isAdding={isAdding}
            />
            {/**DELETE RECIPE Modal Pop UP */}
            <DeletePopup
                show={showDelete}
                onHide={handleCloseDelete}
                recipeTitle={recipeToDelete?.title}
                handleDelete={handleDeleteFromMealPlan}
                isDeleting={isDeleting}
            />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        margin: '0 20px', // Equal margin on left and right
    },
    leftSide: {
        flex: 3, // Left side takes up 3/4 of the available space
        display: 'flex',
        flexDirection: 'column', // Stack heading and calendar vertically
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'center',
        padding: '10px', // Padding inside the border
        borderRadius: '10px', // Optional: rounded corners for the border
    },
    calendarContainer: {
        flexGrow: 1, // Allow the calendar container to grow
        width: '80%', // Full width of the left side
        height: 0, // Set to 0 to allow for height based on aspect ratio
        paddingBottom: '80%', // Set padding to maintain aspect ratio (1:1)
        position: 'relative', // Positioning context for the calendar
    },
    rightSide: {
        flex: 1, // Right side takes up 1/3 of the available space
        display: 'flex',
        flexDirection: 'column', // Stack heading and content vertically
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'center',
        color: 'black', // Text color for contrast
        padding: '20px', // Optional padding for aesthetics
    },
    heading: {
        marginBottom: '20px', // Space below the heading
        textAlign: 'center', // Center the heading text
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '500px', /* Adjust the height as needed to make a scrollable list*/
        overflowY: 'auto',
    },
};

//https://github.com/NikValdez/NextJSCalendarTut/blob/main/app/page.tsx