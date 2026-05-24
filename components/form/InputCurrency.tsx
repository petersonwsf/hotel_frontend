"use client"
import { ErrorMessage, useField } from "formik";

interface InputCurrencyProps {
    placeholder?: string;
    name: string;
    label: string;
    [x: string]: any;
}

export default function InputCurrency({ label, name, ...props }: InputCurrencyProps) {
    const [field, meta, helpers] = useField(name);
    const hasError = meta.touched && meta.error;

    const formatCurrency = (value: number | null): string => {
        if (value === null || value === undefined) return "";
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "");
        if (!raw) {
            helpers.setValue(null);
            return;
        }
        helpers.setValue(Number(raw) / 100);
    };

    return (
        <div className="flex flex-col w-full">
            <label htmlFor={name} className="text-sm font-medium mb-1 text-gray-700">
                {label}
            </label>

            <input
                id={name}
                name={name}
                type="text"
                inputMode="numeric"
                value={formatCurrency(field.value)}
                onChange={handleChange}
                onBlur={() => helpers.setTouched(true)}
                className={`border rounded-lg px-3 py-2 text-sm outline-none transition-colors ${
                    hasError
                        ? "border-red-500 focus:border-red-500 bg-red-50/30"
                        : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder={props.placeholder}
            />

            <ErrorMessage name={name} component="span" className="text-red-500 text-xs mt-1" />
        </div>
    );
}