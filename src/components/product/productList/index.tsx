'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThumbsUp, Clock } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Product {
    id: number;
    title: string;
    model?: string;
    colors?: string[];
    detailPageUrl?: string;
    other?: string;
    brand?: string;
    origin?: string;
    price: string;
    originalPrice?: string;
    imageUrl: string;
    otherInfoText?: string;
    detailInfoImage?: string[];
    detailInfoVideo?: string[];
    highlight?: string;
    extra?: {
        shipping?: string;
        notice?: string;
        event?: string;
    };
    new?: boolean;
}

const PRODUCTS_PER_PAGE = 3;

const ProductList = ({ products, title }: { products: Product[]; title: string }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState<'recommended' | 'latest'>('recommended');
    const pathname = usePathname();

    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    const sortedProducts = useMemo(() => {
        if (sortOrder === 'latest') {
            return [...products].reverse();
        }
        return products;
    }, [products, sortOrder]);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
        return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
    }, [currentPage, sortedProducts]);

    return (
        <section className="px-4 pt-20 pb-16 mx-auto max-w-7xl">
            <h3 className="mb-16 text-3xl font-extrabold text-center text-gray-900">{title}</h3>
            {/* 정렬 버튼 (BEST 아니면 표시) */}
            <div className="flex justify-end mb-8">
                <div className="flex gap-2 sm:gap-3">
                    <button
                        onClick={() => {
                            setSortOrder('recommended');
                            setCurrentPage(1);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-all border ${
                            sortOrder === 'recommended'
                                ? 'bg-[#237E79] text-white border-transparent shadow-md'
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        <ThumbsUp size={16} className={sortOrder === 'recommended' ? 'text-white' : 'text-gray-400'} />
                        대표님 PIK!
                    </button>

                    <button
                        onClick={() => {
                            setSortOrder('latest');
                            setCurrentPage(1);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-all border ${
                            sortOrder === 'latest'
                                ? 'bg-[#237E79] text-white border-transparent shadow-md'
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        <Clock size={16} className={sortOrder === 'latest' ? 'text-white' : 'text-gray-400'} />
                        최신순
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
                {paginatedProducts.map((product) => (
                    <Link
                        key={product.id}
                        href={
                            pathname && pathname.startsWith('/') && pathname !== '/'
                                ? `${pathname.replace(/\/$/, '')}/${product.id}`
                                : product.detailPageUrl ?? `/product/bag/${product.id}`
                        }
                        className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-lg group"
                    >
                        <div className="relative w-full overflow-hidden bg-gray-100 aspect-[4/5]">
                            {(title === '🔥 BEST' || product.new) && (
                                <div className="absolute z-10 px-2 py-1 text-xs font-bold text-white bg-[#E1426F] rounded-md shadow-md top-3 left-3">
                                    NEW
                                </div>
                            )}

                            <Image
                                src={product.imageUrl}
                                alt={product.title}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                priority={product.id === 1}
                            />
                        </div>

                        <div className="w-full h-px bg-gray-200" />

                        <div className="relative flex flex-col justify-between flex-1 p-5 space-y-3">
                            <div className="pb-2 space-y-1">
                                <h4 className="text-lg font-semibold text-gray-900">{product.title}</h4>
                                {product.colors && (
                                    <p className="text-sm text-gray-500">색상: {product.colors.join(', ')}</p>
                                )}
                                {product.other && <p className="text-sm text-gray-500">{product.other}</p>}
                                {product.highlight && (
                                    <p className="mt-2 text-sm text-gray-700 line-clamp-2">{product.highlight}</p>
                                )}
                            </div>

                            <div className="flex items-baseline space-x-2">
                                <span className="text-lg font-bold text-[#237E79]">{product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                                )}
                            </div>

                            <div className="mt-2 space-y-1 text-xs text-gray-500">
                                {product.extra?.shipping && <p>🚚 {product.extra.shipping}</p>}
                                {product.extra?.notice && <p>📌 {product.extra.notice}</p>}
                                {product.extra?.event && <p>🎁 {product.extra.event}</p>}
                            </div>

                            <div className="absolute bottom-5 right-5">
                                <div className="px-3 py-1.5 text-xs font-medium text-white bg-black/70 rounded-full pointer-events-none">
                                    상세 보기
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex justify-end mt-8">
                <div className="w-full text-right sm:max-w-xs">
                    <div className="inline-block px-4 py-2 text-[10px] sm:text-xs text-gray-500 backdrop-blur-sm leading-relaxed">
                        ※ 본 상품 이미지는 상품 이해를 돕기 위한 가공 이미지로,
                        <br className="hidden sm:block" />
                        실제 이미지는 상세 페이지에서 확인하실 수 있습니다.
                    </div>
                </div>
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center mt-10 space-x-2">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm font-medium bg-gray-200 rounded disabled:opacity-50"
                >
                    {'<'}
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`px-3 py-1 text-sm font-medium rounded ${
                            currentPage === idx + 1 ? 'bg-[#237E79] text-white' : 'bg-gray-100'
                        }`}
                    >
                        {idx + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm font-medium bg-gray-200 rounded disabled:opacity-50"
                >
                    {'>'}
                </button>
            </div>
        </section>
    );
};

export default ProductList;
