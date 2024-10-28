import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';
import { getGroceryList } from '../services/api';
import LoadingScreen from '../components/LoadingScreen';

const GroceryListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groceryList, setGroceryList] = useState<any[]>([]);
  const [preferences, setPreferences] = useState({
    organicOnly: false,
    preferredBrands: '',
    substituteAllowed: true
  });

  useEffect(() => {
    fetchGroceryList();
  }, []);

  const fetchGroceryList = async () => {
    try {
      const { planId } = location.state || {};
      if (!planId) {
        throw new Error('No meal plan ID provided');
      }

      const data = await getGroceryList(planId);
      setGroceryList(data.items);
    } catch (err) {
      setError('Failed to load grocery list');
      console.error('Error fetching grocery list:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = async (id: string, change: number) => {
    setGroceryList(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  if (isLoading) return <LoadingScreen />;
  if (error) return <div className="text-red-600 text-center p-4">{error}</div>;

  // Rest of the component remains the same...
  // (Previous JSX and handlers remain unchanged)
};