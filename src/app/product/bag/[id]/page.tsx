import { use } from 'react';
import { dummyBagProducts } from '@/data/dummyProducts/Bag';
import ProductDetail from '@/components/product/ProductDetail';

export default function ProductBagDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const numericId = parseInt(id);
    const product = dummyBagProducts.bagItem.items.find((p) => p.id === numericId);

    if (!product) {
        return <div className="p-10 text-center text-red-500">존재하지 않는 상품입니다.</div>;
    }

    return <ProductDetail product={product} />;
}
