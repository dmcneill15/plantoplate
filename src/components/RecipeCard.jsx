'use client' // client component, not server rendered
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { Card, Col, Row, Container, Button, Form } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
import { fetchUserRecipes } from '@/app/api/recipesApi'
import DeletePopup from './DeletePopup';
import UpdateRecipePopup from './UpdateRecipePopup';
import AddRecipePopup from './AddRecipePopup';
import RecipeDetailsPopup from './RecipeDetailsPopup';
import { useDeletePopup } from '@/hooks/useDeletePopup';    //custom hook to handle delete popup
import { useRecipeDetailsPopup } from '@/hooks/useRecipeDetailsPopup';
import { useAddRecipePopup } from '@/hooks/useAddRecipePopup'
import { useUpdateRecipePopup } from '@/hooks/useUpdateRecipePopup';
import { fontCinzel, faunaOne } from '@/lib/fonts';


export default function RecipeCard({ recipes, user }) {
    const { data: session, status } = useSession(); // Use the status of the active session to display loading wheel if still busy loading

    const [currentRecipes, setCurrentRecipes] = useState(recipes || []);    // Set initial state to recipes passed in or set to empty if no recipe data
    const [searchQuery, setSearchQuery] = useState('');                     // State for search query
    const user_id = user._id;

    // Use useEffect to fetch recipes when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                //const recipesArray = await fetchRecipes();
                const recipesArray = await fetchUserRecipes(user_id);
                const sortedRecipes = recipesArray.sort((a, b) => a.recipe_title.localeCompare(b.recipe_title)); // Sort alphabetically
                setCurrentRecipes([...sortedRecipes]);
            } catch (error) {
                console.error('Error loading recipes:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means it runs only once on mount

    /*--- DELETE recipe from the catalog --- */
    // Use the custom hook, passing the function to set the current recipes
    const {
        showDelete,         //Hook returns the state of the modal popup - visible or not
        recipeToDelete,
        recipeTitle,        //Hook returns the title of the recipe to delete
        isDeleting,         //Hook returns the state of the deleting function
        handleShowDelete,   //Hook returns the function to trigger displaying the modal
        handleCloseDelete,  //Hook returns the function to handle closing the modal
        handleDelete,       //Hook returns the function to handle the api calls to delete the recipe 
    } = useDeletePopup(setCurrentRecipes, user_id);  // Pass fetchRecipes to the hook
    /*--------------------------------*/

    /*---ADD a recipe to the catalog---*/
    const {
        newRecipe,
        setNewRecipe,
        showAddRecipe,
        isAdding,
        errorMessage,
        handleCloseAddRecipe,
        handleShowAddRecipe,
        handleAddRecipe,
    } = useAddRecipePopup(setCurrentRecipes, user_id);
    /*--------------------------------*/

    /*---UPDATE a recipe in the catalog---*/
    const {
        recipeToUpdate,
        showUpdateRecipe,
        updatedRecipe,
        isUpdating,
        handleCloseUpdateRecipe,
        handleShowUpdateRecipe,
        handleUpdateRecipe,
        setUpdatedRecipe,
    } = useUpdateRecipePopup(setCurrentRecipes, user_id);
    /*--------------------------------*/


    /*--- SHOW the recipe details---*/
    const [showRecipeDetails, setShowRecipeDetails] = useState(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);

    const selectedRecipe = currentRecipes.find(r => r.recipe_id == selectedRecipeId);
    
    const handleShowRecipeDetails = (recipe) => {
        setSelectedRecipeId(recipe.recipe_id);
        setShowRecipeDetails(true);
      };
      
      const handleCloseRecipeDetails = () => {
        setShowRecipeDetails(false);
        setSelectedRecipeId(null);
      };

    //ensures modal closes if the recipe is deleted
      useEffect(() => {
        if (selectedRecipeId && !currentRecipes.some(r => r.recipe_id === selectedRecipeId)) {
          handleCloseRecipeDetails();
        }
      }, [currentRecipes, selectedRecipeId]);
    /*--------------------------------*/

    // Filter recipes based on search query 
    const filteredRecipes = currentRecipes.filter(recipe =>
        recipe.recipe_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (status === 'loading') {
        return (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        );
      }

    return (
        <>
            {currentRecipes.length === 0 ? (
                <Container className='justify-content-center align-items-center'>
                    <Row xs={1} sm={1} md={1} className="g-4 justify-content-center">
                        <Col className="center g-4 justify-content-center">
                            <p>No recipes added yet</p>
                        </Col>
                    </Row>
                    <div className="center">
                        <Button className={`${faunaOne.className} center button-link`} variant="dark" onClick={handleShowAddRecipe}> + Add Recipe </Button>
                    </div>
                </Container>
            ) : (
                <div className="center mb-3">
                    <Form className="d-flex me-2" size="sm">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 no-outline"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Form>
                    <Button className={`${faunaOne.className} center button-link`} variant="dark" onClick={handleShowAddRecipe}> + Add Recipe </Button>
                </div>
            )}
            <Container className='justify-content-center align-items-center'>
                <Row xs={1} sm={2} md={5} className="justify-content-center">
                    {filteredRecipes.map(recipe => (
                        <Col key={recipe.recipe_id} className="g-3 justify-content-center">
                            <Card className=' border-2 text-center'>
                                <Card.Img
                                    className="mx-auto pt-2 card-image-size"
                                    src={recipe.image ? recipe.image : '/cloche1.jpg'}
                                    alt={`${recipe.recipe_title} image`}
                                    onClick={() => handleShowRecipeDetails(recipe)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <Card.Body>
                                    <Card.Title className={`${fontCinzel.className} title center fs-5`}
                                        onClick={() => handleShowRecipeDetails(recipe)}
                                        style={{ cursor: 'pointer' }}
                                    >{recipe.recipe_title
                                        }</Card.Title>
                                    <Tooltip title="Add to Meal Plan" arrow>
                                        <a className="btn btn-link btn-floating btn-outline-dark btn-lg text-dark icon-button" href="#!" role="button">
                                            <PlaylistAddIcon className='custom-icon' /></a>
                                    </Tooltip>
                                    <Tooltip title="Edit Recipe" arrow>
                                        <a className="btn btn-link btn-floating btn-outline-dark btn-lg text-dark icon-button" href="#!" role="button"
                                            onClick={() => handleShowUpdateRecipe(recipe)}>
                                            <EditNoteIcon className='custom-icon' /></a>
                                    </Tooltip>
                                    <Tooltip title="Delete Recipe" arrow>
                                        <a className="btn btn-link btn-floating btn-outline-dark btn-lg text-dark icon-button" href="#!" role="button"
                                            onClick={() => handleShowDelete(recipe)}>
                                            <DeleteForeverIcon className='custom-icon' /></a>
                                    </Tooltip>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container >

            {/*DELET: Modal Pop Up */}
            <DeletePopup
                show={showDelete}
                onHide={handleCloseDelete}
                recipeTitle={recipeToDelete?.recipe_title}
                handleDelete={handleDelete}
                isDeleting={isDeleting}
            />

            {/**ADD RECIPE Modal Pop UP */}
            <AddRecipePopup
                show={showAddRecipe}
                onHide={handleCloseAddRecipe}
                newRecipe={newRecipe}
                setNewRecipe={setNewRecipe}
                handleAddRecipe={handleAddRecipe}
                isAdding={isAdding}
                errorMessage={errorMessage}
            />

            {/**UPDATE RECIPE Modal Pop UP */}
            <UpdateRecipePopup
                show={showUpdateRecipe}
                onHide={handleCloseUpdateRecipe}
                handleUpdateRecipe={handleUpdateRecipe}
                updatedRecipe={updatedRecipe}
                setUpdatedRecipe={setUpdatedRecipe}
                isUpdating={isUpdating}
            />

            {/**SHOW RECIPE Modal Pop UP */}
            <RecipeDetailsPopup
                show={showRecipeDetails}
                onHide={handleCloseRecipeDetails}
                recipe={selectedRecipe}
                onEdit={() => handleShowUpdateRecipe(selectedRecipe)}
                onDelete={() => handleShowDelete(selectedRecipe)}
            />

        </>
    )
} 