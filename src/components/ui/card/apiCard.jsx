import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";

export function useProducts() {
  const { products, loadProducts } = useProductStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return products;
}
