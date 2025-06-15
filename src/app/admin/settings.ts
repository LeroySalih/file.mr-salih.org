"use server"

import { revalidatePath } from 'next/cache';
import {pool} from "@/lib/db"


export const getEnabled = async () => {

    let data = null;
    let error = null;

    try {

        
        const result = await pool.query("SELECT value from upload_files_settings where setting='enabled'; ")

        data = {enabled: result.rows[0].value};

        console.log("rows", data)
        

    }
    catch(err) {
        
        error = ((err as unknown) as Error).message
        console.log("Error", err)
    } finally {
        return {data, error}
    }
}

export const updateEnabled = async(enabled: string) => {
    
    const data = null;
    let error = null;

     
    try{
        
        await pool.query("UPDATE upload_files_settings SET value=$1 WHERE setting='enabled'; ", [enabled === "true" ? "on" : "off"])

        revalidatePath("./admin")

    } catch(err) {
        
        error = ((err as unknown) as Error).message
        console.error(error);
    } finally {
        return {data, error}
    }
    
   
} 

export const updateSettings = async (formData: FormData) => {

    const data = null;
    let error = null;

    try{

        const enabled = formData.get("enabled");
        const adminPin = formData.get("adminPin");

        if (adminPin != "2273") {
            throw new Error("Incorrect admin pin");
        }
    
        const {error: enabledError} = await updateEnabled(enabled as string || "off");

        if (enabledError) {
            throw new Error(enabledError);
        }

    } catch(err) {
        error = ((err as unknown) as Error).message
    } finally {
        revalidatePath("./admin")
        return {data, error}
    }
}