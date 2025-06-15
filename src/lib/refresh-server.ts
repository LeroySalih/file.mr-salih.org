"use server"

import { revalidatePath } from "next/cache"

export const refreshServer = async () => {
    revalidatePath("/")
}