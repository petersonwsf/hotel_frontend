"use client";
import { Field, ErrorMessage, Formik, Form } from "formik";
import Link from "next/link";
import * as Yup from 'yup'
import useAuth from "@/hooks/useAuth";
import { handleToast } from "@/utils/handleToast";
import { useEffect } from "react";

const validationSchema = Yup.object({
    login: Yup.string().email('Email inválido').required('Email obrigatório'),
    password: Yup.string().required('Senha é obrigatória').min(8, 'Senha deve conter 8 caracteres no mínimo')
})

export default function LoginForm() {

    const { stateLogin, login, isPendingLogin } = useAuth()

    useEffect(() => {
        if (stateLogin?.erro) {
            handleToast(stateLogin.erro, 'error')
        }
    }, [stateLogin?.erro])

    return (
        <Formik
            initialValues={{
                login: '',
                password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={login}
        >
            {({errors, touched }) => (
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
                    <Link href="/register" className="text-[#002BB3] my-2">Não possui conta? Registre-se</Link>
                    <div className="w-full text-center my-5">
                        <button type="submit" className="bg-[#002BB3] py-2 px-4 rounded-[5px] text-white cursor-pointer" disabled={isPendingLogin} style={{opacity: isPendingLogin ? '0.5' : undefined}}>{isPendingLogin ? 'Aguarde' : 'Login'}</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}