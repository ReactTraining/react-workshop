import * as React from 'react';
import Heading from '../../../../../apps/YesterTech/Heading';  //import Heading from 'YesterTech/Heading'
import StarRating from './StarRating';
import useProducts from './useProducts';

export default function BrowseProducts() {
  const products = useProducts();
  
  console.log(products);

  return (
	<>
		{(products||[]).map(product => {
			return(
				<div key={`product-${product.id}`}>
					<Heading>{product.name}</Heading>
					<StarRating rating={product.rating} />
				</div>
			)
		})}
	</>
  );
}
