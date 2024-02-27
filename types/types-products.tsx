export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartProductProps extends ProductProps {
  quantity: number;
}
export interface FavoritProductProps extends ProductProps {
  isFavorite: boolean;
}
