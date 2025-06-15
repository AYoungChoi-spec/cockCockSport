'use client';

import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import MobileMenu from '@/components/common/mobileMenu';
import { useRouter } from 'next/navigation';
interface Props {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
}

const navItems = [
    { label: 'Racket', path: '/product/racket' },
    { label: 'T-shirt', path: '/product/t-shirt' },
    { label: 'Outer', path: '/product/outer' },
    { label: 'Pants', path: '/product/pants' },
    { label: 'Bag', path: '/product/bag' },
    { label: 'Etc.', path: '/product/etc' },
];

const Header = ({ mobileMenuOpen, setMobileMenuOpen }: Props) => {
    const router = useRouter();
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 shadow-sm backdrop-blur-md bg-white/80">
            <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
                <div
                    className="relative h-10 w-[8rem] flex-shrink-0"
                    onClick={() => {
                        router.push('/');
                    }}
                >
                    <Image src="/image/logoImage.png" alt="로고" fill className="object-contain" />
                </div>

                <nav className="hidden space-x-8 text-sm font-semibold text-gray-600 md:flex">
                    {navItems.map(({ label, path }) => (
                        <a key={label} href={path} className="transition-colors hover:text-black">
                            {label}
                        </a>
                    ))}
                </nav>

                <button
                    className="p-2 transition rounded-full md:hidden hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="메뉴 토글"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {mobileMenuOpen && <MobileMenu />}
        </header>
    );
};

export default Header;
