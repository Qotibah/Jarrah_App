// src/buyer/BuyerOrderScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Switch } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BuyerOrder'>;
type BuyerOrderRouteProp = RouteProp<RootStackParamList, 'BuyerOrder'>;

const BuyerOrderScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<BuyerOrderRouteProp>();
  const phoneFromLogin = route.params.phone;
  const locationFromMap = route.params.location;

  const [quantity, setQuantity] = useState(1);
  const [installation, setInstallation] = useState(false);
  const [phone, setPhone] = useState(phoneFromLogin);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    if (locationFromMap) {
      setLocation(locationFromMap);
      setLocationStatus('تم اختيار موقعك يدويًا ✅');
    }
  }, [locationFromMap]);

  const handleSelectLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('خطأ', 'يرجى السماح بالوصول إلى الموقع');
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
    setLocationStatus('تم اختيار موقعك ✅');
  };

  const handleSubmit = () => {
    if (!phone.trim() || !location) {
      Alert.alert('تنبيه', 'يرجى إدخال رقم الهاتف وتحديد الموقع');
      return;
    }

    const order = {
      phone,
      quantity,
      location,
      installation,
    };

    console.log('🚚 الطلب المرسل:', order);
    Alert.alert('تم', 'تم إرسال الطلب بنجاح!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>طلب جرة غاز</Text>

      <Text style={styles.label}>عدد الجرات:</Text>
      <View style={styles.counterRow}>
        <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))} style={styles.counterButton}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(q => q + 1)} style={styles.counterButton}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>رقم الهاتف:</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        placeholder="07XXXXXXXX"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>الموقع:</Text>

      <View style={{ gap: 10, marginBottom: 20 }}>
        <TouchableOpacity style={styles.locationButton} onPress={handleSelectLocation}>
          <Text style={styles.buttonText}>📍 استخدام موقعي الحالي</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.locationButton, { backgroundColor: '#8e44ad' }]}
          onPress={() => navigation.navigate('MapPicker', { phone })}
        >
          <Text style={styles.buttonText}>🗺️ اختيار على الخريطة</Text>
        </TouchableOpacity>
      </View>

      {location && <Text style={styles.locationText}>{locationStatus}</Text>}

      <View style={styles.installRow}>
        <Text style={styles.label}>هل تحتاج تركيب؟</Text>
        <Switch value={installation} onValueChange={setInstallation} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>تأكيد الطلب</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BuyerOrderScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0e6ff',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 25,
    textAlign: 'center',
    color: '#6a1b9a',
    textShadowColor: 'rgba(255, 165, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
    color: '#4a148c',
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderColor: '#ff9800',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 18,
    fontSize: 16,
    marginBottom: 25,
    backgroundColor: '#fff',
    color: '#4a148c',
    fontWeight: '600',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    justifyContent: 'center',
  },
  counterButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8e24aa',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 15,
    shadowColor: '#ff9800',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  counterText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 24,
    fontWeight: '900',
    color: '#6a1b9a',
    minWidth: 40,
    textAlign: 'center',
  },
  locationButton: {
    backgroundColor: '#ff9800',
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#6a1b9a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 1,
  },
  locationText: {
    color: '#6a1b9a',
    fontSize: 15,
    marginBottom: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  installRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#ff9800',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
});
