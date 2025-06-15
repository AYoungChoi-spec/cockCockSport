import { Suspense } from 'react';

import { NextPage } from 'next';

import ProductList from '@/components/product/productList';
import { dummyPantsProducts } from '@/data/dummyProducts/Pants';

const ProductPantsPage: NextPage = () => {
    return (
        <Suspense>
            <ProductList products={dummyPantsProducts.PantsItem.items} title={dummyPantsProducts.PantsItem.title} />
        </Suspense>
    );
};

export default ProductPantsPage;
