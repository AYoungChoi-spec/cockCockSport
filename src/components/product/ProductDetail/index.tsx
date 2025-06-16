'use client';

import Image from 'next/image';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import PurchaseModal from '@/components/purchaseModal/index';

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

interface Props {
    product: Product;
}

// SafeImage
const SafeImage = ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => {
    const [error, setError] = useState(false);
    return (
        <div className="relative w-full overflow-hidden bg-white border shadow rounded-xl min-h-[300px] flex items-center justify-center">
            {!error ? (
                <Image
                    src={src.startsWith('/') ? src : `/${src}`}
                    alt={alt}
                    width={width}
                    height={height}
                    className="object-contain w-full h-auto"
                    onError={() => setError(true)}
                />
            ) : (
                <p className="p-10 text-sm text-center text-gray-400">이미지를 불러오는 데 실패했습니다.</p>
            )}
        </div>
    );
};

// SafeVideo
const SafeVideo = ({ src }: { src: string }) => {
    const [error, setError] = useState(false);

    return (
        <div className="relative w-full overflow-hidden bg-white border shadow rounded-xl min-h-[300px] flex items-center justify-center">
            {!error ? (
                <video controls playsInline className="w-full h-auto rounded-xl" onError={() => setError(true)}>
                    <source src={src.startsWith('/') ? src : `/${src}`} />
                    브라우저에서 동영상을 지원하지 않습니다.
                </video>
            ) : (
                <p className="p-10 text-sm text-center text-gray-400">동영상을 불러오는 데 실패했습니다.</p>
            )}
        </div>
    );
};

const trimIndent = (text: string) =>
    text
        .split('\n')
        .map((line) => line.trimStart())
        .join('\n');

const ProductDetail = ({ product }: Props) => {
    const detailImages = product.detailInfoImage ?? [];
    const detailVideos = product.detailInfoVideo ?? [];

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="max-w-6xl px-4 py-12 mx-auto">
            {/* 상단 */}
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {/* 이미지 */}
                <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow">
                    <Image src={product.imageUrl} alt={product.title} fill className="object-cover" priority />
                </div>

                {/* 텍스트 */}
                <div className="flex flex-col justify-between">
                    <div className="space-y-6">
                        {product.new && (
                            <span className="inline-block bg-[#E1426F] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                NEW
                            </span>
                        )}

                        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

                        {/* 기본 정보 */}
                        <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                            {product.model && (
                                <p>
                                    <span className="font-semibold text-gray-700">모델명:</span> {product.model}
                                </p>
                            )}
                            {product.brand && (
                                <p>
                                    <span className="font-semibold text-gray-700">브랜드:</span> {product.brand}
                                </p>
                            )}
                            {product.origin && (
                                <p>
                                    <span className="font-semibold text-gray-700">원산지:</span> {product.origin}
                                </p>
                            )}
                            {product.colors && (
                                <p>
                                    <span className="font-semibold text-gray-700">색상:</span>{' '}
                                    {product.colors.join(', ')}
                                </p>
                            )}
                            {product.other && (
                                <p>
                                    <span className="font-semibold text-gray-700">기타 정보:</span> {product.other}
                                </p>
                            )}
                        </div>

                        {/* 특징 */}
                        {product.highlight && (
                            <div className="p-4 mt-4 text-sm leading-relaxed text-gray-700 whitespace-pre-line border bg-gray-50 rounded-xl">
                                <p className="font-semibold mb-2 text-[#237E79]">🌟 제품 특징</p>
                                {product.highlight}
                            </div>
                        )}

                        {/* 배송/공지/이벤트 */}
                        {(product.extra?.shipping || product.extra?.notice || product.extra?.event) && (
                            <div className="pt-6 mt-6 space-y-2 text-sm text-gray-600 border-t">
                                {product.extra.shipping && (
                                    <p>
                                        🚚 <span className="font-semibold">배송 안내:</span> {product.extra.shipping}
                                    </p>
                                )}
                                {product.extra.notice && (
                                    <p>
                                        📌 <span className="font-semibold">공지사항:</span> {product.extra.notice}
                                    </p>
                                )}
                                {product.extra.event && (
                                    <p>
                                        🎁 <span className="font-semibold">이벤트:</span> {product.extra.event}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* 가격 */}
                    <div className="pt-10 space-y-4">
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-[#237E79]">{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                            )}
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full px-6 py-3 font-medium text-white bg-[#237E79] hover:bg-[#1b645f] transition rounded-xl shadow-md"
                        >
                            구매 신청하기
                        </button>
                    </div>
                </div>
            </div>

            {/* 마크다운 상품 설명 */}
            {product.otherInfoText && (
                <section className="space-y-4 mt-14">
                    <div className="p-6 border border-gray-200 shadow-sm rounded-xl bg-gray-50">
                        <div className="prose-sm prose text-gray-700 max-w-none">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                                {trimIndent(product.otherInfoText)}
                            </ReactMarkdown>
                        </div>
                    </div>
                </section>
            )}

            {/* 디테일 이미지 */}
            {detailImages.length > 0 && (
                <section className="mt-24 space-y-8">
                    <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">📷 상품 상세 이미지</h2>
                    <div className="flex flex-col gap-10">
                        {detailImages.map((url, index) => (
                            <SafeImage key={index} src={url} alt={`상세 이미지 ${index + 1}`} width={1200} height={0} />
                        ))}
                    </div>
                </section>
            )}

            {/* 영상 */}
            {detailVideos.length > 0 && (
                <section className="mt-24 space-y-8">
                    <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">🎬 상품 상세 영상</h2>
                    <div className="flex flex-col gap-10">
                        {detailVideos.map((media, index) => {
                            const isVideo = media.match(/\.(mp4|webm|ogg)$/i);
                            const isImage = media.match(/\.(jpg|jpeg|png|webp|gif)$/i);

                            if (isVideo) return <SafeVideo key={index} src={media} />;
                            if (isImage)
                                return (
                                    <SafeImage
                                        key={index}
                                        src={media}
                                        alt={`상세 비주얼 ${index + 1}`}
                                        width={1200}
                                        height={0}
                                    />
                                );
                            return (
                                <p key={index} className="py-8 text-sm text-center text-gray-400">
                                    지원하지 않는 미디어 형식입니다: {media}
                                </p>
                            );
                        })}
                    </div>
                </section>
            )}

            <p className="mt-20 text-xs leading-relaxed text-center text-gray-400">
                ※ 본 상품의 모든 정보는 제공된 데이터를 기준으로 출력되며, 추가 문의는 고객센터로 연락 바랍니다.
            </p>
            <PurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
};

export default ProductDetail;
