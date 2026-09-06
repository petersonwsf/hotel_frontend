import { ROLE_OPTION, User, UserPayload } from "@/types/User.types";
import { Form, Formik } from "formik";
import InputText from "../form/InputText";
import InputSelect from "../form/InputSelect";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { CiLock } from "react-icons/ci";

interface UserFormProps {
    user?: User;
    onSubmit: (values: UserPayload) => Promise<void>;
    validationSchema?: object;
}

export default function UserForm({ user, onSubmit, validationSchema } : UserFormProps) {
    return (
        <Formik
            initialValues={{
                name: user?.name ?? '',
                login: user?.login ?? '',
                phoneNumber: user?.phoneNumber ? user?.phoneNumber !== 'Não informado' ? user.phoneNumber : '' : '',
                role: user?.role ?? 'ATTENDANT',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting}) => (
                <Form>
                    <div className='flex my-3 gap-3'>
                        <InputText label="Nome" name="name" type="text" placeholder="Insira o nome"/>
                        <InputText label="Email" name="login" type="email" icon={MdOutlineEmail} placeholder="Insira o email/login" />
                    </div>
                    <div className='flex my-3 gap-3'>
                        <InputText label="Telefone" name="phoneNumber" type="text" icon={FiPhone} placeholder="Informe seu número de telefone"/>
                        <InputSelect label="Papel" name="role" options={ROLE_OPTION}/>
                    </div>
                    <div className='flex my-3 gap-3'>
                        <InputText label="Senha" name="password" type="password" icon={CiLock} placeholder="Informe sua senha" />
                        <InputText label="Confirmar senha" name="confirmPassword" type="password" icon={CiLock} placeholder="Confirme sua senha" />
                    </div>
                    <div className="mt-[1.5rem] flex justify-end">
                        <button className={`text-[#002179] mt-[1rem] border text-white py-[.5rem] bg-[#002179] px-[2rem] cursor-pointer rounded-[7px] font-normal ${isSubmitting ? 'opacity-[.5] pointer-events-none' : ''}`}>
                            {isSubmitting ? 'Atualizando' : 'Atualizar'}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}