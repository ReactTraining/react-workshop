/* eslint-disable no-unused-vars */
import * as React from "react";
import * as storage from "YesterTech/localStorage";

// Make your context here

export const FavoriteProductProvider: React.FC = ({ children }) =>
  // Wrap children in the provider
  children as any;

export function useFavoriteProduct() {
  // return the return-value of useContext
}
