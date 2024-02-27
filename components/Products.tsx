"use client";
import { UseCarts } from "@/context/cartsContext";
import { UseFilters } from "@/context/filtersContext";
import { Productlist } from "@/mocks/products";
/* eslint-disable @next/next/no-img-element */
import { ProductProps, CartProductProps } from "@/types/types-products";
import {
  IconHeart,
  IconShoppingCart,
  IconGardenCartOff,
  IconShoppingCartCancel,
  IconShoppingCartPlus,
  IconShoppingCartMinus,
} from "@tabler/icons-react";
import {
  IndicadorIsFavorite,
  IndicadorQuantityCart,
} from "./IndicadorQuantityCart";

export const Products = () => {
  const { filteredProducts } = UseFilters();

  const data = filteredProducts(Productlist);

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 ">
      {data.slice(0, 10).map((data) => {
        return <CardProduct key={data.id} {...data} />;
      })}
    </div>
  );
};

function CardProduct(data: ProductProps) {
  const {
    cart,
    addToCart,
    minusFromCart,
    removeFromCart,
    removeAllFromCart,
    toggleFavorite,
    favorites,
  } = UseCarts();

  return (
    <div
      className="h-96 w-96 rounded-2xl border hover:border-gray-400"
      key={data.id}
    >
      <img src={data.thumbnail} alt="image" />
      <p>{data.title}</p>
      <p>{data.price}</p>
      <p>{data.description}</p>
      <p>{data.category}</p>
      <p className="text-2xl">${data.price}</p>

      <div className="bg-gray-700">
        <IndicadorQuantityCart {...data} />
        <IndicadorIsFavorite {...data} />
        <p>quantity: {cart.find((item) => item.id === data.id)?.quantity}</p>
        <p>
          isFavorite:
          {favorites.find((item) => item.id === data.id)?.isFavorite && "true"}
        </p>
      </div>
      <div className="flex space-x-8 justify-center">
        <IconShoppingCartPlus
          onClick={() => addToCart(data as CartProductProps)}
          size={55}
          className="my-6 border rounded-xl hover:opacity-60"
        />
        <IconShoppingCartMinus
          onClick={() => minusFromCart(data as CartProductProps)}
          size={55}
          className="my-6 border rounded-xl hover:opacity-60"
        />
        <IconShoppingCartCancel
          onClick={() => removeFromCart(data as CartProductProps)}
          size={55}
          className="my-6 border rounded-xl hover:opacity-60"
        />
        <IconGardenCartOff
          onClick={() => removeAllFromCart()}
          size={55}
          className="my-6 border rounded-xl hover:opacity-60"
        />
        <IconHeart
          onClick={() => toggleFavorite(data)}
          size={55}
          className="my-6 border rounded-xl hover:opacity-60 text-red-400 "
        />
      </div>
    </div>
  );
}
