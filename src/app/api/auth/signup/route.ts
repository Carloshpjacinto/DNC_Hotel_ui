"use server"
import axios from "@/api";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signup(prevState: any, formData: FormData) {
    try {
        const avatar = formData.get('avatar') as File;
        const formDataAvatar = new FormData()
        formDataAvatar.set('avatar', avatar)
    
        const payload = {
            "name": formData.get('name'),
            "email": formData.get('email'),
            "password":  formData.get('password'),
            "role":  formData.get('role')
        }
        const { data: { access_token } } = await axios.post('/auth/register', payload);
    
        if (avatar.size) {
            await axios.post('/users/avatar', formDataAvatar, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // console.log('trata o erro', {error})
        
        return { ...prevState, error: true, message: 'Não foi possível cadastrar usuário' }
    }
    
    redirect('/login')
}
