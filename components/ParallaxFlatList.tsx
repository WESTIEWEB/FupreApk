import React from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { DefaultTheme, useNavigation, useTheme } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from './ThemedText';
import { DarkColorTheme } from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

const HEADER_HEIGHT = 10;

type Props<T> = {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor?: (item: T, index: number) => string;
  headerImage?: React.ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
  title?: string;
  showHeader?: boolean;
  darkColor?: string;
  lightColor?: string;
};

export default function ParallaxFlatList<T>({
  data,
  renderItem,
  keyExtractor,
  headerImage,
  headerBackgroundColor,
  title,
  showHeader = true,
  darkColor,
  lightColor
}: Props<T>) {
  const theme = useTheme();
  const colorScheme = theme.dark ? 'dark' : 'light';
  const color = colorScheme === 'dark' ? DarkColorTheme.colors.text : DefaultTheme.colors.text;
 
  const bottom = useBottomTabOverflow();
  const navigation = useNavigation();



  return (
    <ThemedView lightColor={lightColor} darkColor={darkColor} style={styles.container}>
      {showHeader && (
        <View style={styles.backView}>
          <MaterialIcons style={styles.back} color={color} onPress={() => navigation.goBack()} name="arrow-back" size={22} />
          <ThemedText  type="subtitle" style={{ textAlign: 'center' }}>
            {title}
          </ThemedText>
        </View>
      )}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: bottom }}
        ListHeaderComponent={
          <Animated.View style={[styles.header]}>
            {headerImage}
          </Animated.View>
        }
      />
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  back: {
    position: 'absolute',
    left: 20,
  },
});
