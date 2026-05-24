"use client"
import { Field, ErrorMessage, useField } from "formik";

interface InputTextProps {
    type?: string;
    placeholder?: string;
    label: string;
    [x: string]: any;
}

export default function Textarea({ type = "text", label, ...props} : InputTextProps) {

    const [field, meta] = useField(props.name)
    const hasError = meta.touched && meta.error;

    return (
        <div className="flex flex-col w-full">
            <label htmlFor={props.name}>{label}</label>
            <Field as="textarea" id={props.name} type={type} {...field} {...props} className={`border rounded-lg px-3 py-2 text-sm outline-none transition-colors ${
                    hasError 
                        ? "border-red-500 focus:border-red-500 bg-red-50/30" 
                        : "border-gray-300 focus:border-blue-500"
                }`} />
            <ErrorMessage name={props.name} component="span" className="text-red-500 text-xs mt-1"/>
        </div>
    )
}