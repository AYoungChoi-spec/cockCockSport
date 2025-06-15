import { Suspense } from 'react';

import { NextPage } from 'next';

import ProductMainPageView from '@/components/product/main/index';
const ProductMainPage: NextPage = () => {
    return (
        <Suspense>
            <ProductMainPageView />
        </Suspense>
    );
};

export default ProductMainPage;

export const metadata = {
    title: 'Cock Cock Sport',
};
