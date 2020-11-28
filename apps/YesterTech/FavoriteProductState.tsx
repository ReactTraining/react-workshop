import * as React from "react";
import * as storage from "YesterTech/localStorage";

const FavoriteProductContext = React.createContext<any>(null);

export function FavoriteProductProvider({ children }: any): React.ReactElement {
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
    isFavorite: (productId: any) => favorites.includes(productId),
    addFavorite: (productId: any) => {
      setFavorites(favorites.concat(productId));
    },
    removeFavorite: (productId: any) => {
      setFavorites(favorites.filter((id: any) => id !== productId));
    },
  };

  return <FavoriteProductContext.Provider value={value} children={children} />;
}

export function useFavoriteProduct() {
  return React.useContext(FavoriteProductContext);
}
