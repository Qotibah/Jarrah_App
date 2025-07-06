import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type OrderDetailsRouteProp = RouteProp<RootStackParamList, 'SellerOrderDetails'>;

const SellerOrderDetailsScreen = () => {
  const route = useRoute<OrderDetailsRouteProp>();
  const { order } = route.params;

  const openInMaps = () => {
    const url = `https://www.google.com/maps?q=${order.location.latitude},${order.location.longitude}`;
    Linking.openURL(url).catch(() =>
      Alert.alert('خطأ', 'تعذر فتح تطبيق الخرائط')
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تفاصيل الطلب</Text>

      <Text style={styles.label}>رقم الهاتف:</Text>
      <Text style={styles.value}>{order.phone}</Text>

      <Text style={styles.label}>عدد الجرات:</Text>
      <Text style={styles.value}>{order.quantity}</Text>

      <Text style={styles.label}>تركيب مطلوب:</Text>
      <Text style={styles.value}>{order.installation ? 'نعم' : 'لا'}</Text>

      <Text style={styles.label}>الموقع:</Text>
      <TouchableOpacity onPress={openInMaps}>
        <Text style={[styles.value, styles.mapLink]}>
          اضغط هنا لفتح الموقع في الخريطة
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SellerOrderDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  title: { fontSize: 26, color: '#fff', marginBottom: 30, textAlign: 'center' },
  label: { fontSize: 16, color: '#ccc', marginTop: 20 },
  value: { fontSize: 18, color: '#fff', marginTop: 4 },
  mapLink: {
    color: '#3498db',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
