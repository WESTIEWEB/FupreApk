import React from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { DarkColorTheme, LightColorTheme } from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import { ThemedText } from './ThemedText';

export type ThemedCardProps = TouchableOpacityProps & {
    lightColor?: string;
    darkColor?: string;
    activeOpacity?: number;
    icon?: React.ReactNode;
    title?: string;
    onPress: () => void
};

const ThemedCard = ({
    lightColor,
    darkColor,
    style,
    activeOpacity = 0.7,
    icon,
    onPress,
    title,
    ...otherProps
}: ThemedCardProps) => {
    const theme = useTheme();
    const color = theme.dark ? DarkColorTheme.colors.text || darkColor : LightColorTheme.colors.text || lightColor;
    const backgroundColor = theme.dark ? darkColor || DarkColorTheme.colors.background : lightColor || LightColorTheme.colors.background;

    // const handleNavigation = () => 
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity} style={[styles.card, { backgroundColor, shadowColor: color }, style]} {...otherProps}>
            <View style={styles.iconContainer}>{icon}</View>
            {title && <ThemedText lightColor='#000' darkColor='#fff' type='cardText'>{title}</ThemedText>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: Sizes.height * 0.15,
        height: Sizes.height * 0.15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // For Android shadow
        margin: 10,
    },
    iconContainer: {
        marginBottom: 8,
    },
  
});

export default ThemedCard;
