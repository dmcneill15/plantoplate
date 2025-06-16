import { Modal, Button, Form } from 'react-bootstrap';

const AddRecipePopup = ({ show, onHide, handleAddRecipe, newRecipe, setNewRecipe, isAdding, errorMessage }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add a New Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAddRecipe}>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
                    <Form.Group controlId="formRecipeTitle">
                        <Form.Label>Recipe Title*</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title (required)"
                            value={newRecipe.recipe_title}
                            onChange={(e) => setNewRecipe({ ...newRecipe, recipe_title: e.target.value })}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group controlId="formRecipeMethod" className="mt-3">
                        <Form.Label>Method</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3} // Set the number of visible rows
                            placeholder="Method (optional)"
                            value={newRecipe.method}
                            onChange={(e) => setNewRecipe({ ...newRecipe, method: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formRecipeServings" className="mt-3">
                        <Form.Label>Servings</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Servings (optional)"
                            value={newRecipe.servings}
                            onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })}
                        />
                    </Form.Group>
                    {/*} <Form.Group controlId="formRecipeImage" className="mt-3">
            <Form.Label>Recipe Image URL</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={newRecipe.image}
                onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
            />
        </Form.Group>*/}
                    <Button className={`button-link mt-3`} variant="outline-dark" type="submit" disabled={isAdding}>
                        {isAdding ? 'Adding...' : 'Add Recipe'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddRecipePopup;