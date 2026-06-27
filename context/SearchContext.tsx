import { createContext, useContext, useState, ReactNode } from "react";
import * as Location from "expo-location";

export type ProductData = {
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
  storeName: string;
};

export type UserLocation = {
  latitude: number;
  longitude: number;
};

export type Brand = {
  brandId: number;
  brandName: string;
  productCount?: number;
};

export type Store = {
  storeId: number;
  storeName: string;
  latitude: number;
  longitude: number;
  productCount?: number;
};

export type CartItem = {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
  storeName: string;
};


type SearchContextType = {
  brands: Brand[];
  stores: Store[];
  searchQuery: string;
  cartItems: CartItem[];
  userLocation: UserLocation | null;
  storesInCart: Store[];
  setStoresInCart: React.Dispatch<React.SetStateAction<Store[]>>;

  setBrands: (brands: Brand[]) => void;
  setStores: React.Dispatch<React.SetStateAction<Store[]>>;
  setSearchQuery: (query: string) => void;

  requestUserLocation: () => Promise<UserLocation | null>;

  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [storesInCart, setStoresInCart] = useState<Store[]>([]);
  const [shoppingRoute, setShoppingRoute] = useState<Store[]>([]);

  const requestUserLocation = async (): Promise<UserLocation | null> =>{
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Location permission denied.");
      return null;
    }

     const location = await Location.getCurrentPositionAsync({});

      const userLoc = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setUserLocation(userLoc);

      return userLoc;

  };

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(
        p => p.productId === item.productId
      );

      if (existing) {
        return prev.map(p =>
          p.productId === item.productId
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, item];
    });

     const store = stores.find(
      s => s.storeName === item.storeName
    );

    if (store) {
      setStoresInCart(prev => {
        if (!prev.some(s => s.storeId === store.storeId)) {
          return [...prev, store];
        }

        return prev;
      });
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev =>
      prev.filter(item => item.productId !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <SearchContext.Provider
      value={{
        brands,
        stores,
        searchQuery,
        setBrands,
        setStores,
        setSearchQuery,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        userLocation,
        requestUserLocation,
        storesInCart,
        setStoresInCart,
        shoppingRoute,
        setShoppingRoute,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }

  return context;
}
