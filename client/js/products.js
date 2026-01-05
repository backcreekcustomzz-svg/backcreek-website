// All products in one file - easy to edit
const products = [
  {
    id: "bc-001",
    name: "Marine Switch Panel - 6 Gang",
    category: "Switch Panels",
    price: 89.99,
    description: "Premium 6-gang marine switch panel with LED indicators. Waterproof design perfect for boats and marine applications.",
    featured: true,
    options: {
      color: ["Black", "Charcoal Gray"],
      switchCount: ["4 Gang", "6 Gang", "8 Gang"]
    }
  },
  {
    id: "bc-002",
    name: "Universal Phone Mount",
    category: "Mounts",
    price: 34.99,
    description: "Heavy-duty phone mount with 360° rotation. Compatible with all phone sizes. Perfect for boats, golf carts, and ATVs.",
    featured: true,
    options: {
      color: ["Black", "Olive Green"]
    }
  },
  {
    id: "bc-003",
    name: "Boat Cup Holder Set",
    category: "Boat Accessories",
    price: 44.99,
    description: "Stainless steel cup holders with drainage holes. Set of 2. Marine-grade construction resists rust and corrosion.",
    featured: false,
    options: {
      quantity: ["Set of 2", "Set of 4"]
    }
  },
  {
    id: "bc-004",
    name: "Golf Cart Storage Box",
    category: "Golf Cart Accessories",
    price: 79.99,
    description: "Weatherproof storage box for golf carts. Lockable design with ample space for valuables and equipment.",
    featured: true,
    options: {
      size: ["Small", "Medium", "Large"],
      color: ["Black", "Tan"]
    }
  },
  {
    id: "bc-005",
    name: "LED Light Bar - 12\"",
    category: "Boat Accessories",
    price: 129.99,
    description: "High-output LED light bar. Waterproof IP68 rating. Perfect for night navigation and deck lighting.",
    featured: false,
    options: {
      size: ["12 inch", "18 inch", "24 inch"]
    }
  },
  {
    id: "bc-006",
    name: "Marine Switch Panel - 4 Gang",
    category: "Switch Panels",
    price: 69.99,
    description: "Compact 4-gang marine switch panel. LED indicators and waterproof construction.",
    featured: false,
    options: {
      color: ["Black", "Charcoal Gray"]
    }
  },
  {
    id: "bc-007",
    name: "Adjustable Rod Holder",
    category: "Boat Accessories",
    price: 54.99,
    description: "Heavy-duty adjustable fishing rod holder. 360° rotation with secure locking mechanism.",
    featured: false,
    options: {
      color: ["Black", "Gray"]
    }
  },
  {
    id: "bc-008",
    name: "Golf Cart Steering Wheel Cover",
    category: "Golf Cart Accessories",
    price: 24.99,
    description: "Premium leather steering wheel cover. Easy installation, fits most golf cart models.",
    featured: false,
    options: {
      color: ["Black", "Tan", "Brown"]
    }
  },
  {
    id: "bc-009",
    name: "Custom Switch Panel",
    category: "Custom",
    price: 149.99,
    description: "Fully customizable switch panel. Choose your gang count, switch types, and labeling. Contact us for design consultation.",
    featured: true,
    options: {}
  },
  {
    id: "bc-010",
    name: "Tablet Mount with Arm",
    category: "Mounts",
    price: 64.99,
    description: "Flexible tablet mount with adjustable arm. Fits tablets 7-13 inches. Stable and secure mounting.",
    featured: false,
    options: {
      color: ["Black", "Gray"]
    }
  }
];

const categories = [
  "Boat Accessories",
  "Switch Panels",
  "Mounts",
  "Golf Cart Accessories",
  "Custom"
];
