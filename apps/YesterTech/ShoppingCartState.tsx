import * as React from "react";
import * as storage from "YesterTech/localStorage";
import { CartProduct } from "YesterTech/types";
import { getInt } from "YesterTech/utils";

const ShoppingCartContext = React.createContext({} as ShoppingCartContextValue);

type ShoppingCartActionTypes = "ADD" | "UPDATE" | "REMOVE";

export const ShoppingCartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    function shoppingCartReducer(
      state: ShoppingCartState,
      action: ShoppingCartActions
    ): ShoppingCartState {
      switch (action.type) {
        case "ADD": {
          const found = state.cart.find(
            (p) => p.productId === getInt(action.productId, 10)
          );
          if (!found) {
            return {
              ...state,
              cart: state.cart.concat({
                productId: getInt(action.productId, 10),
                quantity: 1,
                name: action.name || "",
                price: action.price || 0,
              }),
            };
          } else {
            return state;
          }
        }
        case "UPDATE": {
          let cart;
          if (action.quantity > 0) {
            cart = state.cart.map((product) => {
              return product.productId === getInt(action.productId, 10)
                ? { ...product, quantity: getInt(action.quantity, 10) }
                : product;
            });
          } else {
            cart = state.cart.filter(
              (product) => product.productId !== getInt(action.productId, 10)
            );
          }
          return { ...state, cart };
        }
        case "REMOVE": {
          const c = state.cart;
          const index = c.findIndex((p) => p.productId === action.productId);
          const updatedCart = [...c.slice(0, index), ...c.slice(index + 1)];
          return { ...state, cart: updatedCart };
        }
        default:
          return state;
      }
    },
    {
      cart: storage.getCart() || [],
    }
  );

  const value: ShoppingCartContextValue = {
    ...state,
    addToCart(productId, name, price) {
      dispatch({ type: "ADD", productId, name, price });
    },
    updateQuantity(productId, quantity) {
      dispatch({ type: "UPDATE", productId, quantity });
    },
    removeFromCart(productId) {
      dispatch({ type: "REMOVE", productId });
    },
    getQuantity(productId) {
      if (!Array.isArray(state.cart)) return 0;
      return (
        (state.cart.filter((p) => p.productId === productId)[0] || {})
          .quantity || 0
      );
    },
    getCartSize() {
      if (!Array.isArray(state.cart)) return 0;
      return state.cart.reduce((size, item) => size + item.quantity, 0);
    },
    getCartTotal() {
      if (!Array.isArray(state.cart)) return 0;
      return state.cart.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
  };

  return <ShoppingCartContext.Provider value={value} children={children} />;
};

export function useShoppingCart() {
  const cartState = React.useContext(ShoppingCartContext);

  React.useEffect(() => {
    storage.updateCart(cartState.cart);
  }, [cartState.cart]);

  return cartState;
}

type ShoppingCartActions =
  | {
      type: "ADD";
      productId: CartProduct["productId"];
      name: CartProduct["name"];
      price: CartProduct["price"];
    }
  | {
      type: "UPDATE";
      quantity: CartProduct["quantity"];
      productId: CartProduct["productId"];
    }
  | {
      type: "REMOVE";
      productId: CartProduct["productId"];
    };

type ShoppingCartState = {
  cart: CartProduct[];
};

type ShoppingCartContextValue = {
  addToCart(
    productId: CartProduct["productId"],
    name: CartProduct["name"],
    price: CartProduct["price"]
  ): void;
  updateQuantity: (
    productId: CartProduct["productId"],
    quantity: CartProduct["quantity"]
  ) => void;
  removeFromCart: (productId: CartProduct["productId"]) => void;
  getQuantity: (productId: CartProduct["productId"]) => number;
  getCartSize: () => number;
  getCartTotal: () => number;
  cart: CartProduct[];
};
