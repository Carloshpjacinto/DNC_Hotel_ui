import { User } from "./User"

export type Hotel = {
  "id": number,
  "name": string,
  "description": string,
  "address": string,
  "image": string,
  "price": number,
  "ownerId": number,
  "createdAt": string,
  "updatedAt": string,
  "owner": User
}

export type HotelsList = {
  "total": number,
  "page": number,
  "per_page": number,
  "data": Hotel[];
}
