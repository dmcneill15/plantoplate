'use client';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { Card, Container, ListGroup, Button, Spinner } from 'react-bootstrap';
import { fontCinzel, faunaOne, montega } from '@/lib/fonts';
import UpdateUserPopup from './UpdateUserPopup'; // Adjust the path as needed

function ProfileCard() {
    const { data: session, status } = useSession(); // Check if there is an active session
    const [userData, setUserData] = useState(null); // Local state to manage user data

    // Effect to set userData when session is loaded
    useEffect(() => {
        if (session) {
            setUserData(session.user); // Set userData when session is available
        }
    }, [session]); // Depend on session to update when it changes

    // State for the update user popup visibility
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);

    // Show spinner while loading
    if (status === 'loading') {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    // Handle case where user is not available
    if (!userData) { // Change this to check userData instead of user
        return <p>No user information available. Please log in.</p>;
    }

    // Action handler to show the update user popup
    const handleAction = () => {
        setShowUpdatePopup(true); // Show the popup
    };

    // Callback to refresh the user data after updating user info
    const refreshUserData = (updatedUser) => {
        setUserData(updatedUser); // Update the local user data state
    };

    return (
        <Container>
            <h2 className={`${montega.className} title center sub-head`}>Hello, {userData.username}!</h2>
            <Card className="text-center mt-4" style={{ maxWidth: '500px', margin: 'auto' }}>
                <Card.Header className={`${fontCinzel.className} slogan center`}>Settings</Card.Header>
                <Card.Body>
                    <ListGroup>
                        <ListGroup.Item className={`${faunaOne.className} d-flex justify-content-between align-items-center`}>
                            Username: {userData.username}
                        </ListGroup.Item>
                        <ListGroup.Item className={`${faunaOne.className} d-flex justify-content-between align-items-center`}>
                            Email: {userData.email_id}
                        </ListGroup.Item>
                        <ListGroup.Item className={`${faunaOne.className} d-flex justify-content-between align-items-center`}>
                            Password: {'*'.repeat(userData?.password?.length || 0)}
                        </ListGroup.Item>
                    </ListGroup>
                    <Button className={`${faunaOne.className} center button-link mt-3`} variant="dark" onClick={handleAction}>
                        Update Details
                    </Button>
                </Card.Body>
            </Card>

            {/* Render the UpdateUserPopup */}
            <UpdateUserPopup
                show={showUpdatePopup}
                onHide={() => setShowUpdatePopup(false)} // Close the popup
                onUpdate={refreshUserData} // Callback to refresh user data
            />
        </Container>
    );
}

export default ProfileCard;
