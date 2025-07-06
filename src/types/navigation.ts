export type RootStackParamList = {
  RoleSelection: undefined;
  BuyerLogin: undefined;
  BuyerOrder: { phone: string; location?: { latitude: number; longitude: number } };
  SellerLogin: undefined;
  SellerOrders: undefined;
  SellerOrderDetails: {
    order: {
      id: string;
      phone: string;
      quantity: number;
      installation: boolean;
      location: {
        latitude: number;
        longitude: number;
      };
    };
  };
  MapPicker: { phone: string };
};
