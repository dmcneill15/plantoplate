import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/dbConnect';
import MealPlan from '@/models/mealPlan';

///api/mealplan/[user_id]/route.js
export async function GET(req, { params }) {
    await connectToDatabase();

    try {
        const { user_id } = params;
        const mealplan = await MealPlan.find({ user_id }).populate('recipe_id');
        return NextResponse.json({ result: 200, data: mealplan }, { status: 200 });
    } catch (err) {
        console.error('Error fetching meal plan:', err);
        return NextResponse.json({ result: 500, error: 'Failed to fetch meal plan' }, { status: 500 });
    }
}