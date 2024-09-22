"use server";
import { cookies } from "next/headers";

export default async function logoutHandler( ) {
    const cookieStore  = await cookies();
    const token = cookieStore.getAll().forEach((cookie) => {
        cookieStore.delete(cookie.name);
    });
    return token;
}