import {Input}  from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {navigate} from "./navigate";

import Link from "next/link"


const Page = async () => {

    

    return <div className="flex items-center justify-center h-screen">
                <div className="w-[400px] text-xl">
                    
                    <div className="font-mono text-3xl m-4">file.mr-salih.org</div>                    
                    <form action={navigate}>
                    <div className="flex flex-row">
                    <Input className="m-4 font-mono text-3xl" name="userName" placeholder="Enter your email"></Input>
                    
                    <Button className="m-4">Go!</Button>
                    </div>
                    </form>

                    <div className="m-4 font-mono text-lg">
                        <Link href="/downloads">Downloads</Link>
                    </div>
                    
                </div>
                
                
            </div>
            
}


export default Page;