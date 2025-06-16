import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next";
import ProfileCard from '@/components/ProfileCard';

export default async function Profile() {
    const session = await getServerSession(options);

    return (
        <main>
            <section>
                {session ? (
                    <ProfileCard user={session?.user} />
                ) : (
                    <p>Please Login to access this page</p>
                )}
            </section>
        </main>
    )
}