"use client"
import InputText from "@/components/form/InputText"
import { Formik, Form, useFormikContext } from "formik"
import * as Yup from 'yup'
import { ContactInformation, UFS } from "@/types/Client.types"

import { CiSearch } from "react-icons/ci";
import InputSelect from "@/components/form/InputSelect";
import { useEffect } from "react"
import { handleToast } from "@/utils/handleToast"
import { getAddress } from "@/services/address"

const validationSchema = Yup.object({
    postalCode: Yup.string().required('CEP é obrigatório').length(8, "CEP inválido"),
    street: Yup.string().required("Endereço é obrigatório"),
    number: Yup.string(),
    complement: Yup.string(),
    neighborhood: Yup.string().required("Bairro é obrigatório"),
    city: Yup.string().required("Cidade é obrigatória"),
    state: Yup.string().required("UF é obrigatório").length(2, "Digite a sigla do estado")
})

interface AddressFormProps {
    address: ContactInformation;
    onSubmit: (values: Partial<ContactInformation>) => void
}

const usePostalCodeObserver = () => {
    const { values, setFieldValue, touched } = useFormikContext<ContactInformation>()
    useEffect(() => {
        const fetchAddress = async () => {
            const cleanCEP = (values.postalCode || "").replace(/\D/g, "");
            if (cleanCEP.length === 8 && touched.postalCode) {
                try {
                    const response = await getAddress(cleanCEP)
                    const data = response.data
                    if (data) {
                        setFieldValue("street", data.logradouro || "");
                        setFieldValue("neighborhood", data.bairro || "");
                        setFieldValue("city", data.localidade || "");
                        setFieldValue("state", data.uf || "");
                    }
                } catch (error : any) {
                    handleToast("Erro ao buscar informações por CEP", "error")
                }
            }
        }
        fetchAddress()
    }, [values.postalCode, setFieldValue])
}

function PostalCodeWatcher() {
    usePostalCodeObserver()
    return null
}

export default function AddressForm({ address, onSubmit } : AddressFormProps) {

    return (
        <div className="py-[1rem] px-[1.5rem]">
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    street: address.street ?? '',
                    neighborhood: address.neighborhood ?? '',
                    number: address.number ?? '',
                    city: address.city ?? '',
                    state: address.state ?? '',
                    complement: address.complement ?? '',
                    postalCode: address.postalCode ?? '',
                }}
                onSubmit={(values) => onSubmit(values)}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <PostalCodeWatcher />
                        <div className="flex gap-3">
                            <div className="w-[30%]">
                                <InputText name="postalCode" label="CEP" placeholder="00000-000" icon={CiSearch}/>
                            </div>
                            <div className="w-[70%]">
                                <InputText name="street" label="Endereço" placeholder="Ex: Rua da Aurora"/>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <div className="w-[40%]">
                                <InputText name="number" label="Número" placeholder="123..."/>
                            </div>
                            <InputText name="complement" label="Complemento" placeholder="Apto, Bloco, etc."/>
                            <InputText name="neighborhood" label="Bairro" placeholder="Ex: Jardins"/>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <div className="w-[70%]">
                                <InputText name="city" label="Cidade" placeholder="Ex: São Paulo" />
                            </div>
                            <div className="w-[30%]">
                                <InputSelect options={UFS} name="state" label="UF" placeholder="PE, PB, CE, etc."/>
                            </div>
                        </div>
                        <div className="mt-[1.5rem] flex justify-end">
                            <button className={`text-[#002179] mt-[1rem] border text-white py-[.5rem] bg-[#002179] px-[2rem] cursor-pointer rounded-[7px] font-normal ${isSubmitting ? 'opacity-[.5] pointer-events-none' : ''}`}>{isSubmitting ? 'Atualizando...' : 'Atualizar informações'}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}