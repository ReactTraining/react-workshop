export type Product = {
  id: number;
  imagePath: string;
  inventory: number;
  name: string;
  rating: number;
  brand: string;
  category: string;
  condition: string;
  price: number;
  description: string;
  relatedProducts?: number[];
};

export type CartProduct = {
  productId: Product["id"];
  quantity: number;
  name: Product["name"];
  price: Product["price"];
};

export type User = {
  id: number;
  username: string;
  name: string;
  password: string;
  avatarUrl: string;
};

export type UserNoId = Omit<User, "id"> & {
  id?: User["id"] | undefined | null;
};
