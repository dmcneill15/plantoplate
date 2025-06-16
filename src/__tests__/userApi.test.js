import { addUser } from '../app/api/userApi';

/*Unit test for addUser functionality - mock responses from the API endpoint*/
describe('addUser', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should add a new user and return the user data', async () => {
        const newUser = {
            username: 'newuser',
            email: 'new@example.com',
            password: 'password123',
        };

        const mockResponse = {
            result: 200,
            data: {
                username: 'newuser',
                email_id: 'new@example.com',
                password: 'password123',
            },
        };

        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });  //simulates return of 200 success

        const response = await addUser(newUser);

        expect(response).toEqual(mockResponse);
        expect(fetch).toHaveBeenCalledWith('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
    });

    //If API endpoint returns 409 - user already exisits
    it('should handle a failed user addition', async () => {
        const newUser = {
            username: 'newuser',
            email: 'new@example.com',
            password: 'password123',
        };

        const mockErrorResponse = {
            result: 409,
            message: 'User already exists',
        };

        fetch.mockResponseOnce(JSON.stringify(mockErrorResponse), { status: 409 }); //simulates return of 409 fail

        const response = await addUser(newUser);

        expect(response).toEqual(mockErrorResponse);
        expect(fetch).toHaveBeenCalledWith('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
    });

    //If other error is returned
    it('should handle a network error', async () => {
        const newUser = {
            username: 'newuser',
            email: 'new@example.com',
            password: 'password123',
        };

        fetch.mockReject(new Error('Network error'));

        await expect(addUser(newUser)).rejects.toThrow('Network error');
        expect(fetch).toHaveBeenCalledWith('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
    });
});

