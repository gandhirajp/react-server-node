import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {
    const [count,setCount]=useState(0)
    useEffect(async() => {
        try {
            let dashboard=await axios.get("http://localhost:3001/dashboard",{
                headers:{
                    Authorization: window.localStorage.getItem("my_token")
                }
            });
            setCount(dashboard.data.totalUsers)
        } catch (error) {
            
        }
    }, [])
    return (
       <div>
           Dashboard-Total User-{count}
       </div>
    )
}

export default Dashboard
