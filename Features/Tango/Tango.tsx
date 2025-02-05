import { View, Text, TextInput, Alert, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import axios from 'axios';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { DefaultTheme, useNavigation, useTheme } from '@react-navigation/native';
import { DarkColorTheme } from '@/constants/Colors';
import { AssetData } from '@/Interface/assetInterface';
import { ResponseModel } from '@/model/response.model';
import { dashItems } from '../Dashboard/Dashboard';
import useHomeServer from '../Home/useHomeServer';


const Tango = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [tagno, setTagno] = useState<string>('');
  const [resData, setResData] = useState<AssetData>({} as AssetData);
  const { fetchDetails } = useHomeServer();

  const navigation = useNavigation() as any;

  const colorTheme = useTheme();
    const color = colorTheme.dark ? DarkColorTheme.colors.text : DefaultTheme.colors.text;
    const plaeholder = colorTheme.dark ? DarkColorTheme.colors.border : 'FUPRE/ST/FF/.Ex';
    const background = colorTheme.dark ? DarkColorTheme.colors.background : DefaultTheme.colors.background;



  const fetchTagDetails = async (tag: string) => {
    if(!tag) {
        return
    }
    setLoading(true)
    try {
      
      const res = await fetchDetails(tag);
      if(res.data) {
        setLoading(false)
        navigation.navigate('TagDetail', {data: res.data})
      } else {
        setLoading(false);
        alert(res.message || 'Error occured and no data fetched')
      }
    } catch (error: any) {
        alert(error.message)
    } finally{
      setLoading(false);
    }

  };

  return (
    <ParallaxScrollView title='Search Tango'>
      <View >
        <ThemedText type='cardText'>Enter Tag Number:</ThemedText>
        <View style={styles.inputContainer}>
          <TextInput
            value={tagno}
            style={[styles.input, {
              color
            }]}
            placeholderTextColor={plaeholder}
            onChangeText={setTagno}
            placeholder="TG-126737" />
        </View>
        
        <ThemedButton disabled={loading} style={{
          padding: 10,
          borderRadius: 5,
          marginBottom: 20
        }} darkColor='blue' lightColor='green' onPress={() => fetchTagDetails(tagno)}>
          <ThemedText type='cardText' lightColor='#fff' style={{
            textAlign: 'center'
          }}>
            {loading ? 'Fetching data...' : 'Fetch Details'}
          </ThemedText>
        </ThemedButton>
      </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    height: 400,
    width: '100%',
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
});

export default Tango;
