"use client";

import { PrivateUserNavBar, PublicUserNavBar, UserNavBar } from "@/components/NavBars";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createContext } from "react";


export const emptyUserData = {
    username: null,
    usertype: null,
    ideaList: null,
}
export const getUsername = ()=>{
    const router = usePathname();
    const username  = router.split('/')[1];

    return username;
}

export const UserDataContext = createContext<UserData>(emptyUserData);

const UserDataProvider = ({ children } : {children: React.ReactNode}) => {
    const router = usePathname();
    const username  = router.split('/')[1];
    const session = useSession()
    const [userType, setUserType] = useState<String>('blocked');
    const [data, setData] = useState<UserData>(emptyUserData);
    const [error, setError] = useState(false);

    const getData = async ()=> {
        try{
            const res = await fetch('../api/userData', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                }),
            })
            
            if(res.ok){
                const result = await res.json()
                let type = result.data.usertype? 'not-blocked' : 'blocked';
                setUserType(type)
                setData(result.data)
            }
        }catch(error){
            console.log(error)
            console.log('huh')
            setError(true)
            setData(emptyUserData)
        }
    }

    let status = session?.status === 'authenticated' ? session?.data.user.username : 'NOT-LOGGED-IN'

    useEffect(()=>{
        getData();
    },[])


    if(userType === 'blocked' && status === 'NOT-LOGGED-IN'){
        return (
            <UserDataContext.Provider value={data}>
                <div>
                    {children}
                    {error && <PrivateUserNavBar username={username}/>}
                </div>
            </UserDataContext.Provider>
      )
    }

    if(userType === 'not-blocked' && status === 'NOT-LOGGED-IN'){
        return (
            <UserDataContext.Provider value={data}>
                <div>
                    {children}
                    <PublicUserNavBar username={username}/>
                </div>
            </UserDataContext.Provider>
         )
    }

    return (
        <UserDataContext.Provider value={data}>
            <div>
            {children}
            {status === username ? 
                    <UserNavBar username={username}/>
                :
                    ''
            }          
            </div>
        </UserDataContext.Provider>
  )
};

export default UserDataProvider;
