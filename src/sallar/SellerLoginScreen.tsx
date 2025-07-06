import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SellerLogin'>;

const SellerLoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [phone, setPhone] = useState('');

  const handleLogin = () => {
    if (phone.trim().length < 9) {
      Alert.alert('خطأ', 'يرجى إدخال رقم هاتف صالح');
      return;
    }

    // You can add logic to verify the seller here
    navigation.navigate('SellerOrders');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل الدخول كبائع</Text>
      <TextInput
        style={styles.input}
        placeholder="أدخل رقم هاتفك"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>دخول</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SellerLoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111', padding: 20 },
  title: { fontSize: 24, color: '#fff', marginBottom: 30 },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    marginBottom: 20,
    color: '#fff',
    backgroundColor: '#222',
  },
  button: {
    backgroundColor: '#f39c12',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
