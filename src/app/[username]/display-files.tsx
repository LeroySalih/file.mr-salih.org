"use server"


import { listFiles } from "./list-files";
import Link from "next/link";

const DisplayFiles = async ({username}: {username: string}) => {

    const f = await listFiles(username || "");

    return <>
        
            <div className="flex flex-col">
            {
                f.sort((a, b) => a > b ? -1 : 1).map((f) => <div key={Math.random()}>
                    <Link key={Math.random()} href={`api/download/${username}/${f}`}>{decodeURI(f.split('/').slice(-1)[0])}</Link>
                    </div>)
            }
            </div>
            
            </>
}


export default DisplayFiles;