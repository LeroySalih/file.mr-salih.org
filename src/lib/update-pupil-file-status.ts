"use server"

import {pool }from "@/lib/db";


export type UpdateFile = {
    email : string,
    file_name: string, 
    status: string
}

export type UpdateFiles = UpdateFile[];

export type UpdatePupilFile = {
    data: null | UpdateFiles,
    error: null | string
}

export const updatePupilFileStatus = async (email: string, file_path: string, status: string) : Promise <UpdatePupilFile>=> {
 
    //let data = null;
    let error = null;
   
    try {
        await pool.query("UPDATE upload_files set status=$3 WHERE email= $1 and file_name=$2", [email, file_path, status])
    
        //data = result.rows as UploadFiles;
    } catch(err) {
        error = ((err as unknown) as Error).message;
        console.error(error);
    } finally {
        return {data: null, error}
    }
}