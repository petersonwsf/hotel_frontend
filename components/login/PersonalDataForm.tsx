"use client";
import { Field, useFormikContext, ErrorMessage } from "formik";
import { FormSection, UserRegister } from "./FormRegister";
import { useMemo } from "react";

interface PersonalDataFormProps {
    setSection: (value: FormSection) => void;
}

export default function PersonalDataForm({ setSection } : PersonalDataFormProps) {

    const { errors, touched, values } = useFormikContext<UserRegister>()

    const hasError = useMemo(() => {
        const emptyValues = Object.entries(values).some(([key, value]) => {
            if (key !== 'conteactInformation') {
                return !value || value === undefined || value === ''
            }
        })
        const isMissingFields =  Object.entries(errors).some(([key, value]) => {
            if (key !== 'contactInformation') {
                return value || value !== undefined || value !== ''
            }
        })
        return isMissingFields || emptyValues
    }, [errors])

    return (
        <div className="w-full flex flex-col">
            <h2 className="font-light text-xl mb-2">Dados pessoais</h2>
            <div className="flex flex-col my-1">
                <label htmlFor="name" className="font-light">Nome</label>
                <Field name="name" id="name" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.name && touched.name ? 'border-red-500' : undefined}`} />
                <ErrorMessage name="name" component="span" className="text-xs mt-1 text-red-500"/>
            </div>
            <div className="flex flex-col my-1">
                <label htmlFor="email" className="font-light">Email</label>
                <Field name="email" id="email" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.email && touched.email ? 'border-red-500' : undefined}`} />
                <ErrorMessage name="email" component="span" className="text-xs mt-1 text-red-500"/>
            </div>
            <div className="flex gap-[10px] my-1">
                <div className="flex flex-col w-full">
                    <label htmlFor="password" className="font-light">Senha</label>
                    <Field type="password" name="password" id="password" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.password && touched.password ? 'border-red-500' : undefined}`} />
                    <ErrorMessage name="password" component="span" className="text-xs mt-1 text-red-500"/>
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="confirmPassword" className="font-light">Confirmar senha</label>
                    <Field type="password" name="confirmPassword" id="confirmPassword" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : undefined}`} />
                    <ErrorMessage name="confirmPassword" component="span" className="text-xs mt-1 text-red-500"/>
                </div>
            </div>
            <div className="flex gap-[10px] my-1">
                <div className="flex flex-col w-full">
                    <label htmlFor="pin" className="font-light">CPF</label>
                    <Field name="pin" id="pin" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.pin && touched.pin ? 'border-red-500' : undefined}`} />
                    <ErrorMessage name="pin" component="span" className="text-xs mt-1 text-red-500"/>
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="dateOfBirth" className="font-light">Data de nascimento</label>
                    <Field type="date" name="dateOfBirth" id="dateOfBirth" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.dateOfBirth && touched.dateOfBirth ? 'border-red-500' : undefined}`} />
                    <ErrorMessage name="dateOfBirth" component="span" className="text-xs mt-1 text-red-500"/>
                </div>
            </div>
            <div className="flex justify-center mb-[2rem] mt-[1rem]">
                <button onClick={() => setSection('CONTACT')} type="button" className="bg-[#002BB3] py-2 px-4 rounded-[5px] text-white cursor-pointer" style={{opacity: hasError ? '0.5' : undefined}} disabled={hasError}>Seguir</button>
            </div>
        </div>
    )
}