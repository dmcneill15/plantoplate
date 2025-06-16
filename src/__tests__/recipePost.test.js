import { createMocks } from 'node-mocks-http';
import { GET, POST, DELETE, PUT } from '@/app/api/recipes/route';
import Recipe from '@/models/recipe';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/dbConnect'; // Assume this is where your db connection is defined
import User from '@/models/user'; // Adjust according to your models path

jest.mock('@/lib/dbConnect'); // Mock the database connection
jest.mock('@/models/user'); // Mock the User model
jest.mock('@/models/recipe'); // Mock the Recipe model
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

describe('POST create recipe', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('should create a new recipe and return 200', async () => {
        const mockUser = { _id: 'user123' };
        const mockRecipe = { _id: 'recipe123', name: 'New Recipe', ingredients: [] };

        User.findById.mockResolvedValue(mockUser); // Mock finding the user
        Recipe.prototype.save.mockResolvedValue(mockRecipe); // Mock saving the recipe

        const mockRequest = {
            json: jest.fn().mockResolvedValue({
                user_id: 'user123',
                name: 'New Recipe',
                ingredients: []
            })
        };

        // Call the POST function
        await POST(mockRequest);

        // Assertions
        expect(User.findById).toHaveBeenCalledWith('user123');  // Check user lookup
        expect(Recipe.prototype.save).toHaveBeenCalled();  // Check recipe save

        // Check if NextResponse.json is called with the correct arguments
        expect(NextResponse.json).toHaveBeenCalledWith(
            { result: 200, data: mockRecipe },
            { status: 200 }
        );
    });

    it('should return 404 if user is not found', async () => {
        // Mock user not found
        User.findById.mockResolvedValue(null); 
    
        const mockRequest = {
          json: jest.fn().mockResolvedValue({
            user_id: 'nonExistentUser',
            name: 'New Recipe',
            ingredients: []
          })
        };
    
        await POST(mockRequest);
    
        // Verify if the user lookup was attempted
        expect(User.findById).toHaveBeenCalledWith('nonExistentUser');
        
        // Verify the NextResponse is called with 404 status and appropriate message
        expect(NextResponse.json).toHaveBeenCalledWith(
          { result: 404, message: 'User not found' }, 
          { status: 404 }
        );
      });
    
      it('should handle server errors and return 500', async () => {
        const errorMessage = 'Server error';
        
        // Mock an error during user lookup
        User.findById.mockRejectedValue(new Error(errorMessage));
    
        const mockRequest = {
          json: jest.fn().mockResolvedValue({
            user_id: 'user123',
            name: 'New Recipe',
            ingredients: []
          })
        };
    
        await POST(mockRequest);
    
        // Verify that the function throws a server error with 500 status
        expect(NextResponse.json).toHaveBeenCalledWith(
          { result: 500, error: errorMessage }, 
          { status: 500 }
        );
      });
});