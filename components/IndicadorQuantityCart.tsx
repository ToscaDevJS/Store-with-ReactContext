import { UseCarts } from "@/context/cartsContext";
import { CartProductProps, ProductProps } from "@/types/types-products";

export const IndicadorQuantityCart = ({ id }: ProductProps) => {
  const { cart } = UseCarts();
  return <p>quantity: {cart.find((item) => item.id === id)?.quantity}</p>;
};

export const IndicadorIsFavorite = ({ id }: ProductProps) => {
  const { favorites } = UseCarts();
  console.log(favorites);
  const favorite = favorites.find((item) => item.id === id)?.isFavorite;
  return <p>Isfavorite: {favorite && "true"}</p>;
};
