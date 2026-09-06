"use client"

import UserForm from "@/components/user/UserForm";
import UserProfile from "@/components/user/UserProfile";
import { useAuthContext } from "@/contexts/AuthContext";
import { useUser } from "@/hooks/useUser";
import { User, UserPayload } from "@/types/User.types"
import { handleToast } from "@/utils/handleToast"; 
import { useRouter } from "next/navigation";
import * as Yup from 'yup'

interface AccountDataProps {
    user: User;
}

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Nome é obrigatório')
        .min(2, 'O nome deve conter no mínimo 2 caracteres'),

    login: Yup.string()
        .email('Email inválido')
        .required('Email é obrigatório'),

    phoneNumber: Yup.string()
        .required('Número de telefone é obrigatório')
        .min(10, 'Número inválido'),

    role: Yup.string()
        .required('Papel é obrigatório'),

    password: Yup.string()
        .transform((value) => (value === '' ? undefined : value))
        .min(8, 'A senha deve conter no mínimo 8 caracteres')
        .optional(),

    confirmPassword: Yup.string()
        .transform((value) => (value === '' ? undefined : value))
        .when('password', {
            is: (val: string | undefined) => Boolean(val && val.length > 0),
            then: (schema) =>
                schema
                    .required('A confirmação de senha é obrigatória')
                    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
            otherwise: (schema) => schema.optional(),
        }),
});

export default function AccountData({ user } : AccountDataProps) {

    const router = useRouter()

    const { editUser } = useUser()
    const { updateUser } = useAuthContext()

    const handleEditUser = async (data : UserPayload) => {
        const payload = {
            name: data.name,
            login: data.login,
            role: data.role,
            phoneNumber: data.phoneNumber,
            password: data.password,
        }
        try {
            const response = await editUser(payload, user!.id)
            updateUser(response)
            handleToast('Usuário atualizado com sucesso', 'success')
            router.refresh()
        } catch (error: any) {
            handleToast(error.response.data.message, 'error')
        }
    }

    return (
        <div>
            <UserProfile user={user} imEditingMySelf={true} />
            <UserForm user={user} onSubmit={handleEditUser} validationSchema={validationSchema} />
        </div>
    )
}