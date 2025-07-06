export type RootStackParamList = {
  RoleSelection: undefined;
  BuyerLogin: undefined;
  SellerLogin: undefined;
  BuyerOrder: { phone: string; location?: { latitude: number; longitude: number } };
  SellerOrders: undefined;
  MapPicker: undefined;
};
