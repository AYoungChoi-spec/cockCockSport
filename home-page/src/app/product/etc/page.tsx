import { Suspense } from 'react';

import { NextPage } from 'next';

import ProductList from '@/components/product/productList';
import { dummyEtcProducts } from '@/data/dummyProducts/Etc';

const ProductEtcPage: NextPage = () => {
    return (
        <Suspense>
            <ProductList products={dummyEtcProducts.etcItem.items} title={dummyEtcProducts.etcItem.title} />
        </Suspense>
    );
};

export default ProductEtcPage;
