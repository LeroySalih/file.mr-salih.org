"use server"

import * as fs from 'fs';

export const setPin  = async (formData: FormData) => {

    const adminPin = formData.get('adminPin')

    if (adminPin !== process.env.ADMIN_PIN){
        return {ok: false, msg: "Invalid Admin Pin"}
    }

    const filePath = "./pupil.txt"
    const number = parseInt(((Math.random() + 0.00001) * 100000).toString());

    try {
        // Convert the number to a string and write to the file synchronously
        fs.writeFileSync(filePath, number.toString());
        console.log('Number written to file successfully!');
        return {ok: true, msg: "PIN Updated"}
    } catch (err) {
        console.error('Error writing to file:', err);
        return {ok: false, msg: err}
    }

}