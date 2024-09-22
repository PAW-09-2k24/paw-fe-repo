"use server";
import { cookies } from "next/headers";

export default async function cookiesHandler( ) {
    const cookieStore  = await cookies();
    const token = cookieStore.get("token")?.value.toString();
    return token;
}