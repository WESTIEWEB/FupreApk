import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import Screens
import Dashboard from '@/Features/Dashboard/Dashboard';

const Tab = createBottomTabNavigator();

const MainNavigation: React.FC = () => {
  return (
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#fff', height: 60 },
          tabBarActiveTintColor: '#7367f0',
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={32} />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default MainNavigation;
