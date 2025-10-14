import { Product } from "@/app/types";
import { Gift, Package, Truck, Sparkles } from "lucide-react";

export const products: Product[] = [
  {
    id: 1,
    name: "Bulk Hair Bundle",
    price: 13310,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/bulk-hair-bundle1.jpeg",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/bulk-hair-bundle1.jpeg",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/bulk-hair-bundle2.jpeg"
    ],
    colors: ["Black", "Brown", "Blonde", "Auburn"],
    sizes: ['14"', '18"', '22"', '26"'],
    category: "straight",
    isBestseller: true,
    description: "Premium quality bulk hair bundles perfect for professional styling. Made from 100% human hair with natural texture and shine. Ideal for creating custom wigs, extensions, and various hairstyles. Can be colored, styled, and heat-treated just like your natural hair."
  },
  {
    id: 2,
    name: "Machine Weft Bundle",
    price: 12070,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/machine-weft-bundle1.png",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/machine-weft-bundle1.png",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/machine-weft-bundle2.png"
    ],
    colors: ["Black", "Brown", "Honey Blonde"],
    sizes: ['16"', '20"', '24"'],
    category: "wavy",
    isNew: true,
    description: "Luxurious machine weft hair bundles featuring soft, wavy texture. Double-stitched wefts ensure durability and minimal shedding. Easy to install and blend seamlessly with natural hair. Perfect for adding volume and length with a natural-looking finish."
  },
  {
    id: 3,
    name: "Lace Closer",
    price: 7630,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closer1.png",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closer1.png",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closer2.png"
    ],
    colors: ["Black", "Dark Brown", "Chestnut"],
    sizes: ['14"', '18"', '22"'],
    category: "curly",
    isBestseller: true,
    description: "Premium lace closure piece for creating a natural-looking hairline and part. Made with high-quality Swiss lace that blends invisibly with your scalp. Features pre-plucked hairline and baby hairs for a realistic appearance. Perfect for completing your hair extension look with a flawless finish."
  },
  {
    id: 4,
    name: "Lace Frontal",
    price: 12510,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal1.jpg",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal1.jpg",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal2.jpg"
    ],
    colors: ["Black", "Brown", "Blonde", "Red"],
    sizes: ['18"', '22"', '26"'],
    category: "wavy",
    isNew: true,
    description: "13x4 ear-to-ear lace frontal for versatile styling options. Create natural-looking hairlines and part your hair anywhere you desire. Made with transparent HD lace for seamless blending. Pre-plucked with baby hairs and bleached knots for an ultra-realistic appearance."
  },
  {
    id: 5,
    name: "Full Lace Wig",
    price: 35499,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/full-lace-wig.jpg",
    colors: ["Black", "Brown", "Ombre"],
    sizes: ['16"', '20"', '24"'],
    category: "wavy",
    description: "Luxurious full lace wig hand-crafted with premium human hair. Complete 360-degree lace cap allows for versatile styling including high ponytails and updos. Adjustable straps and combs ensure secure, comfortable fit. Pre-styled and ready to wear with minimal customization needed."
  },
  {
    id: 6,
    name: "Alopecia Wig",
    price: 43899,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/alopecia-wig.jpg",
    colors: ["Black", "Dark Brown"],
    sizes: ['14"', '18"', '22"'],
    category: "straight",
    description: "Medical-grade wig specially designed for those experiencing hair loss or alopecia. Features breathable, soft cap construction for all-day comfort. Ultra-realistic hairline with hand-tied strands creates an undetectable appearance. Hypoallergenic materials suitable for sensitive scalps."
  },
  {
    id: 7,
    name: "Mens Premium Hair Toppers",
    price: 4999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/men-patch1.png",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/men-patch1.png",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/men-patch2.png"
    ],
    colors: ["Black", "Brown", "Gray"],
    sizes: ["S", "M", "L"],
    category: "mans",
    isBestseller: true,
    isMans: true,
    description: "Discreet and natural-looking hair topper designed specifically for men. Perfect for covering thinning areas or bald spots. Features breathable base with secure clips for all-day wear. Blends seamlessly with existing hair and can be styled with heat tools."
  },
  {
    id: 8,
    name: "Gents Patch",
    price: 5999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/old-men-patch1.png",
    images: [
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/old-men-patch1.png",
      "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/old-men-patch2.png"
    ],
    colors: ["Black", "Brown", "Blonde"],
    sizes: ["S", "M", "L"],
    category: "mans",
    isNew: true,
    isMans: true,
    description: "Complete hair replacement system for men featuring advanced attachment technology. Ultra-thin polyurethane base creates an invisible hairline. Can be worn during sports, swimming, and daily activities. Easy to maintain and style, providing confidence and natural appearance."
  },
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
