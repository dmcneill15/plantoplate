import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/dbConnect';
import Recipe from '@/models/recipe';

//http://localhost:3000/api/recipes/[user_id] gets all the users recipes
export async function GET(req, { params }) {
    await connectToDatabase();

    try {
        const { user_id } = params;
        const recipes = await Recipe.find({ user_id });
        return NextResponse.json({ result: 200, data: recipes }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ result: 500, error: err.message }, { status: 500 });
    }
}