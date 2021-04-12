import { useState, useEffect } from 'react'

function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
	setProducts([
		{
			id: 1,
			name: 'Mario Kart',
			rating: 5,
			brand: 'Nintendo',
			condition: 'new',
		},
		{
			id: 2,
			name: 'Donkey Kong',
			rating: 3.5,
			brand: 'Nintendo',
			condition: 'good',
		},
		{
			id: 3,
			name: 'Nintendo NES',
			rating: 4,
			brand: 'Nintendo',
			condition: 'fair',
		},
	]);
  }, []);
  return products;
}

export default useProducts
