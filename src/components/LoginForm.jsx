'use client' // client component, not server rendered
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';
import { faunaOne } from '@/lib/fonts';
import {  useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginForm() {

    const [formData, setFormData] = useState({ email: '', password: '' }); // Use a plain object for form data
    const [message, setMessage] = useState(null); // Message to display success or failed login
    const [variant, setVariant] = useState(''); // 'success' or 'danger'
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const router = useRouter(); // Router to redirect to home page on successful login

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value })); // Update form data state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        try {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });
            if (result.ok) {
                setMessage('Success! Redirecting to profile page...');
                setVariant('success');
                setTimeout(() => {
                    router.push('/profile');
                }, 1000); // Redirect to profile page after 1 second
            } else {
                setMessage('Error: ' + result.error);
                setVariant('danger');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
            setVariant('danger');
        } finally{
            setIsLoggingIn(false);
        }
    };

    return (
        <Container className="mt-4">
            <Card className='transparent-bg' style={{ width: '400px', margin: 'auto', border: "none", background: 'transparent' }}>
                <Form onSubmit={handleSubmit}>
                    {message && <Alert variant={variant}>{message}</Alert>}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={`${faunaOne.className} intro-paragraph`}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className={`${faunaOne.className} intro-paragraph`}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    </Form.Group>
                    <Button className={`button-link mt-3`} variant="dark" type="submit" disabled={isLoggingIn}>
                        {isLoggingIn ? 'Logging In...' : 'Login'}
                    </Button>

                </Form>
            </Card>
        </Container>
    )
}

export default LoginForm