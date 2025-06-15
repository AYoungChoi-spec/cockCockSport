'use client';

import Header from '@/components/common/header';
import { useState } from 'react';

const RootLayoutStyle = ({ children }: { children: React.ReactNode }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <main className="min-h-screen text-gray-900 bg-gray-50">
            <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
            {children}
        </main>
    );
};
export default RootLayoutStyle;
