"use client"

import {useState, useEffect} from "react";

import {updateEnabled, getEnabled} from "./settings"
import {Switch} from "@/components/ui/switch";

const DisplayAdminForm = () => {

    const [enabled, setEnabled] = useState<boolean>(true);

    useEffect(()=> {

        const loadEnabled = async () => {
            
            const {data} = await getEnabled();

            setEnabled(data && data.enabled);
        };

        loadEnabled();

        
    }, []);

    useEffect(()=> {
        console.log("Updating DB")
        updateEnabled(enabled && enabled.toString() || "false");
    },[enabled]);


    
    const toggleEnabled = () => {
        console.log("Value is", enabled)
        setEnabled(!enabled);
    }

    return <form>
            
            <div>
                <span className="pr-4">Enabled:</span> 
            <Switch name="enable"

                    checked={enabled}
                    onClick={toggleEnabled}
                    />
            </div>
            
    </form>
}

export default DisplayAdminForm;