"use client";
import { Field, ErrorMessage } from "formik";
import { FormSection, UserRegister } from "./FormRegister";
import { useFormikContext } from "formik";
import { useEffect, useMemo } from "react";
import { getAddress } from "@/services/address";
import { IoIosArrowBack } from "react-icons/io";

interface ContactInformationFormProps {
    setSection: (value: FormSection) => void;
}

export default function ContactInformationForm({ setSection } : ContactInformationFormProps) {

    const { values, setFieldValue, errors, touched } = useFormikContext<UserRegister>()

    async function fetchAddress(postalCode: string) {
        try {
            const response = await getAddress(postalCode)
            setFieldValue('contactInformation.city', response.data.localidade ? response.data.localidade : values.contactInformation.city)
            setFieldValue('contactInformation.street', response.data.logradouro ? response.data.logradouro : values.contactInformation.street)
            setFieldValue('contactInformation.state', response.data.uf ? response.data.uf : values.contactInformation.state)
            setFieldValue('contactInformation.neighborhood', response.data.bairro ? response.data.bairro : values.contactInformation.neighborhood)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (values.contactInformation.postalCode.length === 8) {
            fetchAddress(values.contactInformation.postalCode)
        }
    }, [values.contactInformation.postalCode])

    const hasError = useMemo(() => {
        const hasValidationFiels = Object.keys(errors).length > 0
        const isMissingFields =  Object.entries(errors).some(([key, value]) => {
            return value || value !== undefined || value !== ''
        })
        return isMissingFields || hasValidationFiels
    }, [errors])

    return (
        <div className="w-full flex flex-col">
            <div className="flex items-center gap-2 font-light my-3 text-xl" onClick={() => setSection('PERSONAL')}>
                <IoIosArrowBack fontSize={20} className="cursor-pointer"/>
                Voltar
            </div>
            <h2 className="font-light text-xl mb-2">Informações de contato</h2>
            <div className="flex flex-col my-1">
                <label htmlFor="phoneNumber" className="font-light">Telefone</label>
                <Field name="contactInformation.phoneNumber" id="phoneNumber" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.contactInformation?.phoneNumber && touched.contactInformation?.phoneNumber ? 'border-red-500' : undefined}`} />
                <ErrorMessage name="contactInformation.phoneNumber" component="span" className="text-xs mt-1 text-red-500"/>
            </div>
            <div className="flex gap-[10px] my-1">
                <div className="flex flex-col w-full">
                    <label htmlFor="postalCode" className="font-light">CEP</label>
                    <Field name="contactInformation.postalCode" id="postalCode" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.contactInformation?.postalCode && touched.contactInformation?.postalCode ? 'border-red-500' : undefined}`} />
                    <ErrorMessage name="contactInformation.postalCode" component="span" className="text-xs mt-1 text-red-500"/>
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="neighborhood" className="font-light">Bairro</label>
                    <Field name="contactInformation.neighborhood" id="neighborhood" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.contactInformation?.neighborhood && touched.contactInformation?.neighborhood ? 'border-red-500' : undefined}`} />
                    <ErrorMessage name="contactInformation.neighborhood" component="span" className="text-xs mt-1 text-red-500"/>
                </div>
            </div>
            <div className="flex gap-[10px] my-1">
                <div className="flex flex-col w-full">
                    <label htmlFor="street" className="font-light">Endereço</label>
                    <Field name="contactInformation.street" id="street" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.contactInformation?.street && touched.contactInformation?.street ? 'border-red-500' : undefined}`} />
                    <ErrorMessage name="contactInformation.street" component="span" className="text-xs mt-1 text-red-500"/>
                </div>
                <div className="flex flex-col w-[20%]">
                    <label htmlFor="number" className="font-light">Número</label>
                    <Field name="contactInformation.number" id="number" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.contactInformation?.number && touched.contactInformation?.number ? 'border-red-500' : undefined}`} />
                    <ErrorMessage name="contactInformation.number" component="span" className="text-xs mt-1 text-red-500"/>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <label htmlFor="complement" className="font-light">Complemento</label>
                <Field name="contactInformation.complement" id="complement" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.contactInformation?.complement && touched.contactInformation?.complement ? 'border-red-500' : undefined}`} />
                <ErrorMessage name="contactInformation.complement" component="span" className="text-xs mt-1 text-red-500"/>
            </div>
            <div className="flex gap-[10px] my-1">
                <div className="flex flex-col w-full">
                    <label htmlFor="city" className="font-light">Cidade</label>
                    <Field name="contactInformation.city" id="city" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.contactInformation?.city && touched.contactInformation?.city ? 'border-red-500' : undefined}`} />
                    <ErrorMessage name="contactInformation.city" component="span" className="text-xs mt-1 text-red-500"/>
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="state" className="font-light">Estado</label>
                    <Field name="contactInformation.state" id="state" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.contactInformation?.state && touched.contactInformation?.state ? 'border-red-500' : undefined}`} />
                    <ErrorMessage name="contactInformation.city" component="span" className="text-xs mt-1 text-red-500"/>
                </div>
            </div>
            <div className="flex justify-center mb-[2rem] mt-[1rem]">
                <button type="submit" className="bg-[#002BB3] py-2 px-4 rounded-[5px] text-white cursor-pointer" style={{ opacity: hasError ? '0.5' : undefined }} disabled={hasError}>Registrar</button>
            </div>
        </div>
    )
}