'use client' // client component, not server rendered
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addUser } from '@/app/api/userApi'
import { faunaOne } from '@/lib/fonts';

function RegisterForm() {

    const [formData, setFormData] = useState({ username: '', email: '', password: '' });     // Set default form inputs to empty
    const [message, setMessage] = useState(null);       // Message to display success or failed registration
    const [variant, setVariant] = useState('');         // 'success' or 'danger'
    const router = useRouter();                         // Router to redirect to login page on successful registration

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await addUser(formData);
            console.log(result);
            if (result.result === 200) {
                setMessage('Success! Redirecting to login page...');
                setVariant('success');
                setTimeout(() => {
                    router.push('/login');
                }, 3000);               // Redirect to login page after 3 seconds
            } else if (result.result === 409) {     
                setMessage('User already exists! Please try a different email address');
                setVariant('danger');
            } else {
                setMessage('Error: ' + result.error);
                setVariant('danger');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
            setVariant('danger');
        }
    };

    return (
        <Container className="mt-4">
            <Card className='transparent-bg' style={{ width: '400px', margin: 'auto', border: "none", background: 'transparent' }}>
                <Form onSubmit={handleSubmit}>
                    {message && <Alert variant={variant}>{message}</Alert>}
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label className={`${faunaOne.className} intro-paragraph`}>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={`${faunaOne.className} intro-paragraph`}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className={`${faunaOne.className} intro-paragraph`}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    </Form.Group>


                    <Button className={`${faunaOne.className} center button-link`} variant="dark" type='submit'>Register!</Button>
                </Form>
            </Card>
        </Container>
    )
}

export default RegisterForm