export interface Product {
  id: number
  name: string
  price: number
  oldPrice: number
  image: string
  images: string[]
  category: string
  ageRange: string // Updated to use consistent ageRange field
  age: string // Added age property to match component usage
  description?: string
}

export interface ExtraProduct {
  id: number
  name: string
  price: number
  image: string
}

export const mockProducts: Product[] = [
  // Aventure - Adventure Stories
  {
    id: 1,
    name: "La Princesse et le Dragon Magique",
    price: 120,
    oldPrice: 150,
    image: "/p1.avif",
    images: ["/p1.avif", "/p2.avif", "/p3.avif"], // Added different images for animation
    category: "aventure",
    ageRange: "3-6 ans", // Updated field name
    age: "3-6 ans", // Added age property
    description:
      "Une histoire magique personnalisée où votre petite princesse vit une aventure extraordinaire avec un dragon bienveillant.",
  },
  {
    id: 2,
    name: "L'Aventure de la Fée des Étoiles",
    price: 95,
    oldPrice: 120,
    image: "/p2.avif",
    images: ["/p2.avif", "/p3.avif"], // Added second image
    category: "aventure",
    ageRange: "0-3 ans", // Updated field name
    age: "0-3 ans", // Added age property
    description: "Votre enfant devient l'héroïne d'une aventure féerique parmi les étoiles.",
  },
  {
    id: 3,
    name: "Le Royaume des Licornes",
    price: 80,
    oldPrice: 100,
    image: "/p3.avif",
    images: ["/p3.avif", "/p1.avif"], // Added second image
    category: "sommeil",
    ageRange: "3-6 ans", // Updated field name
    age: "3-6 ans", // Added age property
    description: "Une histoire enchantée dans un royaume peuplé de licornes magiques.",
  },
  {
    id: 4,
    name: "La Ballerine et le Château Enchanté",
    price: 110,
    oldPrice: 140,
    image: "/p1.avif",
    images: ["/p1.avif", "/p2.avif"], // Added second image
    category: "sommeil",
    ageRange: "6 ans et +", // Updated field name
    age: "6 ans et +", // Added age property
    description: "Votre petite danseuse découvre un château magique rempli de surprises.",
  },

  // More Adventure Stories
  {
    id: 5,
    name: "Le Pirate et le Trésor Perdu",
    price: 130,
    oldPrice: 160,
    image: "/p2.avif",
    images: ["/p2.avif", "/p3.avif"], // Added second image
    category: "aventure",
    ageRange: "6 ans et +", // Updated field name
    age: "6 ans et +", // Added age property
    description: "Une aventure palpitante où votre petit pirate part à la recherche d'un trésor légendaire.",
  },
  {
    id: 6,
    name: "L'Explorateur de la Jungle",
    price: 115,
    oldPrice: 145,
    image: "/p3.avif",
    images: ["/p3.avif", "/p1.avif"], // Added second image
    category: "aventure",
    ageRange: "Famille", // Updated field name
    age: "Famille", // Added age property
    description: "Votre enfant devient un courageux explorateur dans une jungle mystérieuse.",
  },
  {
    id: 7,
    name: "Le Chevalier et le Dragon",
    price: 125,
    oldPrice: 155,
    image: "/p1.avif",
    images: ["/p1.avif", "/p2.avif"], // Added second image
    category: "aventure",
    ageRange: "3-6 ans", // Updated field name
    age: "3-6 ans", // Added age property
    description: "Une épopée héroïque où votre petit chevalier affronte un dragon pour sauver le royaume.",
  },
  {
    id: 8,
    name: "L'Astronaute et la Planète Mystérieuse",
    price: 140,
    oldPrice: 170,
    image: "/p2.avif",
    images: ["/p2.avif", "/p3.avif"], // Added second image
    category: "sommeil",
    ageRange: "Famille", // Updated field name
    age: "Famille", // Added age property
    description: "Une aventure spatiale extraordinaire sur une planète pleine de mystères.",
  },
]

export const specialProducts: Product[] = [
  {
    id: 101,
    name: "Mon Aventure Personnalisée",
    price: 120,
    oldPrice: 150,
    image: "/p1.avif",
    images: ["/p1.avif", "/p2.avif", "/p3.avif"], // Added different images
    category: "aventure",
    ageRange: "3-6 ans", // Updated field name
    age: "3-6 ans", // Added age property
    description: "Une histoire unique où votre enfant devient le héros de sa propre aventure magique.",
  },
  {
    id: 102,
    name: "Le Livre des Rêves",
    price: 110,
    oldPrice: 140,
    image: "/p2.avif",
    images: ["/p2.avif", "/p1.avif"], // Added second image
    category: "sommeil",
    ageRange: "0-3 ans", // Updated field name
    age: "0-3 ans", // Added age property
    description: "Des histoires douces et apaisantes pour accompagner votre enfant vers de beaux rêves.",
  },
  {
    id: 103,
    name: "L'Explorateur Courageux",
    price: 130,
    oldPrice: 160,
    image: "/p3.avif",
    images: ["/p3.avif", "/p1.avif"], // Added second image
    category: "aventure",
    ageRange: "6 ans et +", // Updated field name
    age: "6 ans et +", // Added age property
    description: "Votre enfant part à la découverte de mondes extraordinaires dans cette épopée personnalisée.",
  },
  {
    id: 104,
    name: "Ma Famille d'Amour",
    price: 125,
    oldPrice: 155,
    image: "/p1.avif",
    images: ["/p1.avif", "/p2.avif"], // Added second image
    category: "famille",
    ageRange: "Famille", // Updated field name
    age: "Famille", // Added age property
    description: "Une histoire touchante qui célèbre l'amour familial avec votre enfant comme personnage principal.",
  },
]

export const extraProducts: ExtraProduct[] = [
  {
    id: 201,
    name: "Marque-page personnalisé",
    price: 15,
    image: "/ser.png",
  },
  {
    id: 202,
    name: "Autocollants magiques",
    price: 20,
    image: "/ser1.png",
  },
  {
    id: 203,
    name: "Carnet de coloriage",
    price: 25,
    image: "/ser3.png",
  },
  {
    id: 204,
    name: "Pochette cadeau",
    price: 10,
    image: "/ser.png",
  },
  {
    id: 205,
    name: "Certificat héros",
    price: 12,
    image: "/ser1.png",
  },
  {
    id: 206,
    name: "Badge personnalisé",
    price: 18,
    image: "/ser3.png",
  },
  {
    id: 207,
    name: "Carte postale",
    price: 8,
    image: "/ser.png",
  },
  {
    id: 208,
    name: "Mini poster",
    price: 22,
    image: "/ser1.png",
  },
]

export function getProductById(id: number): Product | ExtraProduct | undefined {
  const mainProduct = mockProducts.find((product) => product.id === id)
  if (mainProduct) return mainProduct

  const specialProduct = specialProducts.find((product) => product.id === id)
  if (specialProduct) return specialProduct

  const extraProduct = extraProducts.find((product) => product.id === id)
  return extraProduct
}

export const allProducts = [...mockProducts, ...specialProducts]

export const allExtraProducts = extraProducts
