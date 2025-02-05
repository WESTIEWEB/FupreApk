import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import Screens
import Login from './Features/LoginScreen/Login';
import Home from './Features/Home/Home';
import useAppStore from './Store/AppStore';
import { DarkColorTheme, LightColorTheme } from './constants/Colors';
import Onboarding from './Features/Onboarding/Onboarding';
import Dashboard from './Features/Dashboard/Dashboard';
import FupreDetails from './Features/FupreDetails/FupreDetails';
import { ResponseModel } from './model/response.model';
import MainNavigation from './Navigation/MainNavigation';
import Tango from './Features/Tango/Tango';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Define the parameter list for your stack
export type RootStackParamList = {
  Home: undefined;
  TagDetail: { data: ResponseModel };
  Tango: undefined;
  Onboarding: {};
  Login: undefined;
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const colorTheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function loadResourcesAndData() {
      try {
        // Load fonts
        await Font.loadAsync({
          'Space-Regular': require('./assets/fonts/SpaceMono-Regular.ttf'),
          ...MaterialCommunityIcons.font, // Load vector icons
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndData();
  }, []);

  if (!appIsReady) {
    return null; // Prevent rendering until fonts and icons are loaded
  }

  const Public = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );

  const Secured = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={MainNavigation} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TagDetail" component={FupreDetails} />
      <Stack.Screen name="Tango" component={Tango} />
    </Stack.Navigator>
  );

  const MainScreen = () => {
    const { user } = useAppStore();
    return user?.Id ? <Secured /> : <Public />;
  };

  return (
    <NavigationContainer theme={colorTheme === 'dark' ? DarkColorTheme : LightColorTheme}>
      <MainScreen />
    </NavigationContainer>
  );
}
