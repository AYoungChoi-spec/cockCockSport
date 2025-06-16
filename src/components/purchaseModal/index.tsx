'use client';

import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const PurchaseModal = ({ isOpen, onClose }: Props) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* 배경 */}
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

            {/* 모달 패널 */}
            <Dialog.Panel className="relative w-full max-w-md p-6 mx-auto bg-white shadow-2xl rounded-2xl">
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute text-gray-400 transition top-4 right-4 hover:text-gray-600"
                    aria-label="모달 닫기"
                >
                    <X size={20} />
                </button>

                {/* 타이틀 */}
                <Dialog.Title className="text-xl font-semibold text-gray-800">📦 구매 신청 안내</Dialog.Title>

                {/* 안내 문구 */}
                <div className="mt-3 text-sm leading-relaxed text-gray-500">
                    본 상품은 현재 오픈채팅을 통해 수동으로 주문을 받고 있습니다.
                    <br />
                    신청 후 <strong className="text-gray-700">1~2일 내 확인 연락</strong>이 진행됩니다.
                    <br />
                    추후 온라인 결제 시스템이 도입될 예정입니다.
                </div>

                {/* 오픈채팅 안내 */}
                <div className="p-4 mt-6 border rounded-xl bg-gray-50">
                    <p className="text-sm text-gray-700">👉 빠른 문의를 원하신다면 아래 버튼을 클릭해주세요.</p>
                    <a
                        href="https://open.kakao.com/o/gEj7n6Bh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block w-full px-4 py-2 text-center font-medium text-white bg-[#237E79] hover:bg-[#1b645f] transition rounded-lg"
                    >
                        카카오톡 오픈채팅 바로가기
                    </a>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
};

export default PurchaseModal;
