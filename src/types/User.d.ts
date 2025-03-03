export type Role = 'ADMIN' | 'USER'

export type User = {
    id: number,
    email: string,
    name: string,
    role: Role,
    avatar: string | null,
    createdAt: string,
    password?: string,
}
