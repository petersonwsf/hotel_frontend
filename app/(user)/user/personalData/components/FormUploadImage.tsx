"use client"

import { handleToast } from "@/utils/handleToast";
import { useRef, useState, DragEvent, ChangeEvent } from "react"
import { IoCloseCircle, IoCloudUploadOutline } from "react-icons/io5";

interface FormUploadImageProps {
    onSubmit: (file: File, id: number) => Promise<void>;
    id: number;
}

export default function FormUploadImage({ onSubmit, id } : FormUploadImageProps) {

    const [preview, setPreview] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        if (!file) {
            handleToast("Selecione uma imagem de perfil", "error")
            return
        }
        onSubmit(file, id)
    }

    const handleDrag = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    const handleFile = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            setFile(file)
            const fileUrl = URL.createObjectURL(file);
            setPreview(fileUrl);
        } else {
            handleToast("Por favor, selecione apenas arquivos de imagem.", "error");
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="w-full">
            <input
                type="file"
                id="file-upload"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleChange}
            />
            <label
                htmlFor="file-upload"
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all p-4 relative overflow-hidden
                ${isDragActive ? "border-blue-500 bg-blue-50/50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}
                ${preview ? "border-solid border-gray-200 bg-white w-full h-[500px]" : ""}
                `}
            >
                {preview ? (
                    <div className="absolute inset-0 w-full h-full group">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors text-3xl cursor-pointer"
                        >
                            <IoCloseCircle />
                        </button>
                        <span className="text-white font-medium text-sm px-4 py-2 border border-white rounded-lg pointer-events-none">
                            Alterar Imagem
                        </span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                        <IoCloudUploadOutline className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold text-blue-600">Clique para fazer upload</span> ou arraste aqui
                        </p>
                        <p className="text-xs text-gray-400">PNG, JPG ou WEBP (Max. 5MB)</p>
                    </div>
                )}
            </label>
            <div className="mt-3 flex justify-end">
                <button onClick={handleSubmit} className={`text-[#002179] mt-[1rem] border text-white py-[.3rem] bg-[#002179] px-[2rem] cursor-pointer rounded-[7px] font-normal`}>Atualizar foto de perfil</button>
            </div>
        </div>
    )
}