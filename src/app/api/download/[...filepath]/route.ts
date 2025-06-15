import { readFile } from "fs/promises";
import path from "path";

import mime from "mime";

//export const fetchCache = 'force-no-store';
export const fetchCache = 'default-no-store'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ filepath: string[] }> }
) {

    
const filePaths = (await params).filepath;

    
const filePathEncoded = filePaths.reduce((p, c) => (`${p}/${c}`), '' )
const fPath = decodeURIComponent(filePathEncoded);

console.log("Downloading file", fPath);
console.log("Mime Type", mime.getType("./tmp/" + fPath));

// process.cwd() is the root of the Next.js app
const buffer = await readFile(path.join(process.cwd(), "./tmp/", fPath));

// set the headers to tell the browser to download the file
const headers = new Headers();
// remember to change the filename `test.pdf` to whatever you want the downloaded file called
headers.append("Content-Disposition", `attachment; filename="${filePaths[filePaths.length - 1]}"`);
headers.append("Content-Type", mime.getType("./" + fPath) || "");

return new Response(buffer, {
    headers,
});
}