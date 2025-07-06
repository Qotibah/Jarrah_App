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
  const route = useRoute<BuyerOrderRouteProp>();
  const navigation = useNavigation<NavigationProp>();
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
          onPress={() => navigation.navigate('MapPicker')}
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

// ... نفس styles اللي عندك بالضبط
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  counterButton: {
    width: 40,
    height: 40,
    backgroundColor: '#27ae60',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  counterText: {
    color: '#fff',
    fontSize: 24,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationText: {
    color: '#555',
    fontSize: 14,
    marginBottom: 20,
  },
  installRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
    button: {
        backgroundColor: '#e67e22',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
});