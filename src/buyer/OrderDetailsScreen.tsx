import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Props {
  route: {
    params: {
      quantity: number;
      installation: boolean;
      location: string;
      phone: string;
    };
  };
}

const OrderDetailsScreen: React.FC<Props> = ({ route }) => {
  const { quantity, installation, location, phone } = route.params;

  const basePrice = 7;
  const installCharge = installation ? 1 : 0;
  const totalPrice = quantity * (basePrice + installCharge);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>تفاصيل الطلب</Text>

      <Text style={styles.label}>عدد الجرات: <Text style={styles.value}>{quantity}</Text></Text>
      <Text style={styles.label}>خدمة التركيب: <Text style={styles.value}>{installation ? 'نعم' : 'لا'}</Text></Text>
      <Text style={styles.label}>الموقع: <Text style={styles.value}>{location}</Text></Text>
      <Text style={styles.label}>رقم الهاتف: <Text style={styles.value}>{phone}</Text></Text>
      <Text style={styles.label}>سعر الجرة: <Text style={styles.value}>٧ دنانير</Text></Text>
      {installation && (
        <Text style={styles.label}>تكلفة التركيب لكل جرة: <Text style={styles.value}>١ دينار</Text></Text>
      )}
      <Text style={styles.total}>المجموع الكلي: {totalPrice} دينار</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: '#ccc',
    marginVertical: 5,
  },
  value: {
    color: '#fff',
    fontWeight: 'bold',
  },
  total: {
    fontSize: 20,
    color: '#00e676',
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default OrderDetailsScreen;
