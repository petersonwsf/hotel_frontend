"use client"
import { Field, ErrorMessage, useField } from "formik";

interface SelectOptions {
    label: string;
    value: string;
}

interface InputSelectProps {
    placeholder?: string;
    options: SelectOptions[];
    label: string;
    [x: string]: any;
}

export default function InputSelect({ label, options, ...props} : InputSelectProps) {

    const [field, meta] = useField(props.name)
    const hasError = meta.touched && meta.error;

    return (
        <div className="flex flex-col w-full">
            <label htmlFor={props.name}>{label}</label>
            <Field as="select" id={props.name} {...field} {...props} className={`border rounded-lg px-3 py-2 text-sm outline-none transition-colors ${
                    hasError 
                        ? "border-red-500 focus:border-red-500 bg-red-50/30" 
                        : "border-gray-300 focus:border-blue-500"
            }`}>
                <option value="" disabled hidden>
                    Selecione uma opção...
                </option>
                {options.map(option => (
                    <option value={option.value} key={`key_select_${option.value}`}>{option.label}</option>
                ))}
            </Field>
            <ErrorMessage name={props.name} component="span" className="text-red-500 text-xs mt-1"/>
        </div>
    )
}