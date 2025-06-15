"use client"

import {
    ColumnDef
  } from "@tanstack/react-table"

  import { MoreHorizontal } from "lucide-react"
  import { Button } from "@/components/ui/button"
//import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
 // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { UploadFile } from "@/lib/get-pupil-files"

import { updatePupilFileStatus } from "@/lib/update-pupil-file-status"
import { refreshServer } from "@/lib/refresh-server"
import Link from "next/link"

import { DateTime } from "luxon";


const changeStatus = async (email: string, file: string, status: string) => {

  try {

    await updatePupilFileStatus(email, file, status)
    refreshServer()
  } catch (err) {
    console.error(err);
    //error = ((err as unknown) as Error).message
  } finally {

  }
  
}

export const columns: ColumnDef<UploadFile>[] = [
    
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "form",
    header: "Form"
  },
    
    {
      id: "file",
      header: "File",
      cell: ({row})=>{return (<Link key={Math.random()} href={`api/download/${row.original.email}/${decodeURI(row.original.file_name).split("/").at(-1)}`}>{decodeURI(row.original.file_name).split("/").at(-1)}</Link>)}
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
        id: "modified",
        header: "modified",
        cell: ({row}) => { return (<div>{DateTime.fromJSDate(row.original.modified).toFormat("yyyy-MM-dd")}</div>)}
    },
    {
      id: "actions",
      cell: ({ row }) => {
        
   
        return (<DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => changeStatus(row.original.email, row.original.file_name, "Completed")}
              >
                Completed
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => changeStatus(row.original.email, row.original.file_name, "Rejected")}
              >
                Rejected
              </DropdownMenuItem>


              <DropdownMenuSeparator />
              
              <DropdownMenuItem
                onClick={() => changeStatus(row.original.email, row.original.file_name, "In Progress")}
              >
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => changeStatus(row.original.email, row.original.file_name, "Ready Laser Cut")}
              >
                Ready Laser Cut
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => changeStatus(row.original.email, row.original.file_name, "Ready 3D Print")}
              >
                Ready 3D Print
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => changeStatus(row.original.email, row.original.file_name, "Ready CNC")}
              >
                Ready CNC
              </DropdownMenuItem>
              

              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => changeStatus(row.original.email, row.original.file_name, "Ready to Delete")}
              >Delete File</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]