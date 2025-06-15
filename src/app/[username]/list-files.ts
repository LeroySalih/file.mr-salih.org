"use server"

import { join }  from 'path';
import fs from 'fs';


export const listFiles = async (email: string) => {

    let files: string[] = [];

    try{
        const dir = join ('./', 'tmp', email);

        console.log("Checking for  dir: ", dir);

        files = fs.readdirSync(dir).toString().split(',');

        console.log(files);

        return files;
    }
    catch(err) {
        console.error(((err as unknown) as Error).message);
    }
    finally {
        return files;
    }
    
    
}