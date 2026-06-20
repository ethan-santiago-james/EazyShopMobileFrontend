import { createContext, useContext, useState, ReactNode } from "react";

export type Brand = {
  brandId: number;
  brandName: string;
};

export type Store = {
  storeId: number;
  storeName: string;
};

type SearchContextType = {
  brands: Brand[];
  stores: Store[];
  setBrands: (brands: Brand[]) => void;
  setStores: (stores: Store[]) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [stores, setStores] = useState<Store[]>([]);

  return (
    <SearchContext.Provider
      value={{
        brands,
        stores,
        setBrands,
        setStores,
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