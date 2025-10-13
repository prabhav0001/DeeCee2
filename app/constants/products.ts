import { Product } from "@/app/types";
import { Gift, Package, Truck, Sparkles } from "lucide-react";

export const products: Product[] = [
  { id: 1, name: "Bulk Hair Bundle", price: 13310, image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/bulk-hair-bundle.jpg", colors: ["Black", "Brown", "Blonde", "Auburn"], sizes: ['14"', '18"', '22"', '26"'], category: "straight", isBestseller: true },
  { id: 2, name: "Machine Weft Bundle", price: 12070, image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/machine-weft-bundle.jpg", colors: ["Black", "Brown", "Honey Blonde"], sizes: ['16"', '20"', '24"'], category: "wavy", isNew: true },
  { id: 3, name: "Lace Closer", price: 7630, image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closer.jpg", colors: ["Black", "Dark Brown", "Chestnut"], sizes: ['14"', '18"', '22"'], category: "curly", isBestseller: true },
  { id: 4, name: "Lace Frontal", price: 12510, image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal.jpg", colors: ["Black", "Brown", "Blonde", "Red"], sizes: ['18"', '22"', '26"'], category: "wavy", isNew: true },
  { id: 5, name: "Full Lace Wig", price: 35499, image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/full-lace-wig.jpg", colors: ["Black", "Brown", "Ombre"], sizes: ['16"', '20"', '24"'], category: "wavy" },
  { id: 6, name: "Alopecia Wig", price: 43899, image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/alopecia-wig.jpg", colors: ["Black", "Dark Brown"], sizes: ['14"', '18"', '22"'], category: "straight" },
  { id: 7, name: "Mens Premium Hair Toppers", price: 4999, image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/mens-premium-hair-toppers.jpg", colors: ["Black", "Brown", "Gray"], sizes: ["S", "M", "L"], category: "mans", isBestseller: true, isMans: true },
  { id: 8, name: "Mens Hair Replacement System", price: 5999, image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=400&q=80", colors: ["Black", "Brown", "Blonde"], sizes: ["S", "M", "L"], category: "mans", isNew: true, isMans: true },
];

export const promoMessages = [
  { text: "Sign up and Get 5% OFF on your 1st order", icon: Gift },
  { text: "COD AVAILABLE", icon: Package },
  { text: "Free Shipping on Orders Above ₹5000", icon: Truck },
  { text: "Premium Quality Hair Extensions", icon: Sparkles },
];

export const heroSlides = [
  { image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/hero1.jpg", title: "Luxurious Hair", subtitle: "Extensions", description: "Transform your look with our premium collection" },
  { image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/hero2.jpg", title: "Natural Beauty", subtitle: "Redefined", description: "100% human hair for the perfect blend" },
  { image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/hero3.jpg", title: "Premium Quality", subtitle: "Guaranteed", description: "Silky smooth textures that last" },
  { image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/hero4.jpg", title: "Your Style", subtitle: "Elevated", description: "From straight to curly, we have it all" },
  { image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/hero5.jpg", title: "Confidence", subtitle: "Unleashed", description: "Feel beautiful every single day" },
];

export const reelsVideos = [
  { id: 1, src: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/videos/reel1.mp4", description: "Silky Straight Transformation" },
  { id: 2, src: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/videos/reel2.mp4", description: "Wavy Hair Styling Tips" },
  { id: 3, src: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/videos/reel3.mp4", description: "Curly Hair Care Routine" },
  { id: 4, src: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/videos/reel5.mp4", description: "Deep Wave Extensions Look" },
];
