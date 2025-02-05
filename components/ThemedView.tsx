import { DarkColorTheme, LightColorTheme } from '@/constants/Colors';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView, View, type ViewProps } from 'react-native';


export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};
export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();
  const backgroundColor = theme.dark ? darkColor || DarkColorTheme.colors.background : lightColor || LightColorTheme.colors.background;
  return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}
