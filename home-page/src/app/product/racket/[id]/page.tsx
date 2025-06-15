import { use } from 'react';
import { dummyRacketProducts } from '@/data/dummyProducts/Racket';
import ProductDetail from '@/components/product/ProductDetail';

export default function ProductRacketDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const numericId = parseInt(id);
    const product = dummyRacketProducts.racketItem.items.find((p) => p.id === numericId);

    if (!product) {
        return <div className="p-10 text-center text-red-500">존재하지 않는 상품입니다.</div>;
    }

    return <ProductDetail product={product} />;
}
