'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
    {
        imageUrl: '/image/bannerImage1.png',
        headline: 'Beyond your Expectation',
        description: '기대 그 이상, 당신의 플레이를 한 단계 끌어올리다.',
    },
    {
        imageUrl: '/image/bannerImage2.png',
        headline: '초경량 라켓 출시',
        description: '가볍고 빠르게, 플레이를 지배하다.',
    },
    {
        imageUrl: '/image/bannerImage3.png',
        headline: '스타일과 성능의 조화',
        description: '당신의 다음 샷을 더 멋지게, COCK COCK Sport',
    },
];

export default function BannerCarousel({ onClickScroll }: { onClickScroll: () => void }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        emblaApi.on('select', onSelect);
        onSelect();

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [emblaApi, onSelect]);

    return (
        <section className="relative w-full h-[60vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] overflow-hidden">
            <div className="h-full embla" ref={emblaRef}>
                <div className="flex h-full">
                    {banners.map((banner, idx) => (
                        <div className="flex-[0_0_100%] relative h-full" key={idx}>
                            <Image
                                src={banner.imageUrl}
                                alt={banner.headline}
                                fill
                                className="object-cover"
                                priority={idx === 0}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white sm:px-6 bg-black/40">
                                <h2 className="mb-3 text-2xl font-bold sm:text-4xl md:text-5xl">{banner.headline}</h2>
                                <p className="mb-5 text-sm sm:text-base md:text-lg">{banner.description}</p>
                                <button
                                    onClick={onClickScroll}
                                    className="px-4 py-2 text-xs font-medium text-gray-900 bg-white rounded-full shadow-md sm:px-6 sm:text-sm md:text-base hover:bg-gray-100"
                                >
                                    🔥 인기 아이템 살펴보기
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 좌우 버튼 */}
            <button
                onClick={scrollPrev}
                className="absolute z-10 p-1 text-white -translate-y-1/2 rounded-full sm:p-2 bg-black/40 left-2 sm:left-4 top-1/2 hover:bg-black/60"
                aria-label="이전 배너"
            >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
                onClick={scrollNext}
                className="absolute z-10 p-1 text-white -translate-y-1/2 rounded-full sm:p-2 bg-black/40 right-2 sm:right-4 top-1/2 hover:bg-black/60"
                aria-label="다음 배너"
            >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* 인디케이터 */}
            <div className="absolute flex gap-2 -translate-x-1/2 bottom-4 sm:bottom-6 left-1/2">
                {banners.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition ${
                            idx === selectedIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
