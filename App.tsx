import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './Features/LoginScreen/Login';
import Home from './Features/Home/Home';
import useAppStore from './Store/AppStore';
import { useColorScheme } from 'react-native';
import { DarkColorTheme, LightColorTheme } from './constants/Colors';


const Stack= createNativeStackNavigator();

export default function App() {
  const colorTheme = useColorScheme();

  const Public = () => {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
    )
  }

  const Secured = () => {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
    )
  }

  const MainScreen = () => {
    const { user } = useAppStore()

    return user ?  (
        <React.Fragment><Secured /> </React.Fragment> 
    ) : (<Public />)
  }
  return (
    <NavigationContainer theme={ colorTheme === 'dark' ? DarkColorTheme : LightColorTheme}>
        <MainScreen />
    </NavigationContainer>
  )
}