import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/dbConnect.js'
import User from '@/models/user'

//POST to register/add a user
export async function POST(req) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const { username, email, password } = body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email_id: email });
        if (existingUser) {
            return NextResponse.json({ result: 409, message: 'User already exists' }, { status: 409 });
        }

        // Create a new user
        const newUser = new User({
            username,
            email_id: email,
            password,
        });
        console.log(`New user created: ${newUser}`);

        const savedUser = await newUser.save();
        return NextResponse.json({ result: 200, data: savedUser }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ result: 500, error: err.message }, { status: 500 });
    }
}

// PUT to update a user
export async function PUT(req) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const { _id, username, email_id, password } = body;

        // Find the user by user_id
        const user = await User.findById(_id);
        if (!user) {
            return NextResponse.json({ result: 404, message: 'User not found' }, { status: 404 });
        }

        // Update user fields
        user.username = username || user.username; // Only update if a new value is provided
        user.email_id = email_id || user.email_id;
        user.password = password || user.password; // In a real application, you'd hash this

        // Save the updated user
        const updatedUser = await user.save();
        return NextResponse.json({ result: 200, data: updatedUser }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ result: 500, error: err.message }, { status: 500 });
    }
}