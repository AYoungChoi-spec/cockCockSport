'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const PurchaseModal = ({ isOpen, onClose }: Props) => {
    const [quantity, setQuantity] = useState('');
    const [phone, setPhone] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    //성공 s
    const handleSubmit = async () => {
        try {
            const response = await fetch(
                'https://script.google.com/macros/s/AKfycbzew0FYmL4gAkCN00qCQOWG4mwIrJBlEtahUySP6osnjfIBUg2orWxrJYAUPaRTr4dGaA/exec',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone: '010-1234-5678',
                        product: '콕콕 라켓',
                        quantity: 1,
                    }),
                }
            );

            if (!response.ok) throw new Error('응답 실패');
            const result = await response.json();
            console.log(result);
            setIsSuccess(true);
            alert('✅ 신청이 완료되었습니다!');
        } catch (error) {
            console.error('신청 중 오류 발생:', error);
            alert('❌ 신청에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <Dialog.Panel className="relative w-full max-w-md p-6 mx-auto bg-white shadow-xl rounded-xl">
                <button onClick={onClose} className="absolute text-gray-400 top-4 right-4 hover:text-gray-600">
                    <X size={20} />
                </button>

                <Dialog.Title className="text-lg font-bold text-gray-800">구매 신청</Dialog.Title>

                {isSuccess ? (
                    <p className="mt-6 text-sm text-green-700">✅ 신청이 완료되었습니다! 확인 후 연락드리겠습니다.</p>
                ) : (
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">상품 수량</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="예: 2"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">연락처 (전화번호)</label>
                            <input
                                type="tel"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="예: 010-1234-5678"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full px-4 py-2 text-white bg-[#237E79] hover:bg-[#1b645f] rounded-md"
                        >
                            제출하기
                        </button>

                        <div className="mt-2 text-xs text-gray-500">
                            ※ 신청 후 1~2일 이내에 확인 전화 또는 문자가 발송됩니다.
                            <br />※ 추후에는 온라인 결제가 도입될 예정입니다. 양해 부탁드립니다.
                        </div>

                        <div className="mt-4 text-sm text-gray-700">
                            👉 또는 카카오톡 오픈채팅으로 직접 문의하실 수 있습니다.
                            <br />
                            <a
                                href="https://open.kakao.com/o/yourChatLink"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                오픈채팅 바로가기
                            </a>
                        </div>
                    </div>
                )}
            </Dialog.Panel>
        </Dialog>
    );
};

export default PurchaseModal;
