import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { AssetData } from '@/Interface/assetInterface';
import { RootStackParamList } from '@/App';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

type TagDetailRouteProp = RouteProp<RootStackParamList, 'TagDetail'>;

// Props for the component
interface TagDetailProps {
  route: TagDetailRouteProp;
}

const FupreDetails: React.FC<TagDetailProps> = ({ route }) => {
  const { data } = route.params;
  const detail = data.Data as unknown as AssetData;

  const details = [
    { label: 'Branch Name', value: detail?.BranchName, icon: 'business' },
    { label: 'Department', value: detail?.DepartmentName, icon: 'briefcase' },
    { label: 'Category', value: detail?.CategoryName, icon: 'layers' },
    { label: 'Inventory Type', value: detail?.InventoryTypeName, icon: 'cube' },
    { label: 'Status', value: detail?.EnumStatus, icon: 'alert-circle' },
    { label: 'Quantity', value: `${detail?.Quantity} ${detail?.Uom}`, icon: 'stats-chart' },
    { label: 'Cost Price', value: detail?.CostPriceText, icon: 'cash-outline' },
    { label: 'Sales Price', value: detail?.SalesPriceText, icon: 'pricetag' },
    { label: 'Manufacturing Date', value: detail?.MfgDateText, icon: 'calendar' },
    { label: 'Operational Date', value: detail?.AssetOperationalDateText, icon: 'time' },
    { label: 'Created By', value: `${detail?.CreatedByName} (${detail?.CreatedDateText})`, icon: 'person' },
  ];

  return (
    <ParallaxScrollView title="Details Page">
      <ThemedView style={styles.container}>
        {details.map((item, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.iconWrapper}>
              <Ionicons name={item.icon as any} size={22} color="#4A90E2" />
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={[styles.value, !item.value ? styles.placeholder : null]}>
                {item.value || 'N/A'}
              </Text>
            </View>
          </View>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
};

export default FupreDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    backgroundColor: '#EAF1FF',
    padding: 10,
    borderRadius: 50,
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#777',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    color: '#999',
    fontStyle: 'italic',
  },
});
