"use client"
import { useToast } from "@/hooks/use-toast"
import { upload} from "./upload";

import { useActionState, useEffect } from "react";
import Spinner from "@/components/spinner.gif";
import Image from "next/image";

const DisplayUpload = ({username}: {username: string}) => {

    //const [isLoading, setIsLoading] = useState<boolean>(false);
    const [uploadState, action, isPending] = useActionState(upload, null)
    const { toast } = useToast();

    const doUpload = async (formData: FormData) => {
      try{
        //console.log(`Uploading ${JSON.stringify(formData)}`);
        //setIsLoading(true);

        action(formData);
        
        
  
      } catch(err) {
        const error = (err as unknown) as Error
        console.log("Failed!")
        
        toast(
          {
            variant: "destructive",
            title: "File Upload",
            description: "File Error:: " + error.message,
          }
        )
      }

    } 

    useEffect(() => {
      console.log("New Upload State", uploadState)

      if (uploadState && uploadState.data) { 
        toast({
          variant: "success",
          title: "File Upload",
          description: "File Uploaded",
        });
      }

      if (uploadState && uploadState.error) { 
        toast({
          variant: "destructive",
          title: "File Upload Error",
          description: `${uploadState.error}`,
        });
      }

    }, [uploadState])

    return (
  <form action={doUpload} className="flex flex-col w-60">
    <div>Upload for {username}</div>
    
    <input name="username" value={username} readOnly ></input>
    
    { !isPending && <div  className="flex flex-row h-24">
      <input type="file" name="file"></input>
      <input disabled={isPending} className="bg-green-300 m-4 p-4 rounded-md border-green-500 border-2" type="submit" value={isPending ? "Uploading" : "Upload File"}></input>
    </div>
    }
    { isPending &&
    <div className="h-24 flex flex-row">
    <div className="text-green-600 text-4xl h-24">Uploading</div> 
      <Image className="h-[50px] w-[50px]" src={Spinner} alt="spinner"></Image>
      </div>
    }
  </form>
    )
}


export default DisplayUpload;