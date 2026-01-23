import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { fetchAllProducts } from "@/api/productApi";
import { useCartStore } from "@/store/cartStore";

import BlendingIntro from "./BlendingIntro";
import BlendingSteps from "./BlendingSteps";
import ListBox1 from "./ListBox1";
import ListBox2 from "./ListBox2";
import ListBox3 from "./ListBox3";

const SIZE_SURCHARGE = {
  "size-s": 50,
  "size-m": 70,
  "size-l": 100,
};

const BASE_SURCHARGE = {
  "black-tea": 20,
  "green-tea": 20,
  "oolong-tea": 30,
  "white-tea": 30,
};

const normalizeKey = (s) => (s || "").toString().trim().toLowerCase();

const CATEGORY_NAME_MAP = {
  herbs: new Set(
    [
      "jasmine",
      "rose petals",
      "mint",
      "chamomile",
      "chrysanthemum",
      "lavender",
      "lemon grass",
    ].map(normalizeKey)
  ),
  spices: new Set(
    [
      "cinnamon",
      "cloves",
      "cardamon",
      "ginger",
      "star anise",
      "nutmeg",
      "black pepper",
    ].map(normalizeKey)
  ),
  fruits: new Set(
    [
      "bergamot",
      "apple",
      "peach",
      "lemon peel",
      "orange peel",
      "cranberry",
      "raspberry",
    ].map(normalizeKey)
  ),
};

const categorizeIngredient = (name) => {
  const key = normalizeKey(name);
  if (CATEGORY_NAME_MAP.herbs.has(key)) return "herbs";
  if (CATEGORY_NAME_MAP.spices.has(key)) return "spices";
  if (CATEGORY_NAME_MAP.fruits.has(key)) return "fruits";
  return "other";
};

