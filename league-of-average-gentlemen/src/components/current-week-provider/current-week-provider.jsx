import { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the current week
const CurrentWeekContext = createContext();

// Create a provider component
export const CurrentWeekProvider = ({ children }) => {
  const [currentWeek, setCurrentWeek] = useState(null);

  useEffect(() => {
    // Fetch the current week from your API here and set it in setCurrentWeek
    async function fetchCurrentWeek() {
      try {
        const response = await fetch('https://api.sleeper.app/v1/state/nfl'); // Replace with your API URL
        const data = await response.json();
        setCurrentWeek(data.week); // Assuming 'data.week' contains the current week
      } catch (error) {
        console.error('Error fetching current week:', error);
      }
    }

    fetchCurrentWeek();
  }, []);

  return (
    <CurrentWeekContext.Provider value={currentWeek}>
      {children}
    </CurrentWeekContext.Provider>
  );
};

// Create a custom hook to access the current week
export const useCurrentWeek = () => {
  const context = useContext(CurrentWeekContext);
  if (context === undefined) {
    throw new Error('useCurrentWeek must be used within a CurrentWeekProvider');
  }
  return context;
};


