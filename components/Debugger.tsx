"use client";
import { UseCarts } from "@/context/cartsContext";
import { UseFilters } from "@/context/filtersContext";
import React from "react";

export const Debugger = () => {
  const { filters } = UseFilters();
  const { cart, favorites } = UseCarts();

  return (
    <div className="bg-gray-800 rounded-2xl p-3 z-50 bottom-0 fixed ">
      <p className="underline font-semibold text-center uppercase">Debugger </p>

      <p className="underline font-semibold text-blue-400"> Filter:</p>
      {JSON.stringify(filters, null, 2)}

      <p className="underline font-semibold text-blue-400"> Cart:</p>
      {JSON.stringify(cart, null, 2)}

      <p className="underline font-semibold text-blue-400"> IsFavorite:</p>
      {JSON.stringify(favorites, null, 2)}
    </div>
  );
};
