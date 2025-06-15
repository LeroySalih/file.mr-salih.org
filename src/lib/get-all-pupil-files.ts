"use server"

import {pool }from "@/lib/db";


export type UploadFile = {
    email : string,
    file_name: string, 
    status: string, 
    modified: Date,
    history: object,
    form: string | null 
}

export type UploadFiles = UploadFile[];

export type GetPupilFiles = {
    data: null | UploadFiles,
    error: null | string
}

export const getAllPupilFiles = async () : Promise <GetPupilFiles>=> {
 
    "use server"

    let data = null;
    let error = null;

    
    try {
        const result = await pool.query(`select uf.email as email, uf.file_name as file_name, uf.status as status, uf.modified as modified, uf.history, p.form as form 
from upload_files uf 
left join pupils p on lower(uf.email) = lower (p.email)`)
    
        data = result.rows as UploadFiles;
    } catch(err) {
        error = ((err as unknown) as Error).message;
        console.error(error);
    } finally {
        return {data, error}
    }
}