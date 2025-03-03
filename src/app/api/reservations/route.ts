"use server"
import axios from '@/api'
import { Reservation } from '@/types/Reservation';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { getHotelDetail } from '../hotels/route'; 

export async function reserveHotelById(prevState: any, formData: FormData) {
    let reservationId;

    const accessToken = (await cookies()).get('access_token')?.value;
    if (!accessToken) redirect('/login');
    
    try {
        const payload = {
            hotelId: Number(formData.get('hotelId')),
            checkIn: formData.get('checkIn'),
            checkOut: formData.get('checkOut'),
        }
    
        const {data} = await axios.post('/reservations', payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        reservationId = data.id;
    } catch (error) {
        console.log({error})
        return { ...prevState, message: 'Não foi possível realizar a reserva', error: true }
    }

    redirect(`/reservas/${reservationId}/sucesso`)
}

export async function getReservationById(id: number): Promise<Reservation> {
    const accessToken = (await cookies()).get('access_token')?.value;
    if (!accessToken) redirect('/login');
    
    const { data } = await axios.get(`/reservations/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    const hotel = await getHotelDetail(data.hotelId)

    return { ...data, hotel };
}
