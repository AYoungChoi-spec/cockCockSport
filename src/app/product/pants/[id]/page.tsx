import { use } from 'react';
import { dummyPantsProducts } from '@/data/dummyProducts/Pants';
import ProductDetail from '@/components/product/ProductDetail';

export default function ProductPantsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const numericId = parseInt(id);
    const product = dummyPantsProducts.PantsItem.items.find((p) => p.id === numericId);

    if (!product) {
        return <div className="p-10 text-center text-red-500">존재하지 않는 상품입니다.</div>;
    }

    return <ProductDetail product={product} />;
}
