"use client";

import { Field, ErrorMessage, useField } from "formik";
import { IconType } from "react-icons";

interface SelectOptions {
  label: string;
  value: string;
}

interface InputSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: SelectOptions[];
  icon?: IconType;
  [x: string]: any;
}

export default function InputSelect({
  label,
  options,
  icon: Icon,
  placeholder = "Selecione uma opção...",
  ...props
}: InputSelectProps) {
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
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center z-10">
            <Icon
              className={`w-5 h-5 transition-colors ${
                hasError ? "text-red-500" : "text-gray-500"
              }`}
            />
          </div>
        )}

        <Field
          as="select"
          id={props.name}
          {...field}
          {...props}
          className={`w-full border rounded-xl py-4 text-base outline-none transition-all cursor-pointer appearance-none ${
            Icon ? "pl-12 pr-10" : "px-4 pr-10"
          } ${
            hasError
              ? "border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/30 text-red-900"
              : "border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 text-gray-800"
          } bg-white`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          
          {options.map((option) => (
            <option value={option.value} key={`key_select_${option.value}`}>
              {option.label}
            </option>
          ))}
        </Field>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <ErrorMessage
        name={props.name}
        component="span"
        className="text-red-500 text-xs mt-1 ml-1"
      />
    </div>
  );
}