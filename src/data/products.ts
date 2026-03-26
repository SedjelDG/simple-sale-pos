export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
}

export const categories = ["All", "Drinks", "Food", "Snacks", "Desserts"];

export const products: Product[] = [
  { id: "1", name: "Espresso", price: 3.50, category: "Drinks", emoji: "☕" },
  { id: "2", name: "Latte", price: 4.50, category: "Drinks", emoji: "🥛" },
  { id: "3", name: "Cappuccino", price: 4.00, category: "Drinks", emoji: "☕" },
  { id: "4", name: "Iced Tea", price: 3.00, category: "Drinks", emoji: "🧊" },
  { id: "5", name: "Smoothie", price: 5.50, category: "Drinks", emoji: "🥤" },
  { id: "6", name: "Burger", price: 8.99, category: "Food", emoji: "🍔" },
  { id: "7", name: "Sandwich", price: 7.50, category: "Food", emoji: "🥪" },
  { id: "8", name: "Salad", price: 6.99, category: "Food", emoji: "🥗" },
  { id: "9", name: "Pizza Slice", price: 4.50, category: "Food", emoji: "🍕" },
  { id: "10", name: "Pasta", price: 9.99, category: "Food", emoji: "🍝" },
  { id: "11", name: "Chips", price: 2.50, category: "Snacks", emoji: "🍟" },
  { id: "12", name: "Pretzel", price: 3.00, category: "Snacks", emoji: "🥨" },
  { id: "13", name: "Muffin", price: 3.50, category: "Snacks", emoji: "🧁" },
  { id: "14", name: "Cookie", price: 2.00, category: "Snacks", emoji: "🍪" },
  { id: "15", name: "Brownie", price: 3.50, category: "Desserts", emoji: "🍫" },
  { id: "16", name: "Ice Cream", price: 4.00, category: "Desserts", emoji: "🍦" },
  { id: "17", name: "Cheesecake", price: 5.50, category: "Desserts", emoji: "🍰" },
  { id: "18", name: "Donut", price: 2.50, category: "Desserts", emoji: "🍩" },
];
