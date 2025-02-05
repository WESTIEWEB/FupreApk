import type { PropsWithChildren, ReactElement } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { DefaultTheme, useNavigation, useTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from './ThemedText';
import { DarkColorTheme } from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
  title?: string;
  to?: string;
  showHeader?: boolean;
  lightColor?: string;
  darkColor?: string;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  title,
  showHeader = true,
  darkColor,
  lightColor
}: Props) {
  const theme = useTheme();
  const colorScheme = theme.dark ? 'dark' : 'light';
  const color = colorScheme === 'dark' ? DarkColorTheme.colors.text : DefaultTheme.colors.text;
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const navigation = useNavigation() as any;

  const handleBack = () => {
    navigation.goBack();
  }

  return (
    <ThemedView lightColor={lightColor} darkColor={darkColor} style={styles.container}>
      {showHeader && <View style={styles.backView}>
        <MaterialIcons style={styles.back} color={color} onPress={handleBack} name='arrow-back' size={22} />
        <ThemedText type='subtitle' style={{textAlign: 'center'}} >
          {title}
        </ThemedText>
      </View>}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom, }}
        >
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    height: Sizes.height
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  backView: {
    // marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  back: {
    position: 'absolute',
    left: 20,
    overflow: 'hidden'
  }
});
