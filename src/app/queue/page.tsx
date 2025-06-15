export const fetchCache = 'force-no-store';

//import { getAllPupilFiles } from "@/lib/get-all-pupil-files";
import { DisplayQueueGrid } from "@/components/display-queue-grid";
import { columns } from "@/components/display-queue-grid/columns"

import {cookies} from 'next/headers'

import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { getAllPupilFiles } from "@/lib/get-all-pupil-files";
//import { getPupilFiles } from "@/lib/get-pupil-files";


const Page = async () => {

    // ensure that the page is dynamic 
    const cookieStore = await cookies()
    const theme = cookieStore.get('theme')
    console.log(theme);

    const {data, error} = await getAllPupilFiles();

    if (error)
      return <div><div>{error}</div>
        <pre>{JSON.stringify( {
    user: process.env.POSTGRES_USER || "Not set",
    password: process.env.POSTGRES_PASSWORD || "Not set",
    database: process.env.POSTGRES_DB  || "Not set",
    host: process.env.POSTGRES_HOST || "Not set",
    time: Date.now()
}, null, 2)}</pre>
      </div>

    return <div>
        <div className="text-6xl text-center">Queue Page</div>
        
        <div className="w-[1024px] m-auto">
        <Tabs defaultValue="ready" className="w-[1024px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="ready">Ready for Production</TabsTrigger>
        <TabsTrigger value="processed">Processed</TabsTrigger>
        <TabsTrigger value="other">Other</TabsTrigger>

        
      </TabsList>

      <TabsContent value="ready">
        <Card>
          <CardHeader>
            <CardTitle>Ready for Production</CardTitle>
            <CardDescription>
              These files are marked as ready to be produced.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <DisplayQueueGrid columns={columns} data={data?.filter((f) => ["Ready Laser Cut", "Ready 3D Print",  "Ready CNC"].includes(f.status)) || []}/>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="processed">
      <Card>
          <CardHeader>
            <CardTitle>Processed</CardTitle>
            <CardDescription>
              Files that have been processed, and are either completed or rejected.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <DisplayQueueGrid columns={columns} data={data?.filter((f) => ["Completed", "Rejected"].includes(f.status)).sort((a, b) => a.modified > b.modified ? 1 : -1) || []}/>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="other">
      <Card>
          <CardHeader>
            <CardTitle>Other</CardTitle>
            <CardDescription>
              Inprogress and deleted files.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <DisplayQueueGrid columns={columns} data={data?.filter((f) => ["Delete", "In Progress"].includes(f.status) ).sort((a, b) => a.modified > b.modified ? 1 : -1) || []}/>
          </CardContent>
        </Card>
      </TabsContent>

      

      

    </Tabs>

    
        
        </div>
        
    </div>
}


export default Page;