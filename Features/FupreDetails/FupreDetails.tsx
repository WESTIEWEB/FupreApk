import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { AssetData } from '@/Interface/assetInterface';
import { RootStackParamList } from '@/App';
import ParallaxFlatList from '@/components/ParallaxFlatList';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';

type TagDetailRouteProp = RouteProp<RootStackParamList, 'TagDetail'>;

interface TagDetailProps {
  route: TagDetailRouteProp;
}

const FupreDetails: React.FC<TagDetailProps> = ({ route }) => {
  const { data } = route.params;
  const detail = data.Data as unknown as AssetData;

  const details = [
    { label: 'Branch Name', value: detail?.BranchName, icon: 'business' },
    { label: 'Category', value: detail?.CategoryName, icon: 'layers' },
    { label: 'Department', value: detail?.DepartmentName, icon: 'briefcase' },
    { label: 'Tagno', value: detail?.Tagno, icon: 'barcode' },
    { label: 'Paid Amount', value: detail?.AssetPaidAmountText, icon: 'cash-outline' },
    { label: 'Total Amount', value: detail?.AssetTotalAmountText, icon: 'cash-outline' },
    { label: 'Depreciation Rate', value: `${detail?.AssetAnnualDepreciateRateText}%`, icon: 'stats-chart' },
    { label: 'Net Book Value', value: detail?.CalcAssetNetBookValueText, icon: 'stats-chart' },
    { label: 'Status', value: detail?.EnumStatus, icon: 'alert-circle' },
    { label: 'Created At', value: detail?.CreatedDateText, icon: 'calendar' },
    { label: 'Last Modified', value: detail?.LastModifiedDateText, icon: 'calendar' },
  ];

  return (
    <ParallaxFlatList
      
      data={details}
      title="Details Page"
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Ionicons name={item.icon as any} size={20} color="#4CAF50" style={styles.icon} />
          <View style={styles.textContainer}>
            <ThemedText lightColor='#777' darkColor='#687076' type="cardText" style={styles.label}>{item.label}</ThemedText>
            <ThemedText lightColor='#11181C' darkColor='#ECEDEE' type="cardText" style={[styles.value, !item.value ? styles.placeholder : null]}>
              {item.value || 'N/A'}
            </ThemedText>
          </View>
        </View>
      )}
      keyExtractor={(_, index) => index.toString()}
      lightColor="#fff"
      darkColor="#121212"
    />
  );
};

export default FupreDetails;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
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
    color: '#999',
    fontStyle: 'italic',
  },
});
