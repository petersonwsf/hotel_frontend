"use client";
import { Field, ErrorMessage, Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from 'yup'
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { UserRegister } from "@/types/User.types";

const validationSchema = Yup.object({
    login: Yup.string().email('Email inválido').required('Email obrigatório'),
    password: Yup.string().required('Senha é obrigatória').min(8, 'Senha deve conter 8 caracteres no mínimo')
})

export default function LoginForm() {

    const { login } = useAuth()

    const router = useRouter()

    return (
        <Formik
            initialValues={{
                login: '',
                password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={login}
        >
            {({errors, touched, isSubmitting }) => (
                <Form className="w-[80%]">
                    <div className="flex flex-col">
                        <label htmlFor="login">Email</label>
                        <Field type="email" name="login" id="login" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.login && touched.login ? 'border-red-500' : undefined}`} />
                        <ErrorMessage name="login" component="span" className="text-red-500 text-xs mt-1"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Senha</label>
                        <Field type="password" name="password" id="password" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.password && touched.password ? 'border-red-500' : undefined}`} />
                        <ErrorMessage name="password" component="span" className="text-red-500 text-xs mt-1"/>
                    </div>
                    <p className="text-[#002BB3] my-2">Esqueceu a senha?</p>
                    <a onClick={() => router.push("/register")} className="text-[#002BB3] my-2 cursor-pointer">Não possui conta? Registre-se</a>
                    <div className="w-full text-center my-5">
                        <button type="submit" className="bg-[#002BB3] py-2 px-4 rounded-[5px] text-white cursor-pointer" disabled={isSubmitting} style={{opacity: isSubmitting ? '0.5' : undefined}}>{isSubmitting ? 'Aguarde' : 'Login'}</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}