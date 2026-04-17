"use client";
import { Field, ErrorMessage, Formik, Form } from "formik";
import Link from "next/link";
import * as Yup from 'yup'

interface LoginForm {
    handleSubmit: () => void;
}

const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('Email obrigatório'),
    password: Yup.string().required('Senha é obrigatória').min(8, 'Senha deve conter 8 caracteres no mínimo')
})

export default function LoginForm() {

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
        >
            {({errors, touched, isSubmitting}) => (
                <Form className="w-[80%]">
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" id="email" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.email && touched.email ? 'border-red-500' : undefined}`} />
                        <ErrorMessage name="email" component="span" className="text-red-500 text-xs mt-1"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Senha</label>
                        <Field type="password" name="password" id="password" className={`p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] ${errors.password && touched.password ? 'border-red-500' : undefined}`} />
                        <ErrorMessage name="password" component="span" className="text-red-500 text-xs mt-1"/>
                    </div>
                    <p className="text-[#002BB3] my-2">Esqueceu a senha?</p>
                    <Link href="/register" className="text-[#002BB3] my-2">Não possui conta? Registre-se</Link>
                    <div className="w-full text-center my-5">
                        <button type="submit" className="bg-[#002BB3] py-2 px-4 rounded-[5px] text-white cursor-pointer" disabled={isSubmitting}>{isSubmitting ? 'Aguarde' : 'Login'}</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}