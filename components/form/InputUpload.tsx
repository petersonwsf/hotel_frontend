"use client"
import { ErrorMessage, useField } from "formik";
import { ChangeEvent } from "react";

interface InputUploadButtonProps {
    name: string;
    label: string;
}

export default function InputUpload({ label, name }: InputUploadButtonProps) {
    const [field, meta, helpers] = useField(name);
    const hasError = meta.touched && meta.error;

    const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const currentFiles = Array.isArray(field.value) ? field.value : [];
        const updatedFiles = [...currentFiles, ...Array.from(files)];
        
        helpers.setValue(updatedFiles);
        e.target.value = ""
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <label className={`w-full max-w-xs flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:bg-gray-50 cursor-pointer p-4 transition-colors ${
                hasError ? "border-red-500 text-red-500" : "text-gray-600"
            }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="text-xs font-semibold">Fazer Upload de Fotos</span>
                <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    className="hidden" 
                    onChange={handleImagesChange}
                />
            </label>
            <ErrorMessage name={name} component="span" className="text-red-500 text-xs mt-1"/>
        </div>
    );
}