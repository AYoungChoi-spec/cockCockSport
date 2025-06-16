'use client';
import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full px-4 py-10 text-xs text-gray-700 bg-gray-100">
            <div className="grid max-w-6xl grid-cols-1 gap-6 mx-auto leading-relaxed md:grid-cols-2 lg:grid-cols-3">
                {/* 회사 정보 */}
                <div>
                    <h2 className="mb-2 text-sm font-semibold">상호정보</h2>
                    <p>상호명: 콕콕 코리아</p>
                    <p>대표자명: 석지영</p>
                    <p>사업자 등록번호: 619-10-78621</p>
                    <p>통신판매업 신고번호: (확인 후 입력)</p>
                    <p>사업자 주소: 대구시 달성군 다사읍 대실역북로5길 30</p>
                    <p>개인정보보호책임자: 석지영</p>
                </div>

                {/* 고객센터 */}
                <div>
                    <h2 className="mb-2 text-sm font-semibold">고객센터</h2>
                    <p>상담/주문 전화: 010-8344-0701</p>
                    <p>
                        이메일:{' '}
                        <a href="mailto:bolle10@naver.com" className="text-blue-500">
                            bolle10@naver.com
                        </a>
                    </p>
                    <p>CS 운영시간: 오전 10:00 ~ 오후 16:00</p>
                </div>

                {/* 결제정보 */}
                <div>
                    <h2 className="mb-2 text-sm font-semibold">무통장 입금정보</h2>
                    <p>대구은행 508-14-322219-3</p>
                    <p>예금주: 석지영 (콕콕배드민턴)</p>
                </div>
            </div>

            <div className="mt-8 text-center text-[10px] text-gray-400">
                &copy; {new Date().getFullYear()} 콕콕 코리아. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
