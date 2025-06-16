import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next";
import Calendar from '@/components/Calendar/Calendar';
import { faunaOne, montega } from '@/lib/fonts';
import connectToDatabase from '@/lib/dbConnect';

export default async function MealPlan() {
    await connectToDatabase();
    
    const session = await getServerSession(options);
    // Log the session object to the console
    console.log("Session:", session);

    return (
        <main>
            <section>
                <div className="title-container mb-4">
                    <h2 className={`${montega.className} sub-head center`}>Your Meal Plan</h2>
                </div>
                <div>
                    <p className={`${faunaOne.className} mb-1 center intro-paragraph`}>➕ Add: Drag from the recipe list</p>
                    <p className={`${faunaOne.className} mb-3 center intro-paragraph`}>🚫 Remove: Click a meal to clear it</p>
                </div>
            </section><br></br>
            <section>
                {session ? (
                    <Calendar user={session?.user}/>
                ) : (
                    <p>Please Login to access this page</p>
                )}
            </section>
        </main>
    )
}