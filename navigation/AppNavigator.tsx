import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstScreen from '../screens/auth/FirstScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import CountrySelectScreen from '../screens/auth/CountrySelectScreen'; // Import CountrySelectScreen
import FirstStep from '../screens/auth/FirstStep';
import SecondStep from '../screens/auth/SecondStep';
import ThirdStep from '../screens/auth/ThirdStep';
import FourthStep from '../screens/auth/FourthStep';
import FifthStep from '../screens/auth/FifthStep';
import SixthStep from '../screens/auth/SixthStep';
import DashboardScreen from '../screens/main/DashboardScreen';
import LoginCodeScreen from '../screens/auth/LoginCodeScreen';
import { View, ActivityIndicator } from 'react-native';

// Define the type for your stack's routes
export type StackParamList = {
  First: undefined;
  Login: undefined;
  LoginCodeScreen: { username: string };
  CountrySelectScreen: undefined;
  FirstStep: { selectedCountry: any };
  SecondStep: undefined;
  ThirdStep: undefined;
  FourthStep: undefined;
  FifthStep: undefined;
  SixthStep: undefined;
  DashboardScreen: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const AppNavigator: React.FC = () => {
  const [loading, setLoading] = useState(true); // Loading state for token check
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Get token from storage
        setIsLoggedIn(!!token); // Set logged-in status
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false); // Stop loading once check is complete
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    // Show a loading indicator while checking the token
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          // If logged in, start with DashboardScreen
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        ) : (
          // If not logged in, start with FirstScreen and the registration flow
          <>
            <Stack.Screen name="First" component={FirstScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="LoginCodeScreen" component={LoginCodeScreen} />
            <Stack.Screen name="CountrySelectScreen" component={CountrySelectScreen} />
            <Stack.Screen name="FirstStep" component={FirstStep} />
            <Stack.Screen name="SecondStep" component={SecondStep} />
            <Stack.Screen name="ThirdStep" component={ThirdStep} />
            <Stack.Screen name="FourthStep" component={FourthStep} />
            <Stack.Screen name="FifthStep" component={FifthStep} />
            <Stack.Screen name="SixthStep" component={SixthStep} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
