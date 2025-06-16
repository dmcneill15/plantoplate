import { fetchRecipes, addRecipe, deleteRecipe, updateRecipe } from '../app/api/recipesApi';

const baseURL = '/api/recipes';

/*Unit test for fetchRecipes functionality - mock responses from the API endpoint*/
describe('fetchRecipes', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should fetch the recipes and return the recipes array', async () => {
        const mockRecipes = [
            {
                recipe_title: "Apple Pie",
                method: "Served warm",
                servings: "2",
                image: "#",
                user_id: "66f739adc717200fa34ac24c"
            },
            {
                recipe_title: "Spaghetti bolognese",
                method: "With beef or prok mince",
                servings: "4",
                image: "#",
                user_id: "66f739adc717200fa34ac24c"
            }
        ]

        const mockResponse = {
            result: 200,
            data: mockRecipes,
        };

        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });  //simulates return of 200 success

        const response = await fetchRecipes();

        expect(response).toEqual(mockRecipes);
        expect(fetch).toHaveBeenCalledWith(`/api/recipes`, { cache: 'no-cache' });
    });

    it('should throw an error if the fetch fails', async () => {

        fetch.mockRejectOnce(new Error('Failed to fetch recipes')); //simulates return of 409 fail

        await expect(fetchRecipes()).rejects.toThrow('Failed to fetch recipes');
        expect(fetch).toHaveBeenCalledWith(baseURL, { cache: 'no-cache' });
    });
});

/*Unit test for addRecipe functionality - mock responses from the API endpoint*/
describe('addRecipe', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should add a recipe and return the response', async () => {
        const mockRecipe = [
            {
                recipe_title: "Apple Pie",
                method: "Served warm",
                servings: "2",
                image: "#"
            },
        ];
        const user_id = 'test_user_id';

        const mockResponse = { success: true, datat: { ...mockRecipe, id: '12345', user_id } };

        fetch.mockResponse(JSON.stringify(mockResponse), { status: 200 });
        const result = await addRecipe(mockRecipe, user_id);
        expect(result).toEqual(mockResponse);
        expect(fetch).toHaveBeenCalledWith(baseURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...mockRecipe, user_id })
        })
    })

    it('should handle a failed recipe add', async () => {
        const newRecipe = {
            recipe_title: 'Test Recipe',
            method: 'Test Method',
            servings: 2,
            image: 'test_image.jpg'
        };
        const user_id = 'test_user_id';

        fetch.mockResponseOnce(JSON.stringify({ success: false }), { status: 400 });

        const result = await addRecipe(newRecipe, user_id);
        expect(result).toEqual({ success: false });
    });

    it('should throw an error if the fetch request fails', async () => {
        const newRecipe = {
            recipe_title: 'Test Recipe',
            method: 'Test Method',
            servings: 2,
            image: 'test_image.jpg'
        };
        const user_id = 'test_user_id';

        fetch.mockRejectOnce(new Error('Network Error'));

        await expect(addRecipe(newRecipe, user_id)).rejects.toThrow('Network Error');
    });
})

/*Unit test for deleteRecipe functionality - mock responses from the API endpoint*/
describe('deleteRecipe', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should delete a recipe and return the success', async () => {
        const recipeId = '12345';

        fetch.mockResponseOnce(JSON.stringify({ success: true }), { status: 200 });

        const result = await deleteRecipe(recipeId);
        expect(result).toEqual({ success: true });
        expect(fetch).toHaveBeenCalledWith(baseURL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: recipeId }),
        });
    })

    it('should handle a failed recipe detele', async () => {
        const recipeId = '12345';

        fetch.mockResponseOnce(JSON.stringify({ success: false }), { status: 400 });

        const result = await deleteRecipe(recipeId);
        expect(result).toEqual({ success: false });
        expect(fetch).toHaveBeenCalledWith(baseURL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: recipeId }),
        });
    })

    it('should throw an error if the delete request fails', async () => {
        const recipeId = '12345';

        fetch.mockRejectOnce(new Error('Network Error'));

        const result = await deleteRecipe(recipeId);
        expect(result).toEqual({ success: false, error: new Error('Network Error') });
    });
})

/*Unit test for updateRecipe functionality - mock responses from the API endpoint*/
describe('updateRecipe', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should update a recipe and return the response', async () => {
        const recipeToUpdateId = '12345';
        const recipeUpdates = {
          recipe_title: 'Updated Title',
          method: 'Updated Method',
          servings: 4,
          image: '#'
        };
    
        const mockResponse = {
          _id: recipeToUpdateId,
          ...recipeUpdates
        };
    
        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });
    
        const result = await updateRecipe(recipeToUpdateId, recipeUpdates);
        expect(result).toEqual(mockResponse);
        expect(fetch).toHaveBeenCalledWith(baseURL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _id: recipeToUpdateId,
            ...recipeUpdates
          })
        });
      });
    
      it('should handle a failed recipe update', async () => {
        const recipeToUpdateId = '12345';
        const recipeUpdates = {
            recipe_title: 'Updated Title',
            method: 'Updated Method',
            servings: 4,
            image: '#'
          };
    
        fetch.mockResponseOnce(JSON.stringify({ error: 'Failed to update recipe' }), { status: 400 });
    
        await expect(updateRecipe(recipeToUpdateId, recipeUpdates)).rejects.toThrow('Failed to update recipe');
        expect(fetch).toHaveBeenCalledWith(baseURL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _id: recipeToUpdateId,
            ...recipeUpdates
          })
        });
      });
    
      it('should throw an error when the fetch request fails', async () => {
        const recipeToUpdateId = '12345';
        const recipeUpdates = {
          recipe_title: 'Updated Recipe Title',
          method: 'Updated Method',
          servings: 4,
          image: 'updated_image.jpg'
        };
    
        fetch.mockRejectOnce(new Error('Network Error'));
    
        await expect(updateRecipe(recipeToUpdateId, recipeUpdates)).rejects.toThrow('Network Error');
    });    
})