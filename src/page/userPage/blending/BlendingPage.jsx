import ListBox1 from "./ListBox1";
import ListBox2 from "./ListBox2";
import ListBox3 from "./ListBox3";
import BlendingIntro from "./BlendingIntro";
import BlendingSteps from "./BlendingSteps";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { useCartStore } from "@/store/cartStore";
import { useNavigate } from "react-router-dom";

// Ingredient data mapped to ListBox IDs
const INGREDIENT_DATA = {
  herbs: [
    { id: 'herb-jasmine', name: 'Jasmine', price: 20 },
    { id: 'herb-rose', name: 'Rose Petals', price: 20 },
    { id: 'herb-mint', name: 'Mint', price: 10 },
    { id: 'herb-chamomile', name: 'Chamomile', price: 30 },
    { id: 'herb-chrysanthemum', name: 'Chrysanthemum', price: 10 },
    { id: 'herb-lavender', name: 'Lavender', price: 40 },
    { id: 'herb-lemongrass', name: 'Lemon Grass', price: 20 },
  ],
  spices: [
    { id: 'spices-cinnamon', name: 'Cinnamon', price: 30 },
    { id: 'spices-cloves', name: 'Cloves', price: 20 },
    { id: 'spices-cardamon', name: 'Cardamon', price: 30 },
    { id: 'spices-ginger', name: 'Ginger', price: 10 },
    { id: 'spices-star anise', name: 'Star Anise', price: 20 },
    { id: 'spices-nutmeg', name: 'Nutmeg', price: 40 },
    { id: 'spices-black pepper', name: 'Black Pepper', price: 20 },
  ],
  fruits: [
    { id: 'fruits-bergamot', name: 'Bergamot', price: 30 },
    { id: 'fruits-apple', name: 'Apple', price: 10 },
    { id: 'fruits-peach', name: 'Peach', price: 30 },
    { id: 'fruits-lemon peel', name: 'Lemon Peel', price: 20 },
    { id: 'fruits-orange peel', name: 'Orange Peel', price: 10 },
    { id: 'fruits-cranberry', name: 'Cranberry', price: 40 },
    { id: 'fruits-raspberry', name: 'Raspberry', price: 40 },
  ]
};

// Size and Base surcharges
const SIZE_SURCHARGE = {
  'size-s': 50,
  'size-m': 70,
  'size-l': 100,
};

const BASE_SURCHARGE = {
  'black-tea': 20,
  'green-tea': 20,
  'oolong-tea': 30,
  'white-tea': 30,
};

// Helper function to find ingredient by ID
const findIngredient = (id) => {
  for (const category of Object.values(INGREDIENT_DATA)) {
    const found = category.find(i => i.id === id);
    if (found) return found;
  }
  return null;
};

export default function BlendingPage() {
  const size = 4;
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBase, setSelectedBase] = useState(null);
  const addCustomToCart = useCartStore((state) => state.addCustomToCart);
  const navigate = useNavigate();

  const toggleItem = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= size) {
        return prev;
      }
      return [...prev, id];
    });
  };

  // useMemo จะ recalculate ทุกครั้ง selectedItems/selectedSize/selectedBase เปลี่ยน
  const totalPrice = useMemo(() => {
    let total = 0;
    
    // ถ้ามี ingredients ให้เพิ่ม base price
    if (selectedItems.length > 0) {
      total = 100;
      
      // เพิ่มราคา ingredients
      selectedItems.forEach((itemId) => {
        const ingredient = findIngredient(itemId);
        if (ingredient) {
          total += ingredient.price;
        }
      });
    }

    // เพิ่มราคา size surcharge (ไม่ว่าจะมี ingredients หรือไม่)
    if (selectedSize && SIZE_SURCHARGE[selectedSize]) {
      total += SIZE_SURCHARGE[selectedSize];
    }

    // เพิ่มราคา base surcharge (ไม่ว่าจะมี ingredients หรือไม่)
    if (selectedBase && BASE_SURCHARGE[selectedBase]) {
      total += BASE_SURCHARGE[selectedBase];
    }

    return total;
  }, [selectedItems, selectedSize, selectedBase]);

  // ค้นหาชื่อของ ingredients ที่เลือก
  const selectedNames = useMemo(() => {
    return selectedItems
      .map(id => {
        const ingredient = findIngredient(id);
        return ingredient?.name || id;
      });
  }, [selectedItems]);

  const handleAddBlend = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least 1 ingredient');
      return;
    }

    const customProduct = {
      _id: `custom-blend-${Date.now()}`,
      name: `Custom Blend (${selectedNames.join(', ')})`,
      type: 'custom',
      price: totalPrice,
      ingredients: selectedItems,
      ingredientNames: selectedNames,
      teaBase: selectedBase,
      teaSize: selectedSize,
      image: '/teaImageData/custom-blend.jpg',
      size: 'M'
    };

    addCustomToCart(customProduct, quantity);
    alert('✓ Added to cart! Redirecting...');
    
    // Clear selection and redirect to cart
    setSelectedItems([]);
    setQuantity(1);
    setTimeout(() => navigate('/checkout'), 1000);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-7 px-10 py-10 mb-10 lg:px-37.5">
      <BlendingIntro />
      <BlendingSteps 
        onSizeChange={setSelectedSize}
        onBaseChange={setSelectedBase}
      />
      <h3 className="w-full text-left text-2xl font-bold mb-4 lg:text-2xl" style={{ color: 'var(--color-brown)', fontFamily: 'var(--font-body)' }}>Step 3: Choose Your Ingredients ({selectedItems.length}/{size})</h3>
      
      <div className="flex flex-col justify-center items-center gap-y-5 lg:flex-row lg:gap-x-5">
        <div><ListBox1 selectedItems={selectedItems} onToggle={toggleItem} max={size} /></div>
        <div><ListBox2 selectedItems={selectedItems} onToggle={toggleItem} max={size} /></div>
        <div><ListBox3 selectedItems={selectedItems} onToggle={toggleItem} max={size} /></div>
      </div>

      <div className="gap-y-1 text-gray-400 lg:text-xl flex flex-col justify-center items-center pl-5">
        <p>** When it comes to herbs, less is more. Adding too much causes a tea to have a very unpleasant flavor</p>
      </div>

      {/* Price & Quantity Control */}
      <div className="bg-white rounded-lg p-6 border-2 border-[#4366CC] w-full max-w-md">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#411D03]">Price:</span>
            <span className="text-lg font-bold text-[#411D03]">{totalPrice} บาท</span>
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

          <Button
            className="w-full bg-[#411D03] text-white font-bold py-3"
            onClick={handleAddBlend}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
