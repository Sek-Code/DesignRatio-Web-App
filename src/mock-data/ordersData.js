export const orders = [
  {
    _id: "ORDER_12ACDF55",
    order_code: "12ACDF55",

    user_id: "USER_001",

    order_items: [
      // READY
      {
        item_type: "ready",
        product_id: "READY_002",
        variant_id: "READY_002_L",
        quantity: 2,
        unit_price: 280,
        line_total: 560,
      },

      // CUSTOM
      {
        item_type: "custom",
        tea_base_product_id: "TEABASE_GREEN",
        tea_base_variant_id: "TEABASE_GREEN_S",
        selected_ingredient_ids: ["ING_JASMINE", "ING_CHAMOMILE", "ING_APPLE", "ING_PEACH"],
        quantity: 1,

        unit_price: 110,
        line_total: 110,
      },
    ],

    delivery: {
      method_id: "DELIVERY_A",
      status: "preparing",
      fee: 50 ,
    },

    payment: {
      method_id: "QR_CODE",
      status: "paid",
    },

    summary: {
      items_subtotal: 670,
      delivery_fee: 50,
      grandTotal: 720,
    },

    created_at: "2026-01-17T03:30:00.000Z",
    updated_at: "2026-01-17T03:30:00.000Z",
  },

  {
    _id: "ORDER_8F31B2AA",
    order_code: "8F31B2AA",

    user_id: "USER_002",

    order_items: [
      {
        item_type: "ready",
        product_id: "READY_005",
        variant_id: "READY_005_M",
        quantity: 1,
        unit_price: 160,
        line_total: 160,
      },
      {
        item_type: "custom",
        tea_base_product_id: "TEABASE_OOLONG",
        tea_base_variant_id: "TEABASE_OOLONG_M",
        selected_ingredient_ids: ["ING_MINT", "ING_BERGAMOT", "ING_CINNAMON"],
        quantity: 2,
        unit_price: 100,
        line_total: 200,
      },
    ],

    delivery: { method_id: "DELIVERY_C", status: "shipping", fee: 80 },
    payment: { method_id: "CREDIT_CARD", status: "paid" },

    summary: { items_subtotal: 360, delivery_fee: 80, grandTotal: 440 },

    created_at: "2026-01-16T10:05:00.000Z",
    updated_at: "2026-01-16T10:05:00.000Z",
  },
];
