import { View, StyleSheet } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import ThemedCard from '@/components/ThemedCard';
import Sizes from '@/constants/Sizes';
import { useNavigation } from '@react-navigation/native';
import { ThemedButton } from '@/components/ThemedButton';
import useAppStore from '@/Store/AppStore';

interface DashItemI {
  name: string;
  icon: string;
  color: string;
  screen: null | string;
}

export const dashItems: DashItemI[] = [
    { name: 'Scan ID', icon: 'qrcode-scan', color: 'black', screen: 'Home' },
    { name: 'Event', icon: 'calendar', color: 'red', screen: null },
    { name: 'Attendance', icon: 'checkbox-marked-outline',color: 'blue', screen: null },
    { name: 'Profile', icon: 'face-man-profile', color: 'green', screen: null },
    { name: 'Fees Details', icon: 'currency-usd', color: 'gold', screen: null },
    { name: 'Grade Sheet', icon: 'file-document-outline', color: 'purple', screen: null },
    { name: 'Galery', icon: 'currency-usd', color: 'gold', screen: null },
    { name: 'News', icon: 'file-document-outline', color: 'purple', screen: null },
];

const Dashboard = () => {
    const navigation = useNavigation() as any;
    const { setUser } = useAppStore();

    const handlePress = (item: DashItemI) => {
      if(item.screen) {
        navigation.navigate(item.screen)
      }
    }
    return (
        <ParallaxScrollView  showHeader={false} title="Dashboard">
            <ThemedText type="subtitle" style={styles.message}>Student Portal</ThemedText>

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
            <ThemedButton onPress={() => {
                setUser({
                    id: null,
                    email: '',
                    name: ''
                })
            }}>
                <ThemedText style={styles.logout}>
                    Logout
                </ThemedText>
            </ThemedButton>
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
