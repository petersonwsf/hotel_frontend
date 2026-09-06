"use client"
import Modal from "@/components/ui/Modal";
import { useUser } from "@/hooks/useUser";
import { User, UserPayload } from "@/types/User.types";
import { handleToast } from "@/utils/handleToast";
import { useRouter } from "next/navigation";

import * as Yup from 'yup'
import UserProfile from "@/components/user/UserProfile";
import UserForm from "@/components/user/UserForm";

interface ModalEditUserProps {
    editMode: boolean;
    user?: User;
    open: boolean;
    onClose: () => void;
}

export default function ModalUser({ user, open, onClose, editMode = false } : ModalEditUserProps) {

    const { editUser, createUser } = useUser()
    const router = useRouter()

    const handleEditUser = async (data : UserPayload) => {
        const payload = {
            name: data.name,
            login: data.login,
            role: data.role,
            phoneNumber: data.phoneNumber,
            password: data.password,
        }
        try {
            await editUser(payload, user!.id)
            handleToast('Usuário atualizado com sucesso', 'success')
            onClose()
            router.refresh()
        } catch (error: any) {
            handleToast(error.response.data.message, 'error')
        }
    }

    const handleCreateUser = async (data: UserPayload) => {
        const payload = {
            name: data.name,
            login: data.login,
            role: data.role,
            phoneNumber: data.phoneNumber,
            password: data.password,
        }
        try {
            await createUser(payload)
            handleToast('Usuário criado com sucesso', 'success')
            onClose()
            router.refresh()
        } catch (error: any) {
            handleToast(error.response.data.message, 'error')
        }
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

        password: Yup.string().when([], {
            is: () => editMode,
            then: (schema) =>
            schema
                .optional()
                .transform((value) => (value === '' ? undefined : value))
                .min(8, 'A senha deve conter no mínimo 8 caracteres'),
            otherwise: (schema) =>
            schema
                .required('A senha é obrigatória')
                .min(8, 'A senha deve conter no mínimo 8 caracteres'),
        }),

        confirmPassword: Yup.string().when('password', {
            is: (val: string | undefined) => Boolean(val && val.length > 0),
            then: (schema) =>
                schema
                .required('A confirmação de senha é obrigatória')
                .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
            otherwise: (schema) => schema.optional(),
        }),
    });

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            title={(editMode && user) ? '' : 'Adicionar usuário'}
            size="3xl"
        >
            {(editMode && user) && <UserProfile user={user} imEditingMySelf={false} />}
            <UserForm validationSchema={validationSchema} user={user} onSubmit={user ? handleEditUser : handleCreateUser} />
        </Modal>
    )
}