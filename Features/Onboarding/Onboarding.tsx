import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react'
import LottieView from 'lottie-react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { DarkColorTheme, LightColorTheme } from '@/constants/Colors';
import Sizes from '@/constants/Sizes';



const Onboarding: React.FC = () => {
  const colorTheme = useTheme();
  const color = colorTheme.dark ? DarkColorTheme.colors.text : LightColorTheme.colors.text;
  const background = colorTheme.dark ? DarkColorTheme.colors.background : LightColorTheme.colors.background;

  const navigation = useNavigation() as any;

  const onBoardme = () => {
    navigation.navigate('Login')
  }
  return (
    <ParallaxScrollView showHeader={false}  >
        <View style={{flex: 1, height: Sizes.height * 0.8}}>
            <Image
            style={{width: '100%', height: '90%', borderRadius: 20, backgroundColor: 'transparent' }}
            resizeMode='contain'
            source={require('@/assets/images/getStarted.jpg')}/>
            <View style={styles.iconContainer}>
                <ThemedText style={styles.getStarted} type='subtitle'>
                    Lets Get You Started
                </ThemedText>
                <Ionicons onPress={onBoardme} style={styles.icon} name="chevron-forward-circle" size={32} color={color} />
            </View>
        </View>
    </ParallaxScrollView>
  )
}

export default Onboarding;


const styles = StyleSheet.create({
    
    getStarted: {
        textAlign: 'center',
        marginBottom: 20
    },
    iconContainer: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
    icon: {
        alignSelf: 'center'
    }
})