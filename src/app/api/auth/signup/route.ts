"use server"
import axios from "@/api";
import { redirect } from "next/navigation";

export async function signup(prevState: any, formData: FormData) {
    try {
        const avatar = formData.get('avatar') as any;
        const formDataAvatar = new FormData()
        formDataAvatar.set('avatar', avatar)
    
        const payload = {
            "name": formData.get('name'),
            "email": formData.get('email'),
            "password":  formData.get('password'),
            "role":  formData.get('role')
        }
    
        const { data: { access_token } } = await axios.post('/auth/register', payload);
    
        if (avatar) {
            const avatarData = await axios.post('/users/avatar', formDataAvatar, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
        }
    } catch (error) {
        console.log('trata o erro', {error})
        return { ...prevState, message: 'Não foi possível cadastrar o usuário' }
    }
    
    redirect('/login')
}
