"use server"

import * as fs from 'fs';

export const getPin  = async () => {

    const filePath = "./pupil.txt"
    
    try {
        // Convert the buffer to a number
        const data:string = fs.readFileSync(filePath, "utf-8");
        return parseInt(data);
    } catch (err) {
        console.error('Error reading from file:', err);
    }

}