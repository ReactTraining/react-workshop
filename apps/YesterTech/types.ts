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

export type CheckoutFields = {
  billingName: string;
  billingAddress: string;
  shippingName: string;
  shippingAddress: string;
};

export type CheckoutFieldsBilling = {
  billingName: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingPostal: string;
};

export type CheckoutFieldsShipping = {
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPostal: string;
};

export type CheckoutFieldsFull = CheckoutFieldsBilling & CheckoutFieldsShipping;

export interface ReactComponentWithoutChildren<
  P = {},
> {
  (props: P, context?: any): React.ReactElement<any, any> | null;
  propTypes?: React.WeakValidationMap<P>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}
