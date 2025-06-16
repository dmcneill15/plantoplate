//https://jestjs.io/docs/mock-functions
//https://www.nico.fyi/blog/how-to-unit-test-nextjs-api-route
//https://nextjs.org/docs/app/building-your-application/testing

import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/user/route';
import User from '@/models/user';
import { NextResponse } from 'next/server';

jest.mock('@/lib/dbConnect', () => jest.fn().mockResolvedValue(true)); // Mock DB connection

// Mock User model as a class
// Need to treat User as a constructor in the test environment to avoid throwing errors
jest.mock('@/models/user', () => {
    return jest.fn().mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({
            username: 'newuser',
            email_id: 'new@example.com',
            password: 'password123',
        }),
    }));
});

// Mock static method findOne on User
User.findOne = jest.fn();

// Mock NextResponse - API end point return type needs to be mocked correctly
// Jest mocks the NextResponse class here without accessing the actual NextResponse in Nextjs
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn().mockReturnValue({   //mocks the json method of a nextResponse - jest.fn() is a mock function created by Jest
            status: 200,
            json: jest.fn().mockReturnValue({   //the object returned mocks the NextReponse fromthe API
                result: 200,
                data: {
                    username: 'newuser',
                    email_id: 'new@example.com',
                    password: 'password123',
                },
            }),
        }),
    },
}));

describe('POST /api/user', () => {
    it('should create a new user and return 200', async () => {
        
        const { req, res } = createMocks({
            method: 'POST',
        });

        // Mock request body to simulate req.json() output
        req.json = jest.fn().mockResolvedValue({
            username: 'newuser',
            email: 'new@example.com',
            password: 'password123',
        });

        // Mock database operations
        User.findOne.mockResolvedValue(null); // No existing user

        const response = await POST(req, res);

        // Check response status and data
        expect(response.status).toBe(200);
        expect(response.json()).toEqual({
            result: 200,
            data: {
                username: 'newuser',
                email_id: 'new@example.com',
                password: 'password123',
            },
        });
    });
});


