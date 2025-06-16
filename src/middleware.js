/*export {default} from "next-auth/middleware"

export const config = { matcher: ["/profile"]}*/

// middleware.js or middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages: {
        signIn: '/login', // Redirect to custom login page
    },
});

export const config = { matcher: ['/profile', '/mealplan', '/recipes'] };
