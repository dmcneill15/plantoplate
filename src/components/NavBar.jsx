'use client' // client component, not server rendered
import { useState } from 'react';
import { usePathname } from 'next/navigation'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { fontCinzel, faunaOne } from '@/lib/fonts';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function NavBar() {
    const pathname = usePathname(); // Hook to check current active path
    const router = useRouter();     // Use to redirect pages
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { data: session } = useSession(); // Check if there is an active session to conditionally display the logout icon

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await signOut({ redirect: false });
            router.push('/'); // Redirect to home page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setIsLoggingOut(false); // Reset state to false after logout
        }
    };

    return (
        <div className={`mb-4 `}>
            <header>
                <h1 className={`${fontCinzel.className} title center pt-4`}>Plan to Plate</h1>
                <h5 className={`${faunaOne.className} slogan center`}>meal planning made simple.</h5>
            </header>

            <br></br>
            <Navbar collapseOnSelect className="mb-0">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className={`${faunaOne.className} me-auto`}>
                            <Nav.Link href="/" className={`${faunaOne.className} nav-link me-2 ${pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
                            <Nav.Link href="/mealplan" className={`${faunaOne.className} nav-link me-2 ${pathname === '/mealplan' ? 'active' : ''}`}>Meal Plan</Nav.Link>
                            <Nav.Link href="/recipes" className={`${faunaOne.className} nav-link ${pathname === '/recipes' ? 'active' : ''}`}>Recipes</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/profile" className={`${faunaOne.className} nav-link ${pathname === '/profile' ? 'active' : ''}`}>Profile</Nav.Link>
                            {session && (
                                <Tooltip title="Logout" arrow>
                                    <Nav.Link
                                        className={`btn btn-link btn-floating btn-outline-dark btn-lg text-dark icon-button ${isLoggingOut ? 'disabled' : ''}`}
                                        onClick={handleLogout}
                                    >
                                        <LogoutIcon className="custom-icon" />
                                    </Nav.Link>
                                </Tooltip>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default NavBar
