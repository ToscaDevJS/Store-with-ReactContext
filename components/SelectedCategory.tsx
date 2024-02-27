"use client";
import { UseFilters } from "@/context/filtersContext";

export const SelectedCategory = () => {
  const { filters, updateFilters } = UseFilters();

  const handleCategoryChange = (event: any) => {
    const newCategory = event.target.value;
    updateFilters({ ...filters, category: newCategory });
  };

  return (
    <div className="h-28 p-5">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl">Selección: {filters.category}</h1>
        <select onChange={handleCategoryChange} className="bg-black">
          <option value="all">Todas </option>
          <option value="laptops">laptops</option>
          <option value="clothing">Ropa</option>
        </select>
      </div>
    </div>
  );
};
