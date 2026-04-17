"use client";
import { ContactInformation } from "@/types/ContactInformation";
import { useState } from "react"
import { Formik, Form } from "formik";
import PersonalDataForm from "./PersonalDataForm";
import Link from "next/link";
import ContactInformationForm from "./ContactInformationForm";
import * as Yup from 'yup'

export interface UserRegister {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string | Date;
    pin: string;
    contactInformation: ContactInformation;
}

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

const validationSchem = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string().min(8, 'Senha deve conter no mínimo 8 caracteres').required('Senha é obrigatória'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'As senhas não coincidem').required('Confirmação de senha é obrigatória'),
    pin: Yup.string().required('CPF é obrigatório').length(11, 'Número de CPF inválido'),
    dateOfBirth: Yup.date().max(eighteenYearsAgo, 'Você deve ter no mínimo 18 anos').required('Data de nascimento é obrigatória'),
    contactInformation: Yup.object().shape({
        phoneNumber: Yup.string().min(11, 'Telefone inválido').required('Telefone é obrigatório'),
        street: Yup.string().required('Nome da rua é obrigatório'),
        neighborhood: Yup.string().required('Bairro é obrigatório'),
        number: Yup.string().optional(),
        city: Yup.string().required('Cidade é obrigatório'),
        postalCode: Yup.string().length(8, 'CEP inválido').required('CEP é obrigatório'),
        complement: Yup.string().optional(),
        state: Yup.string().length(2, 'Estado deve conter somente a sigla').required('Estado é obrigatório')
    })
})

export type FormSection = 'PERSONAL' | 'CONTACT'

export default function FormRegister() {
    
    const [section, setSection] = useState<FormSection>('PERSONAL')
    
    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                dateOfBirth: '',
                pin: '',
                contactInformation: {
                    phoneNumber: '',
                    street: '',
                    neighborhood: '',
                    number: '',
                    postalCode: '',
                    city: '',
                    complement: '',
                    state: ''
                }
            }}
            validationSchema={validationSchem}
            onSubmit={(values : UserRegister) => console.log(values)}
        >
            <Form className="w-[80%]">
                {section === 'PERSONAL'  ? (
                    <PersonalDataForm setSection={setSection} />
                ) : (
                    <ContactInformationForm setSection={setSection} />
                )}
                <Link href="/login" className="text-[#002BB3] my-2">Já possui conta? Faça login</Link>
            </Form>
        </Formik>
    )
}