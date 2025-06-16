import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

const RecipeDetailsPopup = ({ show, onHide, recipe,onEdit, onDelete }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{recipe?.recipe_title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image
          className="img-fluid mb-3"
          src={recipe?.image ? recipe.image : "/images/plate.png"}
          alt={recipe?.recipe_title}
        />
        <p><strong>Method:</strong> {recipe?.method || 'No method available'}</p>
        <p><strong>Servings:</strong> {recipe?.servings || 'N/A'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="outline-dark" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="outline-dark" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeDetailsPopup;
