import { Brand, ProductData, Store } from "../context/SearchContext";

type RawRecord = Record<string, unknown>;

export function normalizeProduct(raw: RawRecord): ProductData {
  return {
    productName: String(raw.productName ?? raw.product_name ?? "Unknown product"),
    description: String(raw.description ?? ""),
    price: Number(raw.price ?? 0),
    imageUrl: String(raw.imageUrl ?? raw.image_url ?? ""),
    storeName: String(raw.storeName ?? raw.store_name ?? ""),
  };
}

export function normalizeProducts(raw: RawRecord[]): ProductData[] {
  return raw.map(normalizeProduct);
}

export function normalizeBrand(raw: RawRecord): Brand {
  const products = raw.products;
  return {
    brandId: Number(raw.brandId ?? raw.brand_id),
    brandName: String(raw.brandName ?? raw.brand_name ?? ""),
    products: Array.isArray(products) ? normalizeProducts(products) : [],
  };
}

export function normalizeBrands(raw: RawRecord[]): Brand[] {
  return raw.map(normalizeBrand);
}

export function normalizeStore(raw: RawRecord): Store {
  const products = raw.products;
  return {
    storeId: Number(raw.storeId ?? raw.store_id),
    storeName: String(raw.storeName ?? raw.store_name ?? ""),
    products: Array.isArray(products) ? normalizeProducts(products) : [],
  };
}

export function normalizeStores(raw: RawRecord[]): Store[] {
  return raw.map(normalizeStore);
}
