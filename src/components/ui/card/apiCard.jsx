import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";

export function useProducts() {
  const { products, loadProducts } = useProductStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return products;
}

export function useReadyProducts() {
  const { products, loadProducts } = useProductStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return products.filter((product) => product.type === "ready");
}
