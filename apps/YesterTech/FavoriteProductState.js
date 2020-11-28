import * as React from "react";
import * as storage from "YesterTech/localStorage";

const FavoriteProductContext = React.createContext();

export function FavoriteProductProvider({ children }) {
  const [favorites, setFavorites] = React.useState(() => {
    return storage.getFavorites();
  });

  const firstRenderRef = React.useRef(true);

  React.useEffect(() => {
    if (!firstRenderRef.current) {
      storage.updateFavorites(favorites);
    }
    firstRenderRef.current = false;
  }, [favorites]);

  const value = {
    isFavorite: (productId) => favorites.includes(productId),
    addFavorite: (productId) => {
      setFavorites(favorites.concat(productId));
    },
    removeFavorite: (productId) => {
      setFavorites(favorites.filter((id) => id !== productId));
    },
  };

  return <FavoriteProductContext.Provider value={value} children={children} />;
}

export function useFavoriteProduct() {
  return React.useContext(FavoriteProductContext);
}
