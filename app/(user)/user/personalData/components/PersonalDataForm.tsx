"use client"
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { Client, ClientUpdate } from '@/types/Client.types'
import InputText from '@/components/form/InputText';
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";
import { validateCPF } from '@/utils/validateCPF';

interface PersonalDataForm {
    client: Client;
    onSubmit: (values: ClientUpdate) => void;
}

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

const validationSchema = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email("Digite um email válido").required("Email é obrigatório"),
    phoneNumber: Yup.string().required("Telefone é obrigatório").min(10, "Digite o telefone com formato DDD + XXXXXXXX"),
    pin: Yup.string().required("CPF é obrigatório").test('is-cpf-valid', 'CPF inválido', (value) => validateCPF(value)),
    dateOfBirth: Yup.date().max(eighteenYearsAgo, 'Você deve ter no mínimo 18 anos').required('Data de nascimento é obrigatória'),
})

export default function PersonalDataform({ client, onSubmit } : PersonalDataForm) {

    return (
        <div className='w-full mt-[2rem] rounded-lg border-1 border-gray-300 p-[2rem]'>
            <Formik
            validationSchema={validationSchema}
                initialValues={{
                    name: client.name ?? '',
                    email: client.email ?? '',
                    pin: client.pin ?? '',
                    dateOfBirth: client.dateOfBirth ?? '',
                    phoneNumber: client.contactInformation.phoneNumber ?? ''
                }}
                onSubmit={(values) => onSubmit(values)}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputText label="Nome" name="name" />
                        <div className='flex my-3 gap-3'>
                            <InputText label="Email" name="email" type="email" icon={MdOutlineEmail} />
                            <InputText label="Telefone" name="phoneNumber" type="text" icon={FiPhone} />
                        </div>
                        <div className='flex my-3 gap-3'>
                            <InputText label="CPF" name="pin" type="text" icon={HiOutlineIdentification} />
                            <InputText label="Data de nascimento" name="dateOfBirth" type="date" icon={CiCalendar} />
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