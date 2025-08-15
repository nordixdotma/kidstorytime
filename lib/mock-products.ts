export interface Product {
  id: number
  name: string
  price: number
  oldPrice: number
  image: string
  images: string[]
  category: string
  age: string // Add age variable
  description?: string
}

export const mockProducts: Product[] = [
  // Aventure - Adventure Stories
  {
    id: 1,
    name: "La Princesse et le Dragon Magique",
    price: 120,
    oldPrice: 150,
    image: "/p1.avif",
    images: ["/p1.avif", "/p1.avif", "/p1.avif"],
    category: "aventure",
    age: "3-6 ans",
    description:
      "Une histoire magique personnalisée où votre petite princesse vit une aventure extraordinaire avec un dragon bienveillant.",
  },
  {
    id: 2,
    name: "L'Aventure de la Fée des Étoiles",
    price: 95,
    oldPrice: 120,
    image: "/p1.avif",
    images: ["/p1.avif", "/p1.avif"],
    category: "aventure",
    age: "0-3 ans",
    description: "Votre enfant devient l'héroïne d'une aventure féerique parmi les étoiles.",
  },
  {
    id: 3,
    name: "Le Royaume des Licornes",
    price: 80,
    oldPrice: 100,
    image: "/p1.avif",
    images: ["/p1.avif", "/p1.avif"],
    category: "sommeil",
    age: "3-6 ans",
    description: "Une histoire enchantée dans un royaume peuplé de licornes magiques.",
  },
  {
    id: 4,
    name: "La Ballerine et le Château Enchanté",
    price: 110,
    oldPrice: 140,
    image: "/p1.avif",
    images: ["/p1.avif", "/p1.avif"],
    category: "sommeil",
    age: "6 ans et +",
    description: "Votre petite danseuse découvre un château magique rempli de surprises.",
  },

  // More Adventure Stories
  {
    id: 5,
    name: "Le Pirate et le Trésor Perdu",
    price: 130,
    oldPrice: 160,
    image: "/p1.avif",
    images: ["/p1.avif", "/p1.avif"],
    category: "aventure",
    age: "6 ans et +",
    description: "Une aventure palpitante où votre petit pirate part à la recherche d'un trésor légendaire.",
  },
  {
    id: 6,
    name: "L'Explorateur de la Jungle",
    price: 115,
    oldPrice: 145,
    image: "/p1.avif",
    images: ["/p1.avif", "/p1.avif"],
    category: "aventure",
    age: "Famille",
    description: "Votre enfant devient un courageux explorateur dans une jungle mystérieuse.",
  },
  {
    id: 7,
    name: "Le Chevalier et le Dragon",
    price: 125,
    oldPrice: 155,
    image: "/p1.avif",
    images: ["/p1.avif", "/p1.avif"],
    category: "aventure",
    age: "3-6 ans",
    description: "Une épopée héroïque où votre petit chevalier affronte un dragon pour sauver le royaume.",
  },
  {
    id: 8,
    name: "L'Astronaute et la Planète Mystérieuse",
    price: 140,
    oldPrice: 170,
    image: "/p1.avif",
    images: ["/p1.avif", "/p1.avif"],
    category: "sommeil",
    age: "Famille",
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
    images: ["/p1.avif", "/p1.avif", "/p1.avif"],
    category: "aventure",
    age: "3-6 ans",
    description: "Une histoire unique où votre enfant devient le héros de sa propre aventure magique.",
  },
  {
    id: 102,
    name: "Le Livre des Rêves",
    price: 110,
    oldPrice: 140,
    image: "/p1.avif",
    images: ["/p1.avif", "/p1.avif"],
    category: "sommeil",
    age: "0-3 ans",
    description: "Des histoires douces et apaisantes pour accompagner votre enfant vers de beaux rêves.",
  },
  {
    id: 103,
    name: "L'Explorateur Courageux",
    price: 130,
    oldPrice: 160,
    image: "/p1.avif",
    images: ["/p1.avif", "/p1.avif"],
    category: "aventure",
    age: "6 ans et +",
    description: "Votre enfant part à la découverte de mondes extraordinaires dans cette épopée personnalisée.",
  },
  {
    id: 104,
    name: "Ma Famille d'Amour",
    price: 125,
    oldPrice: 155,
    image: "/p1.avif",
    images: ["/p1.avif", "/p1.avif"],
    category: "famille",
    age: "Famille",
    description: "Une histoire touchante qui célèbre l'amour familial avec votre enfant comme personnage principal.",
  },
]

export function getProductById(id: number): Product | undefined {
  const mainProduct = mockProducts.find((product) => product.id === id)
  if (mainProduct) return mainProduct

  const specialProduct = specialProducts.find((product) => product.id === id)
  return specialProduct
}

export const allProducts = [...mockProducts, ...specialProducts]
