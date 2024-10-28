import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sliders, Clock, Scale, UtensilsCrossed, Heart } from 'lucide-react';
import GoalSelector from './GoalSelector';
import ServingsSelector from './ServingsSelector';
import BudgetSelector from './BudgetSelector';
import DeliveryDaySelector from './DeliveryDaySelector';
import LoadingScreen from '../LoadingScreen';
import { submitPreferences } from '../../services/api';

const PreferencesForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    goal: '',
    dietaryRestrictions: [] as string[],
    adults: 2,
    kids: 0,
    cookingTime: 30,
    calorieTarget: 2000,
    allergies: [] as string[],
    cuisinePreferences: [] as string[],
    budget: 150,
    deliveryDay: 'monday'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await submitPreferences(formData);
      // Assuming the API returns a userId or mealPlanId
      navigate('/suggestions', { state: { planId: response.planId } });
    } catch (err) {
      setError('Failed to save preferences. Please try again.');
      console.error('Error submitting preferences:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of the component remains the same...
  // (Previous JSX and handlers remain unchanged)
};