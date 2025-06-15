"use server"

import {getEnabled} from "./settings"
import DisplayAdminForm from "./displayAdminForm"

import {cookies} from "next/headers";
import {getServerDiskSpace} from "@/lib/get-server-disk-space";

const Page = async () => {

    // ensure that the page is dynamic 
    const cookieStore = await cookies()
    const theme = cookieStore.get('theme')
    console.log(theme);

    const {data, error} = await getEnabled();

    console.log("Data is ", data);

    const {data: diskSpaceData, error: diskSpaceError} = await getServerDiskSpace();

    console.log(diskSpaceData, diskSpaceError);
    
    return <div className="w-96 m-auto">
        <div>File Upload: Admin Page</div>
        <div>{error}</div>
        <div>Uploads are {data?.enabled}</div>
        <div>Free space: {diskSpaceData?.free}</div>
        <div className="text-[40px] text-center p-4">file.mr-salih.org</div>
        

        <div>
        <DisplayAdminForm />
        </div>
    </div>
}

export default Page;