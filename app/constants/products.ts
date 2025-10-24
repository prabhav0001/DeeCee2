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
    name: "Lace Frontel Wig",
    price: 43899,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/alopecia-wig.jpg",
    colors: ["Black", "Dark Brown"],
    sizes: ['14"', '18"', '22"'],
    category: "straight",
    description: "Medical-grade wig specially designed for those experiencing hair loss or alopecia. Features breathable, soft cap construction for all-day comfort. Ultra-realistic hairline with hand-tied strands creates an undetectable appearance. Hypoallergenic materials suitable for sensitive scalps."
  },
  {
    id: 9,
    name: "Side Patches Clip-Ins",
    price: 3499,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/side-patches-clip.jpg",
    colors: ["Black", "Brown", "Blonde", "Auburn"],
    sizes: ['10"', '12"', '14"'],
    category: "straight",
    description: "Specially designed clip-in patches for targeted volume at the sides. Perfect for adding thickness and coverage to temple areas. Easy to apply and remove with secure clips. Blends naturally with your own hair for seamless integration."
  },
  {
    id: 10,
    name: "V Shape Clip-Ins",
    price: 4299,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/v-shape-clip.jpg",
    colors: ["Black", "Brown", "Honey Blonde", "Auburn"],
    sizes: ['14"', '18"', '22"'],
    category: "wavy",
    description: "Innovative V-shaped clip-in extensions for natural-looking length and volume. Unique design creates seamless layering effect. Made from premium human hair that can be styled with heat tools. Secure clips ensure comfortable all-day wear."
  },
  {
    id: 11,
    name: "Volumizers",
    price: 5999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/volumizers.jpg",
    colors: ["Black", "Dark Brown", "Brown", "Blonde"],
    sizes: ['12"', '14"', '16"'],
    category: "straight",
    isBestseller: true,
    description: "Crown volumizer topper for instant lift and fullness at the crown area. Ideal for those experiencing thinning hair or wanting extra volume. Lightweight construction with breathable base. Clips securely in place and blends seamlessly with natural hair."
  },
  {
    id: 12,
    name: "I Tips Extensions",
    price: 8999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/i-tips.jpg",
    colors: ["Black", "Brown", "Blonde", "Auburn"],
    sizes: ['16"', '20"', '24"', '26"'],
    category: "straight",
    description: "Micro-bead I-tip hair extensions for semi-permanent installation. Each strand features a small I-shaped tip for secure attachment. Provides natural movement and can last 3-4 months with proper care. Comes in bundles of 20 strands per pack."
  },
  {
    id: 13,
    name: "U Tips Extensions",
    price: 9499,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/u-tips.jpg",
    colors: ["Black", "Brown", "Honey Blonde", "Ombre"],
    sizes: ['18"', '22"', '26"'],
    category: "wavy",
    isNew: true,
    description: "Pre-bonded U-tip extensions with keratin fusion technology. U-shaped tip allows for strong, long-lasting bonds. Creates natural-looking volume and length. Professional application recommended for best results. Each pack contains 25 strands."
  },
  {
    id: 14,
    name: "Flat Tips Extensions",
    price: 9999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/flat-tips.jpg",
    colors: ["Black", "Dark Brown", "Brown", "Blonde"],
    sizes: ['16"', '20"', '24"'],
    category: "straight",
    description: "Innovative flat-tip extensions designed for maximum comfort and discreet wear. Ultra-flat keratin bonds lay flat against the scalp. Ideal for fine to medium hair textures. Durable and can be reused with proper maintenance. Pack of 20 strands."
  },
  {
    id: 15,
    name: "Lace Closure 4x4",
    price: 6999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closure-4x4.jpg",
    colors: ["Black", "Brown", "Blonde"],
    sizes: ['12"', '14"', '16"', '18"'],
    category: "curly",
    isBestseller: true,
    description: "Classic 4x4 lace closure piece for natural-looking part and hairline. Swiss lace base provides breathability and comfort. Pre-plucked with baby hairs for realistic appearance. Perfect for completing sew-in installations or creating protective styles."
  },
  {
    id: 16,
    name: "Lace Closure 5x5",
    price: 7999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closure-5x5.jpg",
    colors: ["Black", "Brown", "Auburn", "Blonde"],
    sizes: ['14"', '16"', '18"', '20"'],
    category: "wavy",
    description: "Larger 5x5 lace closure offering more parting space and versatility. HD transparent lace melts seamlessly into all skin tones. Bleached knots for undetectable appearance. Allows for center, side, and various parting styles."
  },
  {
    id: 17,
    name: "Lace Closure 6x6",
    price: 8999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closure-6x6.jpg",
    colors: ["Black", "Dark Brown", "Honey Blonde"],
    sizes: ['16"', '18"', '20"', '22"'],
    category: "straight",
    isNew: true,
    description: "Premium 6x6 lace closure providing maximum parting versatility. Extra coverage area allows for deep side parts and various styling options. Hand-tied knots for natural scalp appearance. Pre-plucked hairline ready to install."
  },
  {
    id: 18,
    name: "Lace Frontal 13x4",
    price: 11999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal-13x4.jpg",
    colors: ["Black", "Brown", "Blonde", "Auburn"],
    sizes: ['14"', '16"', '18"', '20"', '22"'],
    category: "straight",
    isBestseller: true,
    description: "Standard 13x4 ear-to-ear lace frontal for complete hairline coverage. Creates natural-looking baby hairs and edges. Transparent HD lace for seamless blending. Allows for versatile styling including slicked-back looks and high ponytails."
  },
  {
    id: 19,
    name: "Lace Frontal 13x5",
    price: 12999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal-13x5.jpg",
    colors: ["Black", "Brown", "Ombre"],
    sizes: ['16"', '18"', '20"', '22"'],
    category: "wavy",
    description: "Extended 13x5 lace frontal with deeper parting space. Offers more styling versatility than standard 13x4. Pre-plucked hairline with bleached knots. Perfect for those who want more flexibility in parting and styling options."
  },
  {
    id: 20,
    name: "Lace Frontal 13x6",
    price: 13999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal-13x6.jpg",
    colors: ["Black", "Dark Brown", "Honey Blonde"],
    sizes: ['18"', '20"', '22"', '24"'],
    category: "curly",
    isNew: true,
    description: "Premium 13x6 lace frontal with maximum depth for ultimate parting freedom. Create deep side parts, middle parts, or any style you desire. HD lace construction for invisible hairline. Hand-tied for natural movement and realistic appearance."
  },
  {
    id: 21,
    name: "Clip-In Extensions Set",
    price: 5499,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/clip-in-extensions.jpg",
    colors: ["Black", "Brown", "Blonde", "Auburn", "Ombre"],
    sizes: ['14"', '18"', '22"', '26"'],
    category: "straight",
    isBestseller: true,
    description: "Complete 7-piece clip-in extension set for instant length and volume. Includes various weft sizes for full coverage. Easy to apply and remove in minutes. Made from premium Remy human hair. Comes with storage case for convenient travel."
  },
  {
    id: 22,
    name: "Lace Closure Wig",
    price: 18999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-closure-wig.jpg",
    colors: ["Black", "Brown", "Blonde", "Auburn"],
    sizes: ['14"', '16"', '18"', '20"', '22"'],
    category: "wavy",
    isBestseller: true,
    description: "Ready-to-wear lace closure wig with 4x4 or 5x5 closure. Pre-styled and pre-plucked for natural appearance. Adjustable straps and secure combs for comfortable fit. Ideal for beginners and those wanting a quick, natural-looking style."
  },
  {
    id: 23,
    name: "Lace Frontal Wig",
    price: 24999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/lace-frontal-wig.jpg",
    colors: ["Black", "Brown", "Honey Blonde", "Ombre"],
    sizes: ['16"', '18"', '20"', '22"', '24"'],
    category: "straight",
    isNew: true,
    description: "Premium lace frontal wig with 13x4 HD lace. Ear-to-ear coverage allows for versatile styling. Pre-plucked baby hairs and bleached knots. Adjustable cap with elastic bands and combs. Can be styled in high ponytails and updos."
  },
  {
    id: 24,
    name: "Full Lace Wig Premium",
    price: 39999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/full-lace-wig-premium.jpg",
    colors: ["Black", "Brown", "Blonde", "Auburn"],
    sizes: ['14"', '16"', '18"', '20"', '22"', '24"'],
    category: "curly",
    isBestseller: true,
    description: "Luxury full lace wig with complete 360-degree lace construction. Hand-tied for maximum realism and natural movement. Allows for any parting style and high ponytails. Breathable cap for all-day comfort. Pre-styled and ready to wear."
  },
  {
    id: 25,
    name: "Alopecia Wig Medical Grade",
    price: 29999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/alopecia-wig-medical.jpg",
    colors: ["Black", "Dark Brown", "Brown", "Gray"],
    sizes: ['12"', '14"', '16"', '18"'],
    category: "straight",
    description: "Specialized medical-grade wig for alopecia and hair loss patients. Ultra-soft, hypoallergenic cap gentle on sensitive scalps. Lightweight construction for extended wear. Realistic hairline with undetectable lace. Provides confidence and natural appearance."
  },
  {
    id: 26,
    name: "Jewish Wig (Sheitel)",
    price: 34999,
    image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/jewish-wig.jpg",
    colors: ["Black", "Dark Brown", "Brown", "Auburn"],
    sizes: ['14"', '16"', '18"', '20"', '22"'],
    category: "wavy",
    description: "Premium kosher-certified Jewish wig (Sheitel) meeting religious standards. 100% European human hair for luxurious quality. Natural-looking hairline with hand-tied construction. Comfortable cap designed for all-day wear. Available in various lengths and colors to match your preference."
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
  { text: "100% Premium Human Hair Extensions - Authentic Quality", icon: Sparkles },
  { text: "Trusted by Thousands of Happy Customers Across India", icon: Sparkles },
  { text: "Expert Styling Consultation Available - Book Your Appointment", icon: Gift },
  { text: "Can Be Colored, Styled & Heat-Treated Like Natural Hair", icon: Sparkles },
  { text: "Fast & Secure Delivery - We Ship Pan India", icon: Truck },
  { text: "All Products Come With Quality Assurance", icon: Package },
  { text: "From Straight to Curly - Perfect Match for Every Style", icon: Sparkles },
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
