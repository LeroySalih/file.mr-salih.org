"use server"


//import path from "path";
import { statfs } from "fs/promises";


export const getServerDiskSpace = async () => {
    let data, error = null;

    try {

        // Use dynamic import to load `diskusage` at runtime
        //const diskusage = await import("diskusage");

        // Get the root directory (change if needed)
        const diskPath = process.platform === "win32" ? "C:\\" : "/";

        // Get disk usage details
        const stats = await statfs(diskPath);

        // Extract disk usage details
        //const total = stats.blocks * stats.bsize;
        const free = stats.bfree * stats.bsize;
        //const available = stats.bavail * stats.bsize;
        //const used = total - free;

        data = { free : (free / (1024 ** 3)).toFixed(2) + " GB"};

    }
    catch(err){
        console.log(err);
        error = ((err as unknown) as Error).message;
    }
    finally {
        return {data, error}
    }
} 