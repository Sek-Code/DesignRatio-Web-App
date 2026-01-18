export const cartData = {
  user_id: "USER_001",
  items: [
    // 1) Ready Tea
    {
      item_id: "CARTITEM_001",
      product_type: "ready",
      product_id: "READY_002",              // Taiwanese Oolong Tea
      variant_id: "READY_002_M",
      quantity: 2,
      unit_price: 150,
      line_total: 300
    },

    // 2) Ready Tea (อีกตัว)
    {
      item_id: "CARTITEM_002",
      product_type: "ready",
      product_id: "READY_005",              // Earl Grey Tea
      variant_id: "READY_005_L",
      quantity: 1,
      unit_price: 300,
      line_total: 300
    },

    // 3) Custom Tea
    {
      item_id: "CARTITEM_003",
      product_type: "custom",
      product_id: "TEABASE_BLACK",
      variant_id: "TEABASE_BLACK_M",
      selected_ingredient_ids: ["ING_MINT", "ING_LEMON_GRASS"],
      quantity: 1,
      unit_price: 50,   // 20 (Black) + 10 + 20
      line_total: 50
    },

    // 4) Custom Tea (อีกแก้ว)
    {
      item_id: "CARTITEM_004",
      product_type: "custom",
      product_id: "TEABASE_OOLONG",
      variant_id: "TEABASE_OOLONG_L",
      selected_ingredient_ids: ["ING_BERGAMOT", "ING_CINNAMON"],
      quantity: 2,
      unit_price: 60,   // 30 + 30
      line_total: 120
    }
  ],
  grandTotal: 770,
  updated_at: "2026-01-15T03:30:00.000Z"
};
