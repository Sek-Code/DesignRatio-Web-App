export const revenue =  [
  {
    month: "2025-01",
    totalOrders: 320,
    totalRevenue: 48500,
    totalItemsSold: 910,
    averageOrderValue: 151.56,
    newCustomers: 78,
    returningCustomers: 242
  },
  {
    month: "2025-02",
    totalOrders: 280,
    totalRevenue: 43200,
    totalItemsSold: 840,
    averageOrderValue: 154.29,
    newCustomers: 65,
    returningCustomers: 215
  },
  {
    month: "2025-03",
    totalOrders: 350,
    totalRevenue: 52800,
    totalItemsSold: 1020,
    averageOrderValue: 150.86,
    newCustomers: 92,
    returningCustomers: 258
  },
  {
    month: "2025-04",
    totalOrders: 300,
    totalRevenue: 47100,
    totalItemsSold: 890,
    averageOrderValue: 157.00,
    newCustomers: 70,
    returningCustomers: 230
  },
  {
    month: "2025-05",
    totalOrders: 390,
    totalRevenue: 61200,
    totalItemsSold: 1180,
    averageOrderValue: 156.92,
    newCustomers: 110,
    returningCustomers: 280
  },
  {
    month: "2025-06",
    totalOrders: 420,
    totalRevenue: 65800,
    totalItemsSold: 1250,
    averageOrderValue: 156.67,
    newCustomers: 125,
    returningCustomers: 295
  }
]


export const monthlySalesAnalysis = [
  {
    key: "totalOrders",
    name: "Total orders",
    current: 420,
    previous: 390,
    diff: 30,
    percentChange: 7.69,
    trend: "up",
    Classifier: "Orders",
    
  },
  {
    key: "totalRevenue",
    name: "Total revenue",
    current: 65800 ,
    Classifier: "THB",
    previous: 61200,
    diff: 4600,
    percentChange: 7.52,
    trend: "up"
  },
  {
    key: "totalItemsSold",
    name: "Total items sold",
    current: 1250,
    previous: 1180,
    diff: 70,
    percentChange: 5.93,
    trend: "up",
    Classifier: "Items",
  },
  {
    key: "averageOrderValue",
    name: "Average order value",
    current: 156.67,
    previous: 156.92,
    diff: -0.25,
    percentChange: -0.16,
    trend: "down",
    Classifier: "THB",
  },
  {
    key: "newCustomers",
    name: "New customers",
    current: 125,
    previous: 110,
    diff: 15,
    percentChange: 13.64,
    trend: "up",
    Classifier: "Customers",
  },
  {
    key: "returningCustomers",
    name: "Returning customers",
    current: 295,
    previous: 280,
    diff: 15,
    percentChange: 5.36,
    trend: "up",
    Classifier: "Customers",
  }
]
