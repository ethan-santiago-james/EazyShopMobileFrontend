import { createContext, useContext, useState, ReactNode } from "react";

export type ProductData = {
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
  storeName: string;
};

export type Brand = {
  brandId: number;
  brandName: string;
  products: ProductData[];
};

export type Store = {
  storeId: number;
  storeName: string;
  products: ProductData[];
  searchedProductCount?: number;
};

type SearchContextType = {
  brands: Brand[];
  stores: Store[];
  searchQuery: string;
  setBrands: (brands: Brand[]) => void;
  setStores: (stores: (prevStores: Store[]) => Store[]) => void;
  setSearchQuery: (query: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider
      value={{
        brands,
        stores,
        searchQuery,
        setBrands,
        setStores,
        setSearchQuery,
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
