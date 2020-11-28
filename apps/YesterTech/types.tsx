export type ProductId = number;

export type Product = {
  brand: string;
  category: string;
  condition: string;
  description: string;
  id: ProductId;
  imagePath: string;
  inventory: number;
  name: string;
  price: number;
  rating: number;
  relatedProducts?: ProductId[];
  year: string;
};

export type CartProduct = {
  productId: ProductId;
  quantity: number;
  name: string;
  price: number;
};

export type UserId = number;

export type User = {
  id: UserId;
  username: string;
  name: string;
  password: string;
  avatarUrl: string;
};

export type UserNoId = Omit<User, "id"> & {
  id?: UserId | undefined | null;
};

export type UserNoPassword = Omit<User, "password">;

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string | null;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: "User";
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string | null;
  location: string;
  email: string | null;
  hireable: boolean;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

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

export interface ReactComponentWithoutChildren<P = {}> {
  (props: P, context?: any): React.ReactElement<any, any> | null;
  propTypes?: React.WeakValidationMap<P>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}