export default function BlendingPage() {
  const maxIngredients = 4;

  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBase, setSelectedBase] = useState(null);

  const [ingredientGroups, setIngredientGroups] = useState({
    herbs: [],
    spices: [],
    fruits: [],
  });
  const [ingredientsLoading, setIngredientsLoading] = useState(false);
  const [ingredientsError, setIngredientsError] = useState(null);

  const addCustomToCart = useCartStore((state) => state.addCustomToCart);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const loadIngredients = async () => {
      setIngredientsLoading(true);
      setIngredientsError(null);

      try {
        const res = await fetchAllProducts({ type: "ingredient" });
        const products = res?.data || [];
        const ingredients = products.filter((p) => p?.type === "ingredient");

        const next = { herbs: [], spices: [], fruits: [] };

        for (const p of ingredients) {
          const id = p?.referencename || p?._id;
          if (!id) continue;

          const item = {
            id,
            name: p?.name || id,
            price: Number(p?.price ?? 0),
          };

          const cat = categorizeIngredient(item.name);
          if (cat === "herbs") next.herbs.push(item);
          else if (cat === "spices") next.spices.push(item);
          else if (cat === "fruits") next.fruits.push(item);
        }

        // Keep display order stable (same as design)
        const sortByNameOrder = (order) => {
          const idx = new Map(order.map((n, i) => [normalizeKey(n), i]));
          return (a, b) => (idx.get(normalizeKey(a.name)) ?? 999) - (idx.get(normalizeKey(b.name)) ?? 999);
        };

        next.herbs.sort(
          sortByNameOrder([
            "Jasmine",
            "Rose Petals",
            "Mint",
            "Chamomile",
            "Chrysanthemum",
            "Lavender",
            "Lemon Grass",
          ])
        );
        next.spices.sort(
          sortByNameOrder([
            "Cinnamon",
            "Cloves",
            "Cardamon",
            "Ginger",
            "Star Anise",
            "Nutmeg",
            "Black Pepper",
          ])
        );
        next.fruits.sort(
          sortByNameOrder([
            "Bergamot",
            "Apple",
            "Peach",
            "Lemon Peel",
            "Orange Peel",
            "Cranberry",
            "Raspberry",
          ])
        );

        if (!cancelled) {
          setIngredientGroups(next);
        }
      } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Failed to load ingredients";
        if (!cancelled) setIngredientsError(message);
      } finally {
        if (!cancelled) setIngredientsLoading(false);
      }
    };

    loadIngredients();

    return () => {
      cancelled = true;
    };
  }, []);

  const allIngredients = useMemo(
    () => [...ingredientGroups.herbs, ...ingredientGroups.spices, ...ingredientGroups.fruits],
    [ingredientGroups]
  );

  const ingredientById = useMemo(() => {
    const map = new Map();
    for (const ing of allIngredients) map.set(ing.id, ing);
    return map;
  }, [allIngredients]);

  const toggleItem = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= maxIngredients) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const totalPrice = useMemo(() => {
    let total = 0;

    if (selectedItems.length > 0) {
      total = 100;

      selectedItems.forEach((itemId) => {
        const ingredient = ingredientById.get(itemId);
        if (ingredient) {
          total += ingredient.price;
        }
      });
    }

    if (selectedSize && SIZE_SURCHARGE[selectedSize]) {
      total += SIZE_SURCHARGE[selectedSize];
    }

    if (selectedBase && BASE_SURCHARGE[selectedBase]) {
      total += BASE_SURCHARGE[selectedBase];
    }

    return total;
  }, [selectedItems, selectedSize, selectedBase, ingredientById]);

  const selectedNames = useMemo(() => {
    return selectedItems.map((id) => ingredientById.get(id)?.name || id);
  }, [selectedItems, ingredientById]);

  const handleAddBlend = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least 1 ingredient");
      return;
    }

    const customProduct = {
      _id: `custom-blend-${Date.now()}`,
      name: `Custom Blend (${selectedNames.join(", ")})`,
      type: "custom",
      price: totalPrice,
      ingredients: selectedItems,
      ingredientNames: selectedNames,
      teaBase: selectedBase,
      teaSize: selectedSize,
      image: "/teaImageData/custom-blend.jpg",
      size: "M",
    };

    addCustomToCart(customProduct, quantity);
    alert("✓ Added to cart! Redirecting...");

    setSelectedItems([]);
    setQuantity(1);
    setTimeout(() => navigate("/checkout"), 1000);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-7 px-10 py-10 mb-10 lg:px-37.5">
      <BlendingIntro />
      <BlendingSteps onSizeChange={setSelectedSize} onBaseChange={setSelectedBase} />

      <h3
        className="w-full text-left text-2xl font-bold mb-4 lg:text-2xl"
        style={{ color: "var(--color-brown)", fontFamily: "var(--font-body)" }}
      >
        Step 3: Choose Your Ingredients ({selectedItems.length}/{maxIngredients})
      </h3>

      {ingredientsError && (
        <div className="w-full max-w-3xl rounded-md bg-red-50 text-red-700 px-4 py-3">
          {ingredientsError}
        </div>
      )}

      <div className="flex flex-col justify-center items-center gap-y-5 lg:flex-row lg:gap-x-5">
        <div>
          <ListBox1
            title="Herbs"
            items={ingredientGroups.herbs}
            selectedItems={selectedItems}
            onToggle={toggleItem}
            max={maxIngredients}
          />
        </div>
        <div>
          <ListBox2
            title="Spices"
            items={ingredientGroups.spices}
            selectedItems={selectedItems}
            onToggle={toggleItem}
            max={maxIngredients}
          />
        </div>
        <div>
          <ListBox3
            title="Fruits"
            items={ingredientGroups.fruits}
            selectedItems={selectedItems}
            onToggle={toggleItem}
            max={maxIngredients}
          />
        </div>
      </div>

      {ingredientsLoading && (
        <div className="text-sm text-gray-500">Loading ingredients...</div>
      )}

      <div className="gap-y-1 text-gray-400 lg:text-xl flex flex-col justify-center items-center pl-5">
        <p>
          ** When it comes to herbs, less is more. Adding too much causes a tea to have a very unpleasant flavor
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 border-2 w-full max-w-md">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#411D03]">Price:</span>
            <span className="text-lg font-bold text-[#411D03]">{totalPrice} THB</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#411D03]">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex items-center justify-center w-7 h-7 rounded-full border border-[#411D03] text-[#411D03] hover:bg-[#411D03] hover:text-white transition"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex items-center justify-center w-7 h-7 rounded-full border border-[#411D03] text-[#411D03] hover:bg-[#411D03] hover:text-white transition"
              >
                +
              </button>
            </div>
          </div>

          <Button className="w-full bg-[#411D03] text-white font-bold py-3" onClick={handleAddBlend}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
