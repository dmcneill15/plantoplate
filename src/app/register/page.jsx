import RegisterForm from '@/components/RegisterForm';
import Link from 'next/link';
import { faunaOne, montega } from '@/lib/fonts';

export default async function Recipes() {
    return (
        <main>
            <section>
                <div className="title-container mb-4">
                    <h2 className={`${montega.className} sub-head center`}>Register to get Planning</h2>
                </div>
            </section>
            <RegisterForm />
            <p className={`${faunaOne.className} text-center mt-3`} >Already have an account?
                <Link href="/login" passHref style={{ textDecoration: 'none' }}> Login </Link>
            </p>
        </main>
    )
}