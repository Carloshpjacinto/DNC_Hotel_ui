"use server"
import axios from "@/api";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function forgotPassword(prevState: any, formData: FormData) {
    try {
        const payload = { "email": formData.get('email') }
    
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data } = await axios.post('/auth/forgot-password', payload);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return { ...prevState, message: 'Erro ao enviar e-mail' }
    }

    redirect('/recuperar-senha')    
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function recoverPassword(prevState: any, formData: FormData) {
    try {
        const payload = {
            "token": formData.get('token'),
            "password": formData.get('password'),
        }
    
        const { data } = await axios.patch('/auth/reset-password', payload);

        return { success: true, result: data }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return { ...prevState, message: 'Erro ao atualizar a senha' }
    }

    redirect('/recuperar-senha')    
}
