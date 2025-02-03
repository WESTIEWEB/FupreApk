import { View, Text } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import ParallaxScrollView from '@/components/ParallaxScrollView'

const Login = () => {
  return (
    <ParallaxScrollView >
      <ThemedText lightColor='blue' darkColor='black'>
        Hello
      </ThemedText>
    </ParallaxScrollView>
  )
}

export default Login