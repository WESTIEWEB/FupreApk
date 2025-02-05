import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './Features/LoginScreen/Login';
import Home from './Features/Home/Home';
import useAppStore from './Store/AppStore';
import { useColorScheme } from 'react-native';
import { DarkColorTheme, LightColorTheme } from './constants/Colors';
import Onboarding from './Features/Onboarding/Onboarding';
import Dashboard from './Features/Dashboard/Dashboard';
import FupreDetails from './Features/FupreDetails/FupreDetails';
import { AssetData } from './Interface/assetInterface';
import { ResponseModel } from './model/response.model';

// Define the parameter list for your stack
export type RootStackParamList = {
    Home: undefined;
    TagDetail: { data: ResponseModel }; 
    Onboarding: {  }; 
    Login: undefined; 
    Dashboard: undefined;
};
const Stack= createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const colorTheme = useColorScheme();

  const Public = () => {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen  name='Onboarding' component={Onboarding} />
        <Stack.Screen name='Login' component={Login} />

    </Stack.Navigator>
    )
  }

  const Secured = () => {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Dashboard' component={Dashboard} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='TagDetail' component={FupreDetails} />
    </Stack.Navigator>
    )
  }

  const MainScreen = () => {
    const { user } = useAppStore()

    return user?.id ?  (
        <React.Fragment><Secured /> </React.Fragment> 
    ) : (<Public />)
  }
  return (
    <NavigationContainer theme={ colorTheme === 'dark' ? DarkColorTheme : LightColorTheme}>
        <MainScreen />
    </NavigationContainer>
  )
}