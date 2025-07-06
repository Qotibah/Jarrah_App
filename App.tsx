import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import BuyerLoginScreen from './src/buyer/BuyerLoginScreen';
import BuyerOrderScreen from './src/buyer/BuyerOrderScreen';
import { RootStackParamList } from './src/types/navigation';

import MapPickerScreen from './src/buyer/MapPickerScreen'; 
import SellerLoginScreen from './src/sallar/SellerLoginScreen'; // تأكد من وجود هذا المسار

const Stack = createNativeStackNavigator<RootStackParamList>();
// مؤقتًا سنستخدم شاشات فاضية لمكان تسجيل الدخول


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="BuyerLogin" component={BuyerLoginScreen} />
        <Stack.Screen name="BuyerOrder" component={BuyerOrderScreen} />
         <Stack.Screen name="MapPicker" component={MapPickerScreen} />
        <Stack.Screen name="SellerLogin" component={SellerLoginScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
