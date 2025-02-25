"use server"
import axios from '@/api'
import { Hotel, HotelsList } from '@/types/Hotel';
import { cookies } from 'next/headers'

export async function getHotels(currentPage: string, limit: number): Promise<HotelsList> {
    const access_token = (await cookies()).get('access_token')?.value;

    const { data } = await axios.get('/hotels', {
        params: { page: currentPage, limit },
        headers: { Authorization: `Bearer ${access_token}` }
    });

    return data;
}

export async function getHotelById(id: number): Promise<Hotel> {
    const access_token = (await cookies()).get('access_token')?.value;

    const { data } = await axios.get(`/hotels/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` }
    });

    return data;
}
