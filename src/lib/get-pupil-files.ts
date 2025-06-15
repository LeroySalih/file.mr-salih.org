"use server"

import {pool }from "@/lib/db";


export type UploadFile = {
    email : string,
    file_name: string, 
    status: string, 
    modified: Date,
    history: object 
}

export type UploadFiles = UploadFile[];

export type GetPupilFiles = {
    data: null | UploadFiles,
    error: null | string
}

export const getPupilFiles = async (email: string) : Promise <GetPupilFiles>=> {
 
    "use server"

    let data = null;
    let error = null;

    
    try {
        const result = await pool.query("SELECT email, file_name, status, modified, history FROM upload_files WHERE email= $1 ", [email])
    
        data = result.rows as UploadFiles;
    } catch(err) {
        error = ((err as unknown) as Error).message;
        console.error(error);
    } finally {
        return {data, error}
    }
}