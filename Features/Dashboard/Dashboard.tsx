import { View, StyleSheet, TouchableOpacity, StatusBar, useColorScheme } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import ThemedCard from '@/components/ThemedCard';
import Sizes from '@/constants/Sizes';
import { DefaultTheme, useNavigation } from '@react-navigation/native';
import { ThemedButton } from '@/components/ThemedButton';
import useAppStore from '@/Store/AppStore';
import { DarkColorTheme, LightColorTheme } from '@/constants/Colors';

interface DashItemI {
  name: string;
  icon: string;
  color: string;
  screen: null | string;
}

export const dashItems: DashItemI[] = [
    { name: 'Scan QR', icon: 'qrcode-scan', color: 'gold', screen: 'Home' },
    { name: 'Search Tango', icon: 'archive-search-outline', color: 'green', screen: 'Tango' },
    // { name: 'Event', icon: 'calendar', color: 'red', screen: null },
    // { name: 'Attendance', icon: 'checkbox-marked-outline',color: 'blue', screen: null },
    // { name: 'Profile', icon: 'face-man-profile', color: 'green', screen: null },
    // { name: 'Fees Details', icon: 'currency-usd', color: 'gold', screen: null },
    // { name: 'Grade Sheet', icon: 'file-document-outline', color: 'purple', screen: null },
    // { name: 'Galery', icon: 'currency-usd', color: 'gold', screen: null },
    // { name: 'News', icon: 'file-document-outline', color: 'purple', screen: null },
];

const Dashboard = () => {
    const navigation = useNavigation() as any;
    const { setUser, user } = useAppStore();

    const colorTheme = useColorScheme();
      const color = colorTheme === 'dark' ? DarkColorTheme.colors.text : LightColorTheme.colors.text
      const background = colorTheme === 'dark' ? DarkColorTheme.colors.background : DefaultTheme.colors.background;

    const handlePress = (item: DashItemI) => {
        console.log(user)
      if(item.screen) {
        navigation.navigate(item.screen)
      }
    }
    return (
        <ParallaxScrollView lightColor='#90D9FA'  showHeader={false} title="Dashboard">
            <StatusBar
                      backgroundColor={colorTheme === 'dark' ? DarkColorTheme.colors.background : '#90D9FA'}
                      barStyle={colorTheme === 'dark' ? 'light-content' : 'dark-content'}
                  />
            <ThemedText lightColor='black' type="subtitle" style={styles.message}>Fupre Portal</ThemedText>

            {/* Grid Layout for Cards */}
            <View style={styles.gridContainer}>
                {dashItems.map((item: any, index) => (
                    <View key={index} style={styles.card}>
                        <ThemedCard
                            onPress={() => handlePress(item)}
                            icon={<MaterialCommunityIcons name={item.icon} size={40} color={item.color} />}
                            title={item.name}
                            style={styles.cardContent}
                        />
                    </View>
                ))}
            </View>
            {/* <TouchableOpacity style={{
                marginTop: Sizes.height * 0.2
            }} onPress={() => {
                setUser({})
            }}>
                <ThemedText lightColor='#fff' style={styles.logout}>
                    Logout
                </ThemedText>
            </TouchableOpacity> */}
        </ParallaxScrollView>
    );
};

const styles = StyleSheet.create({
    message: {
        textAlign: 'center',
        padding: 10,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    card: {
        width: Sizes.width * 0.4, // Ensures two columns
        marginVertical: 10,
    },
    cardContent: {
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
    },
    logout: {
        textAlign: 'center'
    }
});

export default Dashboard;
