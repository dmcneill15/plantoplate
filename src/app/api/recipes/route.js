
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/dbConnect.js'
import Recipe from '@/models/recipe'
import User from '@/models/user'

//http://localhost:3000/api/recipes gets all the recipes
export async function GET(req) {
  await connectToDatabase();

  try {
    const recipes = await Recipe.find({});
    return NextResponse.json({ result: 200, data: recipes }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ result: 500, error: err.message }, { status: 500 });
  }
}

//POST to create a recipe
export async function POST(req) {
  await connectToDatabase();

  try {
    const body = await req.json();
    console.log("New recipe body:", body);
    const { user_id, recipe_title, method, servings, image_url } = body;


    // Check if a recipe with the same title exists for this user
    const existingRecipe = await Recipe.findOne({ user_id, recipe_title });
    if (existingRecipe) {
      return NextResponse.json({ result: 409, message: 'Recipe title already exists for this user' }, { status: 409 });
    }

    // Find the user by user_id
      const user = await User.findById(user_id);
      if (user) {
        const newRecipe = new Recipe({
          recipe_title,  // Ensure this is passed
          method,
          servings,
          image_url,
          user_id: user._id,
        });

      const savedRecipe = await newRecipe.save();
      return NextResponse.json({ result: 200, data: savedRecipe }, { status: 200 });
    } else {
      return NextResponse.json({ result: 404, message: 'User not found' }, { status: 404 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ result: 500, error: err.message }, { status: 500 });
  }
}

//DELETE to delete a recipe
export async function DELETE(req) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json({ result: 400, message: 'Recipe _id is required' }, { status: 400 });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(_id);
    if (deletedRecipe) {
      return NextResponse.json({ result: 200, data: deletedRecipe }, { status: 200 });
    } else {
      return NextResponse.json({ result: 404, message: 'Recipe not found' }, { status: 404 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ result: 500, error: err.message }, { status: 500 });
  }

}

//PUT to update a recipe
export async function PUT(req) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const { _id, new_title, new_method, new_servings, new_image } = body;

    const recipe = await Recipe.findById(_id);
    if (!recipe) {
      return NextResponse.json({ result: 404, error: 'Recipe not found' }, { status: 404 });
    }

    // Create an update object dynamically based on what has changed
    const updatedRecipe = {};
    if (new_title) updatedRecipe.recipe_title = new_title;
    if (new_method) updatedRecipe.method = new_method;
    if (new_servings) updatedRecipe.servings = new_servings;
    if (new_image) updatedRecipe.image = new_image;

    const result = await Recipe.findByIdAndUpdate(_id, updatedRecipe, { new: true });
    return NextResponse.json({ result: 200, data: result }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ result: 500, error: 'Failed to update recipe' }, { status: 500 });
  }

}