"use client";
import { ProductProps } from "@/types/types-products";
import React, { createContext, useContext, useState } from "react";
interface Filters {
  category: string;
  minPrice: number;
}

interface FilterContextType {
  initialFilters: Filters;
  filters: Filters;
  updateFilters: (newFilters: Filters) => void;
  filteredProducts: (Productlist: ProductProps[]) => ProductProps[];
}

//1-crear el contexto
export const FiltersContext = createContext<FilterContextType | null>(null);

//2-crear el provider
export const FiltersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { filters, updateFilters, initialFilters, filteredProducts } =
    useSelectedFilter();

  return (
    <FiltersContext.Provider
      value={{ filters, updateFilters, initialFilters, filteredProducts }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

//Hook para acceder al contexto mas validar que exista
export const UseFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters debe usarse dentro de FiltersProvider");
  }
  return context;
};

//Hooks personalizados
const useSelectedFilter = () => {
  const initialFilters: Filters = {
    category: "all",
    minPrice: 0,
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const filteredProducts = (Productlist: ProductProps[]) => {
    return Productlist.filter((product: ProductProps) => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === "all" || product.category === filters.category)
      );
    });
  };

  const updateFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return { filters, updateFilters, initialFilters, filteredProducts };
};
