import { Suspense } from 'react';

import { NextPage } from 'next';

import ProductList from '@/components/product/productList';
import { dummyTshirtProducts } from '@/data/dummyProducts/T-shirt';

const ProductTshirtPage: NextPage = () => {
    return (
        <Suspense>
            <ProductList products={dummyTshirtProducts.tShirtItem.items} title={dummyTshirtProducts.tShirtItem.title} />
        </Suspense>
    );
};

export default ProductTshirtPage;
