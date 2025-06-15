import { Suspense } from 'react';

import { NextPage } from 'next';

import ProductList from '@/components/product/productList';
import { dummyRacketProducts } from '@/data/dummyProducts/Racket';

const ProductRacketPage: NextPage = () => {
    return (
        <Suspense>
            <ProductList products={dummyRacketProducts.racketItem.items} title={dummyRacketProducts.racketItem.title} />
        </Suspense>
    );
};

export default ProductRacketPage;
