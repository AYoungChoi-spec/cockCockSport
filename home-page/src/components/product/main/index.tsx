'use client';

import { useRef } from 'react';
import BannerCarousel from '@/components/common/bannerCarousel';
import ProductList from '@/components/product/productList';
import { dummyBestProducts } from '@/data/dummyProducts/Best';

const ProductMainPageView = () => {
    const productRef = useRef<HTMLDivElement>(null);

    const scrollToProducts = () => {
        productRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <BannerCarousel onClickScroll={scrollToProducts} />
            <div ref={productRef}>
                <ProductList products={dummyBestProducts.bestItem.items} title={dummyBestProducts.bestItem.title} />
            </div>
        </>
    );
};

export default ProductMainPageView;
