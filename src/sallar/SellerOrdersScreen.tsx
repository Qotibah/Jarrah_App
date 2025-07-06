import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // تأكد أن المسار صحيح

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SellerOrders'>;
const navigation = useNavigation<NavigationProp>();

type Order = {
  id: string;
  phone: string;
  quantity: number;
  installation: boolean;
  location: { latitude: number; longitude: number };
};

const mockOrders: Order[] = [
  {
    id: '1',
    phone: '0799999999',
    quantity: 2,
    installation: true,
    location: { latitude: 31.963158, longitude: 35.930359 },
  },
  {
    id: '2',
    phone: '0788888888',
    quantity: 1,
    installation: false,
    location: { latitude: 31.97, longitude: 35.92 },
  },
];

const SellerOrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleAccept = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    alert('✅ تم قبول الطلب');
  };

  const handleReject = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    alert('❌ تم رفض الطلب');
  };

  const renderItem = ({ item }: { item: Order }) => (
    <View style={styles.card}>
      <Text style={styles.text}>📱 رقم الزبون: {item.phone}</Text>
      <Text style={styles.text}>📦 عدد الجرات: {item.quantity}</Text>
      <Text style={styles.text}>🛠️ تركيب: {item.installation ? 'نعم' : 'لا'}</Text>
      <Text style={styles.text}>
        📍 الموقع: {item.location.latitude.toFixed(4)}, {item.location.longitude.toFixed(4)}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#27ae60' }]}
          onPress={() => handleAccept(item.id)}
        >
          <Text style={styles.buttonText}>قبول</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#c0392b' }]}
          onPress={() => handleReject(item.id)}
        >
          <Text style={styles.buttonText}>رفض</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#2980b9' }]}
          onPress={() => navigation.navigate('SellerOrderDetails', { order: item })}
        >
          <Text style={styles.buttonText}>تفاصيل</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>طلبات الزبائن</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>لا توجد طلبات حالياً</Text>}
      />
    </View>
  );
};

export default SellerOrdersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  title: { fontSize: 24, color: '#fff', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor: '#555',
    borderWidth: 1,
  },
  text: { color: '#fff', marginBottom: 5 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  empty: { color: '#888', textAlign: 'center', marginTop: 40 },
});
