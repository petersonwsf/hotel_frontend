"use client";

import { Field, ErrorMessage, useField } from "formik";
import { IconType } from "react-icons";

interface InputTextProps {
  name: string;
  label?: string; // Label opcional, pois na imagem não aparece
  type?: string;
  placeholder?: string;
  icon?: IconType;
  [x: string]: any;
}

export default function InputText({
  type = "text",
  label,
  icon: Icon,
  ...props
}: InputTextProps) {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={props.name} className="text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
            <Icon 
              className={`w-5 h-5 transition-colors ${
                hasError ? "text-red-500" : "text-gray-500"
              }`} 
            />
          </div>
        )}

        <Field
          id={props.name}
          type={type}
          {...field}
          {...props}
          className={`w-full border rounded-xl py-4 text-base outline-none transition-all ${
            Icon ? "pl-12 pr-4" : "px-4"
          } ${
            hasError
              ? "border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/30"
              : "border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
          } text-gray-800 placeholder:text-gray-400`}
        />
      </div>

      <ErrorMessage
        name={props.name}
        component="span"
        className="text-red-500 text-xs mt-1 ml-1"
      />
    </div>
  );
}