import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DefaultTheme, useTheme } from '@react-navigation/native';
import { DarkColorTheme } from '@/constants/Colors';
import useAppStore from '@/Store/AppStore';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import Sizes from '@/constants/Sizes';

const Profile = () => {
  const { user, logout } = useAppStore();
  const [modalVisible, setModalVisible] = useState(false);

  const colorTheme = useTheme();
  const color = colorTheme.dark ? DarkColorTheme.colors.text : DefaultTheme.colors.text;
  const background = colorTheme.dark ? DarkColorTheme.colors.background : DefaultTheme.colors.background;

  const userDetails = [
    { label: 'Name', value: user?.Name, icon: 'person' },
    { label: 'Email', value: user?.Email, icon: 'mail' },
    { label: 'Phone', value: user?.Phone, icon: 'call' },
  ];

  const handleLogout = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setModalVisible(false);
    logout();
  };

  return (
    <ParallaxScrollView title="Profile">
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Image Section */}
        <View style={styles.avatarContainer}>
          <LottieView style={{ width: '100%', height: Sizes.height * 0.15 }} source={require('@/assets/lotties/avatr.json')} />
        </View>

        {/* Profile Details */}
        <ThemedView lightColor={background} darkColor={background} style={styles.profileCard}>
          {userDetails.map((item, index) => (
            <View key={index} style={styles.row}>
              <Ionicons name={item.icon as any} size={20} color="#4CAF50" style={styles.icon} />
              <View style={styles.textContainer}>
                <ThemedText lightColor='#777' darkColor='#687076' type="cardText" style={styles.label}>
                  {item.label}
                </ThemedText>
                <ThemedText lightColor='#11181C' darkColor='#ECEDEE' type="cardText" style={[styles.value, !item.value ? styles.placeholder : null]}>
                  {item.value || 'N/A'}
                </ThemedText>
              </View>
            </View>
          ))}
        </ThemedView>
      </ScrollView>

      {/* Logout Button */}
        <ThemedText onPress={handleLogout} lightColor='#fff' style={styles.logoutText}>
            Logout
        </ThemedText>

      {/* Logout Confirmation Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <ThemedView style={styles.modalContainer}>
          <ThemedView darkColor={background} lightColor={background} style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Confirm Logout</ThemedText>
            <ThemedText style={styles.modalMessage}>Are you sure you want to log out?</ThemedText>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmLogout}>
                <Text style={styles.confirmText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ThemedView    >
      </Modal>
    </ParallaxScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileCard: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  placeholder: {
    fontStyle: 'italic',
  },
  logoutText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 12,
    marginTop: Sizes.height * 0.2 -20,
    color: '#D32F2F',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#B0BEC5',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#D32F2F',
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
