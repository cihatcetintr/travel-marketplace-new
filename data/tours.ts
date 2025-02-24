export interface Tour {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
  category: string;
  activities: string[];
  features: string[];
  vehicle: string;
  groupSize: number;
  startTime: string;
}

export const tours: Tour[] = [
  {
    id: "1",
    title: "Phi phi, khai islands tour with speedboat full day",
    location: "Rassada Pier/Rassada",
    price: 1400,
    originalPrice: 1820,
    rating: 4.3,
    reviews: 20,
    image: "/images/phi-phi.jpg",
    discount: 30,
    category: "Island Tour",
    activities: ["Swimming", "Snorkeling"],
    features: ["Transfer", "Halal Food"],
    vehicle: "Speedboat",
    groupSize: 40,
    startTime: "09:00"
  },
  {
    id: "2",
    title: "Elephant Sanctuary Tour",
    location: "Phuket",
    price: 2500,
    originalPrice: 3000,
    rating: 4.7,
    reviews: 45,
    image: "/images/elephant-sanctuary.jpg",
    discount: 15,
    category: "Land Tour",
    activities: ["Elephant Care", "Feeding"],
    features: ["Transfer", "Vegetarian Food", "Guide"],
    vehicle: "Minivan",
    groupSize: 15,
    startTime: "08:00"
  },
  {
    id: "3",
    title: "James Bond Island Tour",
    location: "Phang Nga Bay",
    price: 1800,
    originalPrice: 2200,
    rating: 4.5,
    reviews: 32,
    image: "/images/james-bond.jpg",
    discount: 20,
    category: "Island Tour",
    activities: ["Kayaking", "Swimming"],
    features: ["Transfer", "Lunch", "Guide"],
    vehicle: "Speedboat",
    groupSize: 30,
    startTime: "07:30"
  },
  // Daha fazla tur eklenebilir...
]; 