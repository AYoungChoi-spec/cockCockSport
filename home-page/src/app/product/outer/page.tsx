import { Suspense } from 'react';

import { NextPage } from 'next';

import ProductList from '@/components/product/productList';
import { dummyOuterProducts } from '@/data/dummyProducts/Outer';

const ProductOuterPage: NextPage = () => {
    return (
        <Suspense>
            <ProductList products={dummyOuterProducts.outerItem.items} title={dummyOuterProducts.outerItem.title} />
        </Suspense>
    );
};

export default ProductOuterPage;
