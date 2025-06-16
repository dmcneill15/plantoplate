import { Modal, Button } from 'react-bootstrap';

const DeletePopup = ({ show, onHide, recipeTitle, handleDelete, isDeleting }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {recipeTitle}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button className={`button-link`} variant="danger" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeletePopup;