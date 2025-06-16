import LoginForm from '@/components/LoginForm';
import Link from 'next/link';
import { montega, faunaOne } from '@/lib/fonts';

export default async function Recipes() {
    return (
        <main>
            <section>
                <div className="title-container mb-4">
                    <h2 className={`${montega.className} sub-head center`}>Login to get Planning</h2>
                </div>
            </section>
            <LoginForm />
            <p className={`${faunaOne.className} text-center mt-3`} >Don't have an account?
                <Link href="/register" passHref style={{ textDecoration: 'none' }}> Sign Up </Link>
            </p>
        </main>
    )
}