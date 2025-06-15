"use server"

import {redirect} from "next/navigation";

export const navigate = async (formData: FormData) =>{

    const userName = formData.get("userName");

    redirect(`/${userName}`)    

    return;
}