"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "./mock-products"
import type { CartItem } from "./cart-context"

export interface Category {
  id: number
  name: string
  image: string
}

export interface Type {
  id: number
  name: string
  image: string
}

export interface AdminProduct extends Omit<Product, "category" | "type"> {
  age: number
  category: string
}

export interface Order {
  id: number
  customerName: string
  customerEmail: string
  customerPhone: string
  items: CartItem[]
  totalPrice: number
  status: "pending" | "processing" | "completed" | "cancelled"
  createdAt: string
  address?: string
  ville?: string
  pays?: string
}

interface AdminState {
  products: AdminProduct[]
  orders: Order[]
}

type AdminAction =
  | { type: "SET_PRODUCTS"; payload: AdminProduct[] }
  | { type: "ADD_PRODUCT"; payload: AdminProduct }
  | { type: "UPDATE_PRODUCT"; payload: AdminProduct }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "SET_ORDERS"; payload: Order[] }
  | { type: "UPDATE_ORDER_STATUS"; payload: { id: number; status: Order["status"] } }

const AdminContext = createContext<{
  state: AdminState
  dispatch: React.Dispatch<AdminAction>
  addProduct: (product: Omit<AdminProduct, "id">) => void
  updateProduct: (product: AdminProduct) => void
  deleteProduct: (id: number) => void
  updateOrderStatus: (id: number, status: Order["status"]) => void
} | null>(null)

const initialState: AdminState = {
  products: [
    {
      id: 1,
      name: "L'Aventure de Luna la Petite Sorcière",
      price: 45,
      oldPrice: 55,
      image: "/p1.avif",
      images: ["/p1.avif"],
      age: 4,
      category: "Aventure",
      inStock: true,
      description: "Une histoire magique personnalisée où votre enfant accompagne Luna dans ses aventures enchantées.",
    },
    {
      id: 2,
      name: "Le Voyage de Max l'Explorateur",
      price: 42,
      oldPrice: 50,
      image: "/t1.avif",
      images: ["/t1.avif"],
      age: 5,
      category: "Exploration",
      inStock: true,
      description:
        "Rejoignez Max dans un voyage extraordinaire à travers des terres mystérieuses et des découvertes incroyables.",
    },
    {
      id: 3,
      name: "Les Amis de la Forêt Enchantée",
      price: 48,
      oldPrice: 58,
      image: "/t2.avif",
      images: ["/t2.avif"],
      age: 3,
      category: "Amitié",
      inStock: true,
      description: "Une belle histoire sur l'amitié et la nature, où votre enfant rencontre des animaux magiques.",
    },
  ],
  orders: [
    {
      id: 1,
      customerName: "Amina Benali",
      customerEmail: "amina@example.com",
      customerPhone: "+212 6 12 34 56 78",
      items: [
        {
          id: 1,
          name: "L'Aventure de Luna la Petite Sorcière",
          price: 45,
          oldPrice: 55,
          image: "/p1.avif",
          images: [],
          category: "aventure",
          type: "histoire",
          inStock: true,
          quantity: 1,
        },
      ],
      totalPrice: 45,
      status: "pending",
      createdAt: new Date().toISOString(),
      address: "Rue des Roses, Quartier Gueliz",
      ville: "Marrakech",
      pays: "Maroc",
    },
    {
      id: 2,
      customerName: "Youssef Alami",
      customerEmail: "youssef@example.com",
      customerPhone: "+212 6 87 65 43 21",
      items: [
        {
          id: 2,
          name: "Le Voyage de Max l'Explorateur",
          price: 42,
          oldPrice: 50,
          image: "/t1.avif",
          images: [],
          category: "exploration",
          type: "histoire",
          inStock: true,
          quantity: 2,
        },
      ],
      totalPrice: 84,
      status: "completed",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      address: "Avenue Mohammed V",
      ville: "Casablanca",
      pays: "Maroc",
    },
  ],
}

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload }
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] }
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) => (product.id === action.payload.id ? action.payload : product)),
      }
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      }
    case "SET_ORDERS":
      return { ...state, orders: action.payload }
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? { ...order, status: action.payload.status } : order,
        ),
      }
    default:
      return state
  }
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, initialState)

  useEffect(() => {
    const savedProducts = localStorage.getItem("admin_products")
    const savedOrders = localStorage.getItem("admin_orders")

    if (savedProducts) {
      dispatch({ type: "SET_PRODUCTS", payload: JSON.parse(savedProducts) })
    }
    if (savedOrders) {
      dispatch({ type: "SET_ORDERS", payload: JSON.parse(savedOrders) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("admin_products", JSON.stringify(state.products))
  }, [state.products])

  useEffect(() => {
    localStorage.setItem("admin_orders", JSON.stringify(state.orders))
  }, [state.orders])

  const addProduct = (product: Omit<AdminProduct, "id">) => {
    const newProduct = { ...product, id: Date.now() }
    dispatch({ type: "ADD_PRODUCT", payload: newProduct })
  }

  const updateProduct = (product: AdminProduct) => {
    dispatch({ type: "UPDATE_PRODUCT", payload: product })
  }

  const deleteProduct = (id: number) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id })
  }

  const updateOrderStatus = (id: number, status: Order["status"]) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { id, status } })
  }

  return (
    <AdminContext.Provider
      value={{
        state,
        dispatch,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
