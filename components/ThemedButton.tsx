import { DarkColorTheme, LightColorTheme } from '@/constants/Colors';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity, TouchableOpacityProps, View, type ViewProps } from 'react-native';


export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  activeOpacity?: number
};
export function ThemedButton({ style, lightColor, darkColor, activeOpacity, ...otherProps }: ThemedButtonProps) {
  const theme = useTheme();
  const backgroundColor = theme.dark ? darkColor || DarkColorTheme.colors.background : lightColor || LightColorTheme.colors.background;

  return <TouchableOpacity activeOpacity={activeOpacity || 1} style={[{ backgroundColor }, style]} {...otherProps} />;
}
