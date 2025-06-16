import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { updateUser } from '@/app/api/userApi';

const UpdateUserPopup = ({ show, onHide, onUpdate }) => {
    const { data: session } = useSession();
    const user = session?.user; // Get the current user from the session

    // Local state for the updated user
    const [updatedUser, setUpdatedUser] = useState({
        username: user?.username || '',
        email_id: user?.email_id || '',
        password: '' // Optional password field
    });

    const [isUpdating, setIsUpdating] = useState(false);

    // Update local state when user changes
    useEffect(() => {
        if (user) {
            setUpdatedUser({
                username: user.username,
                email_id: user.email_id,
                password: '' // Reset password field
            });
        }
    }, [user]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        // Prepare data for the API call
        const userData = {
            username: updatedUser.username,
            email_id: updatedUser.email_id,
            password: updatedUser.password,
            _id: user._id, // Include user ID if necessary
        };

        try {
            const result = await updateUser(userData); // Call the updateUser function

            if (result) {
                //console.log('User updated successfully:', result);
                onUpdate(result.data); // Pass updated user data to parent
                onHide(); // Close the modal
            }
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdateUser}>
                    <Form.Group controlId="formUpdateUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            value={updatedUser.username}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group controlId="formUpdateEmail" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={updatedUser.email_id}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, email_id: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formUpdatePassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password "
                            value={updatedUser.password}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
                        />
                    </Form.Group>
                    <Button className={`button-link mt-3`} variant="outline-dark" type="submit" disabled={isUpdating}>
                        {isUpdating ? 'Updating...' : 'Update User'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateUserPopup;
