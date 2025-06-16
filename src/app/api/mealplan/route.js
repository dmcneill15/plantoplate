import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/dbConnect.js'
import MealPlan from '@/models/mealPlan';

export async function GET(req, { params }) {
    await connectToDatabase();

    try {
        const { user_id } = params;
        const mealPlan = await MealPlan.find({ user_id }).populate('recipe_id');
        return NextResponse.json({ result: 200, data: mealPlan }, { status: 200 });
    } catch (err) {
        console.error('Error fetching meal plan:', err);
        return NextResponse.json({ result: 500, error: 'Failed to fetch meal plan' }, { status: 500 });
    }
}

//POST to create a mealplan
export async function POST(req) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const { user_id, recipe_id, date, title } = body;

        const newMealPlan = new MealPlan({
            user_id,
            recipe_id,
            date,
            title
        });

        const savedMealPlan = await newMealPlan.save();
        return NextResponse.json({ result: 200, data: savedMealPlan }, { status: 200 });
    } catch (err) {
        console.error('Error saving to meal plan:', err);
        return NextResponse.json({ result: 500, error: 'Failed to add recipe to meal plan' }, { status: 500 });
    }
}


export async function PUT(req) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const { _id, date } = body;

        const updatedMealPlan = await MealPlan.findByIdAndUpdate(
            _id,
            { date: date },
            { new: true }
        );

        if (!updatedMealPlan) {
            return NextResponse.json({ result: 404, message: 'Meal plan entry not found' }, { status: 404 });
        }

        return NextResponse.json({ result: 200, data: updatedMealPlan }, { status: 200 });
    } catch (err) {
        console.error('Error updating meal plan:', err);
        return NextResponse.json({ result: 500, error: 'Failed to update meal plan' }, { status: 500 });
    }
}

export async function DELETE(req) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const { _id } = body;

        if (!_id) {
            return NextResponse.json({ result: 400, message: 'Meal Plan _id is required' }, { status: 400 });
        }

        const deletedMealPlan = await MealPlan.findByIdAndDelete(_id);
        if (deletedMealPlan) {
            return NextResponse.json({ result: 200, data: deletedMealPlan }, { status: 200 });
        } else {
            return NextResponse.json({ result: 404, message: 'Meal Plan entry not found' }, { status: 404 });
        }
    } catch (err) {
        console.error('Error deleting meal plan entry:', err);
        return NextResponse.json({ result: 500, error: err.message }, { status: 500 });
    }
}