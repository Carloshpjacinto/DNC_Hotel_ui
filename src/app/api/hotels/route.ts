"use server"
import axios from '@/api'
import { Hotel, HotelPagination } from '@/types/Hotel';
import { cookies } from 'next/headers'

export async function getHotels(page: number, limit: number): Promise<HotelPagination> {
    const access_token = (await cookies()).get('access_token')?.value;

    const { data } = await axios.get('/hotels', {
        params: { page, limit },
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

export async function getHotelDetail(id: number): Promise<Hotel> {
    const accessToken = (await cookies()).get('access_token')?.value;
    
    const { data } = await axios.get(`/hotels/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return data;
}
