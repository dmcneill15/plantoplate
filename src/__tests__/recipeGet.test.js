import { createMocks } from 'node-mocks-http';
import { GET, POST, DELETE, PUT } from '@/app/api/recipes/route';
import Recipe from '@/models/recipe';
import { NextResponse } from 'next/server';

jest.mock('@/lib/dbConnect', () => jest.fn().mockResolvedValue(true)); // Mock DB connection

// Mock Recipe model
jest.mock('@/models/Recipe', () => ({
    find: jest.fn(),
}));

// Mock NextResponse
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn().mockImplementation((body, init) => ({
            status: init.status,
            body,
        })),
    },
}));

describe('GET /api/recipes', () => {
    it('should return status 200 and a list of recipes', async () => {
        const mockRecipes = [
            { _id: '1', recipe_title: 'Apple Pie', method: 'Bake', servings: '4', image: 'image.jpg', user_id: 'user1' },
            { _id: '2', recipe_title: 'Spaghetti', method: 'Boil', servings: '3', image: 'image2.jpg', user_id: 'user2' },
        ];

        Recipe.find.mockResolvedValue(mockRecipes);

        const { req, res } = createMocks({ method: 'GET' });

        const response = await GET(req, res);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ result: 200, data: mockRecipes });
    });

    it('should return status 500 if there is a server error', async () => {
        Recipe.find.mockRejectedValue(new Error('Server error'));

        const { req, res } = createMocks({ method: 'GET' });

        const response = await GET(req, res);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ result: 500, error: 'Server error' });
    });
});

