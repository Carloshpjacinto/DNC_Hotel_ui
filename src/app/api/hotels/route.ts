"use server"
import axios from '@/api'
import { Hotel, HotelPagination } from '@/types/Hotel';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export async function getHotels(page: number, limit: number): Promise<HotelPagination> {
    const accessToken = (await cookies()).get('access_token')?.value;
    
    const { data } = await axios.get('/hotels', {
        params: { page, limit },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return data;
}

export async function getHotelDetail(id: number): Promise<Hotel> {
    const accessToken = (await cookies()).get('access_token')?.value;
    
    const { data } = await axios.get(`/hotels/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return data;
}

export async function getHotelByOwner(): Promise<Hotel[]> {
    const accessToken = (await cookies()).get('access_token')?.value;
    
    const { data } = await axios.get('/hotels/owner', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createHotel(prevState: any, formData: FormData) {
    const accessToken = (await cookies()).get('access_token')?.value;
    if (!accessToken) redirect('/login');

    try {
        const image = formData.get('image') as File;
        const price = formData.get('price') as string;

        const payload = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(
                price
                    .replaceAll('R$', '')
                    .replaceAll(/\s/g, '')
                    .replaceAll('.', '')
                    .replaceAll(',', '.')
            ),
            address: formData.get('address')
        }
    
        const { data } = await axios.post('/hotels', payload, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
    
        const hotelId = data.id;
    
        if (image?.size) {
            const imageFormData = new FormData();
            imageFormData.append('image', image);
    
            await axios.patch(`/hotels/image/${hotelId}`, imageFormData, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        }
    } catch (error) {
        console.log('tratar erro: ', error);
        return {
            ...prevState,
            message: 'Não foi possível cadastrar o hotel',
            error: true
        }
    }

    redirect('/minhas-hospedagens')
}
