'use client';

import BlockedUserCard from "@/components/cards/BlockedUser";
import EmptyUser from "@/components/cards/EmptyUser";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../providers/userdataprovider";
import UserNotExist from "@/components/cards/UserNotExist";


interface UserDataInterface{
    data: UserData
}

export default function UserPage(){
    const data: UserData = useContext(UserDataContext);
    const  usertype = data.usertype
    const ideaList = data.ideaList
    
    if(usertype! == false){
        return(
            <BlockedUserCard/>
        )
    }
    if(usertype! == true && ideaList?.length == 0){
        return(
            <EmptyUser/>
        )
    }
    return(
        <UserNotExist/>
    )
} 