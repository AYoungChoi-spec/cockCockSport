'use client';

import Header from '@/components/common/header';
import Footer from '../common/footer';
import { useState } from 'react';

const RootLayoutStyle = ({ children }: { children: React.ReactNode }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <main className="min-h-screen text-gray-900 bg-gray-50">
            <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
            {children}
            <Footer />
        </main>
    );
};
export default RootLayoutStyle;
