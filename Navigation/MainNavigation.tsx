import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import Screens
import Dashboard from '@/Features/Dashboard/Dashboard';
import Profile from '@/Features/Profile/Profile';
import { useColorScheme } from 'react-native';
import { DarkColorTheme, LightColorTheme } from '@/constants/Colors';

const Tab = createBottomTabNavigator();

const MainNavigation: React.FC = () => {
  const colorTheme = useColorScheme();

  const tabBg = colorTheme === 'dark' ? DarkColorTheme.colors.background : '#90D9FA';
  return (
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: tabBg, height: 60, },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#ECEDEE',
          tabBarLabelStyle: { fontSize: 12 },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerPressOpacity: 1,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={32} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="face-man-profile" color={color} size={32} />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default MainNavigation;
