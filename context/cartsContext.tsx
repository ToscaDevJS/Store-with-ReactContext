"use client";
import {
  ProductProps,
  CartProductProps,
  FavoritProductProps,
} from "@/types/types-products";
import React, { createContext, useContext, useState } from "react";

interface CartContextTypes {
  cart: CartProductProps[];
  addToCart: (product: CartProductProps) => void;
  minusFromCart: (product: ProductProps) => void;
  removeFromCart: (product: ProductProps) => void;
  removeAllFromCart: () => void;
  removeAllFavorite: () => void;
  favorites: FavoritProductProps[];
  toggleFavorite: (product: ProductProps) => void;
}

//1-crear el contexto
export const CartContext = createContext<CartContextTypes>(
  {} as CartContextTypes
);

//2-crear el provider
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { cart, addToCart, minusFromCart, removeFromCart, removeAllFromCart } =
    useSelectedCarts();
  const { favorites, toggleFavorite, removeAllFavorite } =
    useToggleFavoriteProducts();

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        minusFromCart,
        removeFromCart,
        removeAllFromCart,
        favorites,
        toggleFavorite,
        removeAllFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//hook para acceder al contexto mas validar que exista
export const UseCarts = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};

//hooks personalizados
const useSelectedCarts = () => {
  const initialCart: CartProductProps[] = [
    {
      id: 0,
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: "",
      category: "",
      thumbnail: "",
      images: [],
      quantity: 0,
    },
  ];
  const [cart, setCart] = useState<CartProductProps[]>([]);

  const addToCart = (product: ProductProps) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      const newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  const minusFromCart = (product: ProductProps) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct && existingProduct.quantity > 1) {
      const newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(newCart);
    } else if (existingProduct) {
      // Si la cantidad es 1, mantén al menos 1 en el carrito
      const newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: 1 } : item
      );
      setCart(newCart);
    }
    // Si el producto no está en el carrito, no hagas nada
  };
  const removeFromCart = (product: ProductProps) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct && existingProduct.quantity >= 1) {
      const newCart = cart.filter((item) => item.id !== product.id);
      setCart(newCart);
    }
  };
  const removeAllFromCart = () => {
    setCart([]);
  };

  return { cart, addToCart, minusFromCart, removeFromCart, removeAllFromCart };
};

const useToggleFavoriteProducts = () => {
  const [favorites, setFavorites] = useState<FavoritProductProps[]>([]);

  const toggleFavorite = (product: ProductProps) => {
    const existingFavorite = favorites.find((item) => item.id === product.id);

    if (existingFavorite) {
      const newFavorites = favorites.map((item) =>
        item.id === product.id
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      );
      const filteredFavorites = newFavorites.filter((item) => item.isFavorite);
      setFavorites(filteredFavorites);
    } else {
      setFavorites([...favorites, { ...product, isFavorite: true }]);
    }
  };
  const removeAllFavorite = () => {
    setFavorites([]);
  };
  return { toggleFavorite, favorites, removeAllFavorite };
};
