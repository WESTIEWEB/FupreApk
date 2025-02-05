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
import useHomeServer from './useHomeServer';
import { AssetData } from '@/Interface/assetInterface';
import { ResponseModel } from '@/model/response.model';
import { dashItems } from '../Dashboard/Dashboard';


const Home = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [tagno, setTagno] = useState<string>('');
  const [resData, setResData] = useState<AssetData>({} as AssetData);
  const { fetchDetails } = useHomeServer();

  const navigation = useNavigation() as any;

  const colorTheme = useTheme();
    const color = colorTheme.dark ? DarkColorTheme.colors.text : DefaultTheme.colors.text;
    const plaeholder = colorTheme.dark ? DarkColorTheme.colors.border : 'grayFUPRE/ST/FF/009';
    const background = colorTheme.dark ? DarkColorTheme.colors.background : DefaultTheme.colors.background;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.message}>We need your permission to show the camera</ThemedText>
        <Button onPress={requestPermission} title="Grant Permission" />
      </ThemedView>
    );
  }

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    alert(JSON.stringify(result.data))
    if (!scanned) {
      setScanned(true);
      // setTagno(result);
      fetchTagDetails(result.data);
    }
  };

  const fetchTagDetails = async (tag: string) => {
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
    <ParallaxScrollView title='QR Code'>
      <View >

        <ThemedText >Scan QR Code:</ThemedText>
        <CameraView
          style={styles.camera}
          facing="back"
          // barcodeScannerSettings={{ barCodeTypes: ['qr', 'ean13', 'code128'] }}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />

        {scanned && <Button title="Scan Again" onPress={() => setScanned(false)} />}
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

export default Home;
