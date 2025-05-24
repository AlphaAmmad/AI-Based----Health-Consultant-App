import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './login/login';
import SignupScreen from './signup/signup';
import FormScreen from './form/page';
import dashboard from './dashboard';
import ResultScreen from './result/page';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Health Assistant Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Create Account' }} />
        <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Health Assessment' }} />
        <Stack.Screen name="dashboard" component={dashboard} options={{ title: 'Health Assessment' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Health Analysis' }} />
      </Stack.Navigator>
    
  );
}