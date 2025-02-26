import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState, useRef } from 'react';
import { useColorScheme, AppState, StatusBar } from 'react-native'; // Import AppStateSubscription
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Screens
import Login from './Features/LoginScreen/Login';
import Home from './Features/Home/Home';
import useAppStore from './Store/AppStore';
import { DarkColorTheme, LightColorTheme } from './constants/Colors';
import Onboarding from './Features/Onboarding/Onboarding';
import FupreDetails from './Features/FupreDetails/FupreDetails';
import { ResponseModel } from './model/response.model';
import MainNavigation from './Navigation/MainNavigation';
import Tango from './Features/Tango/Tango';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

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
  const { user, logout } = useAppStore();
  const logoutTimer = useRef<NodeJS.Timeout | null>(null);
  const appStateSubscription = useRef<{ remove: () => void } | null>(null); // Store the subscription

  useEffect(() => {
    async function loadResourcesAndData() {
      try {
        await Font.loadAsync({
          'Space-Regular': require('./assets/fonts/SpaceMono-Regular.ttf'),
          ...MaterialCommunityIcons.font,
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

  useEffect(() => {
    if (user?.Id) {
      startLogoutTimer();
      appStateSubscription.current = AppState.addEventListener('change', handleAppStateChange); // Store the subscription
    } else {
      clearLogoutTimer();
      if (appStateSubscription.current) {
        appStateSubscription.current.remove(); // Remove the listener
        appStateSubscription.current = null;
      }
    }

    return () => {
      clearLogoutTimer();
      if (appStateSubscription.current) {
        appStateSubscription.current.remove(); // Remove the listener
        appStateSubscription.current = null;
      }
    };
  }, [user]);

  const startLogoutTimer = async () => {
    const lastLoginTime = await AsyncStorage.getItem('lastLoginTime');
    const now = Date.now();
    let timeToLogout = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (lastLoginTime) {
      const elapsed = now - parseInt(lastLoginTime);
      timeToLogout = Math.max(0, 24 * 60 * 60 * 1000 - elapsed);
    } else {
      await AsyncStorage.setItem('lastLoginTime', now.toString());
    }

    clearLogoutTimer();
    logoutTimer.current = setTimeout(() => {
      logout();
      AsyncStorage.removeItem('lastLoginTime');
    }, timeToLogout);
  };

  const clearLogoutTimer = () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
  };

  const resetLogoutTimer = async () => {
    await AsyncStorage.setItem('lastLoginTime', Date.now().toString());
    startLogoutTimer();
  };

  const handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'active') {
      resetLogoutTimer();
    }
  };

  if (!appIsReady) {
    return null;
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
    return user?.Id ? <Secured /> : <Public />;
  };

  return (
    <NavigationContainer theme={colorTheme === 'dark' ? DarkColorTheme : LightColorTheme}>
      <StatusBar
        backgroundColor={colorTheme === 'dark' ? DarkColorTheme.colors.background : '#90D9FA'}
        barStyle={colorTheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <MainScreen />
    </NavigationContainer>
  );
}