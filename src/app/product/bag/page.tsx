import { Suspense } from 'react';

import { NextPage } from 'next';

import ProductList from '@/components/product/productList';
import { dummyBagProducts } from '@/data/dummyProducts/Bag';

const ProductBagsPage: NextPage = () => {
    return (
        <Suspense>
            <ProductList products={dummyBagProducts.bagItem.items} title={dummyBagProducts.bagItem.title} />
        </Suspense>
    );
};

export default ProductBagsPage;
