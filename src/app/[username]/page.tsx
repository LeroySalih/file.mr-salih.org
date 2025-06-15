



import DisplayUpload from "./display-upload"


import {getEnabled} from "../admin/settings";

import { getPupilFiles} from "@/lib/get-pupil-files";


import { columns} from "../../components/display-files-grid/columns";
import { DisplayFilesGrid } from "../../components/display-files-grid";

const Home = async ({params}: {params: Promise<{username: string}>}) => {

  const {username} = await(params);
  const usernameDecoded = decodeURIComponent(username);

  const {data: enabledData, error: enabledError} = await getEnabled();
  
  if (enabledError) {
    return <div><div>An error occued getting the enabled value. </div>
      <div>{enabledError}</div>
    </div>
    }
  console.log("usernameDecoded", usernameDecoded)

  const {data: pupilFiles, error: pupilFilesError} = await getPupilFiles(usernameDecoded);

  if (pupilFilesError){
    return <div>Error! {pupilFilesError}</div>
  }

  

  return (
    <>
        <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col">
        <div className="text-6xl text-center">File Safe</div>
        <div className="text-4xl text-center p-4">file.mr-salih.org</div>
        {enabledData?.enabled == "on" && <DisplayUpload username={usernameDecoded}/>  }
        
        <DisplayFilesGrid columns={columns} data={pupilFiles?.sort((a, b) => a.modified > b.modified ? -1 : 1) || []}/>
        
</div>
</div>
    
    </>
  );
}

export default Home;
