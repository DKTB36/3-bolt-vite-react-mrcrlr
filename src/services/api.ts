import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://your-api-base-url.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Preferences & Meal Planning
export const submitPreferences = async (preferences: any) => {
  const response = await api.post('/preferences', preferences);
  return response.data;
};

export const getMealPlan = async (userId: string) => {
  const response = await api.get(`/meal-plans/${userId}`);
  return response.data;
};

// Recipes
export const getRecipeSuggestions = async (preferences: any) => {
  const response = await api.post('/recipes/suggestions', preferences);
  return response.data;
};

export const acceptRecipe = async (recipeId: string) => {
  const response = await api.post(`/recipes/${recipeId}/accept`);
  return response.data;
};

export const rejectRecipe = async (recipeId: string) => {
  const response = await api.post(`/recipes/${recipeId}/reject`);
  return response.data;
};

// Grocery List
export const getGroceryList = async (mealPlanId: string) => {
  const response = await api.get(`/grocery-list/${mealPlanId}`);
  return response.data;
};

// Orders
export const createOrder = async (orderDetails: any) => {
  const response = await api.post('/orders', orderDetails);
  return response.data;
};

export const getOrderStatus = async (orderId: string) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};