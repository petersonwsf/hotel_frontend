"use client";
import { IoCloseOutline } from "react-icons/io5";

type Width = "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" 

interface ModalRoomProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    size?: Width;
    children?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, size = "md" } : ModalRoomProps ) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in" onClick={onClose} />
            <div className={`flex flex-col relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] p-6 transform transition-all duration-300 scale-100 opacity-100 animate-zoom-in`}>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 shrink-0">
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 rounded-lg p-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <IoCloseOutline className="w-[25px] h-[25px]"/>
                    </button>
                </div>
                <div className="py-4 text-gray-600 px-[1rem] leading-relaxed overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}