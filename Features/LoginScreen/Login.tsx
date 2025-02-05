import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, SafeAreaView, TextInput } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import React, { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DefaultTheme, useTheme } from '@react-navigation/native';
import { DarkColorTheme } from '@/constants/Colors';
import { ThemedButton } from '@/components/ThemedButton';
import useAppStore from '@/Store/AppStore';

type FormData = {
  email: string;
  password: string;
};

const Login = ({navigation}: {navigation: any}) => {
  const [secureText, setSecureText] = useState(true);
  const { setUser } = useAppStore();
  const colorTheme = useTheme();
  const color = colorTheme.dark ? DarkColorTheme.colors.text : DefaultTheme.colors.text;
  const background = colorTheme.dark ? DarkColorTheme.colors.background : DefaultTheme.colors.background;

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setUser({
      email: data.email,
      name: data.email,
      id: '34'
    })
    Alert.alert("Success", "You are logged in!");

    navigation.navigate('Home'); // Uncomment if you have a Home screen
  };
  return (
    <ParallaxScrollView showHeader={false} >
      <View>
            <Image style={[styles.img]} source={require('@/assets/images/app-logo.png')} resizeMode='contain' />
      </View>
      <SafeAreaView style={styles.container}>
      <ThemedText style={styles.title}>Welcome Back!</ThemedText>
      <ThemedText style={styles.subtitle}>Login to continue</ThemedText>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={22} color="#888" style={styles.icon} />
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email"
              style={[styles.input, {
                color,
              }]}
              importantForAutofill="no"
              autoCorrect={false}
              keyboardType="email-address"
              value={value}
              placeholderTextColor={color}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      {errors.email && <ThemedText style={styles.error}>{errors.email.message}</ThemedText>}

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.icon} />
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required", minLength: 6 }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Password"
              style={[styles.input, {
                color
              }]}
              importantForAutofill="no"
              autoCorrect={false}
              secureTextEntry={secureText}
              placeholderTextColor={color}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#888"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {errors.password && <ThemedText style={styles.error}>Password must be at least 6 characters</ThemedText>}

      {/* Login Button */}
      <ThemedButton darkColor='#0a7ea4' lightColor='#7367f0' style={[styles.button, {

      }]} onPress={handleSubmit(onSubmit)}>
        <ThemedText lightColor='#fff' style={styles.buttonText}>Login</ThemedText>
      </ThemedButton>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => {}}>
        <ThemedText lightColor='#7367f0' style={styles.forgotText}>Forgot Password?</ThemedText>
      </TouchableOpacity>

      {/* Register Redirect */}
      <View style={styles.registerContainer}>
        <ThemedText type='link' style={styles.registerText}>Don't have an account?</ThemedText>
        <TouchableOpacity onPress={() => {}}>
          <ThemedText type='link' style={styles.registerLink}> Sign up</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotText: {
    textAlign: "center",
    marginTop: 10,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
  },
  registerLink: {
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  img: {
    width: 100,
    marginTop: 40,
    height: 100,
    objectFit: 'cover',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
  },
});

export default Login;

