"use server"
import { writeFile } from 'fs/promises';
import { join }  from 'path';
import fs from "fs";
import path from "path";


import {pool} from '@/lib/db'
import { revalidatePath } from 'next/cache';

//import { DateTime } from 'luxon';
import { getEnabled} from "../admin/settings";

/*
function getTimeStampedName (name: string) {

  // Extract the file name and extension
  const ext = path.extname(name); // File extension
  const baseName = path.basename(name, ext); // File name without extension

  const timestamp = DateTime.now()
      .setZone('Asia/Riyadh')
      .toFormat('yyyy-MM-dd_HH-mm-ss')
      .replace(/[:.T]/g, '-');
      
  return `${baseName}_${timestamp}${ext}`
}
*/

function checkUniqueFile(dir: string, file: File) {
  
  //let name  = getTimeStampedName(file.name);
  const filePath = path.join(dir, file.name);

  while (fs.existsSync(filePath)) {
      
      // Delete the existign file
      fs.unlinkSync(filePath);

      // Append the current timestamp to the file name
      //name = getTimeStampedName(file.name);
      //filePath = path.join(dir, name);
  }

  return file.name;
}

const updateDB = async (username: string, fileName: string ) => {

  let data = null;
  let error: string | null = null;

  try {
    const result = await pool.query(`INSERT INTO upload_files (email, file_name, status, history)
VALUES ($1, $2, $3, $4)
ON CONFLICT (email, file_name) -- Assuming email and file_name are the unique keys
DO UPDATE SET 
    status = EXCLUDED.status,
    history = EXCLUDED.history
RETURNING email, file_name;`, [
      username, fileName, "In progress", {created: Date.now()}
    ]);

    data = {email: result.rows[0].email, fileName: result.rows[0].file_name}

  }
  catch(err){
    error = ((err as unknown) as Error).message;
  } finally {
    return {data, error};
  }
}

const uploadFile = async (username: string, form: FormData) => {

  let data: {email: string, fileName: string} | null = null;
  let error: string | null = null;

  try{
      const file: File | null = form.get('file') as unknown as File;
      const pin: string | null = form.get('pin') as unknown as string;

      const {data: enabledData, error: enabledError} = await getEnabled();

      if (enabledError) {
        throw new Error(enabledError)
    }

      if (enabledData?.enabled == "off") {
          throw new Error("Uploads are not enabled")
      }


      if (!file){
          throw new Error("No file to upload");
      }

      

      console.log(file, username, pin);
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes);

      const dir = join ('./', 'tmp', username);
      
      // Check and create the directory
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log('Directory created:', dir);
      } else {
        console.log('Directory already exists:', dir);
      }

      const uniqueName = checkUniqueFile(dir, file);

      const path = join(dir, uniqueName);

      await writeFile(path, buffer);
      console.log(`File written to ${path}`);

      const {data: fileUploadData, error} = await updateDB(username, uniqueName);

      if (error) {
        throw new Error(error);
      }

      console.log(data);
      
      data = fileUploadData;

      revalidatePath(`/${username}`)

  }
  catch(err){
      error = err as unknown as string;
  }
  finally {
    return {data, error};
  }

    
} 


//const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export const upload = async (previousState: unknown, form: FormData) => {


  let error: string | null  = null;

  try {
    const username = form.get("username");

  if (username == null) {
    throw new Error("Username set to null");
  }

  const {data, error} = await uploadFile((username || "") as string, form);

  if (error){
    throw error;
  }

  console.log("upload:: email", username);

  //await sleep(5000);

  revalidatePath(`/${username}`);

  console.log(data, error)
  } catch (err){
    console.error(err)
    error = ((err as unknown) as Error).message;
  }
  finally {
    return {data: !error ? true : null, error}
  }
  

  

}