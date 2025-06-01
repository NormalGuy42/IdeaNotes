"use client"

import React from "react"
import { AddIcon, BackIcon, HomeIcon, LibraryIcon, UserIcon } from "./main-icons/Icons";
import Link from "next/link";

const NavIcon = (props:{link:String , icon: React.ReactElement})=>{
    return(
        <Link href={'/'+props.link}>
            <div className="bg-[#282828] rounded-lg p-1">
                {props.icon} 
            </div>
        </Link>
    )
}

export const UserNavBar = (props: {username:String}) => {
  return (
    <div className="nav">
        <ul className="flex gap-2 p-4 bg-black border rounded-lg border-slate-300">
            <li onClick={()=>history.go(-1)}>
                <NavIcon link={''} icon={<BackIcon/>}/>
            </li>
            <li>
                <NavIcon link={props.username + '/add'} icon={<AddIcon/>}/>
            </li>
            <li>
                <NavIcon link={props.username + '/library'} icon={<LibraryIcon/>}/>
            </li>
            <li>
                <NavIcon link={props.username + '/profile'} icon={<UserIcon/>}/>
            </li>
            <li>
                <NavIcon link={props.username} icon={<HomeIcon/>}/>
            </li>
        </ul>
    </div>
  )
};


export const PublicUserNavBar = (props: {username:String}) => {
    return (
      <div className="nav">
            <ul className="flex gap-2 p-4 bg-black border rounded-lg border-slate-300">
              <li onClick={()=>history.go(-1)}>
                  <NavIcon link={''} icon={<BackIcon/>}/>
              </li>
              <li>
                  <NavIcon link={props.username + '/library'} icon={<LibraryIcon/>}/>
              </li>
              <li>
                  <NavIcon link={props.username + '/profile'} icon={<UserIcon/>}/>
              </li>
              <li>
                  <NavIcon link={props.username} icon={<HomeIcon/>}/>
              </li>
          </ul>
      </div>
    )
  };

export const PrivateUserNavBar = (props: {username:String}) => {
    return (
      <div className="nav">
        <ul className="flex gap-2 p-4 bg-black border rounded-lg border-slate-300">
            <li onClick={()=>history.go(-1)}>
                <NavIcon link={''} icon={<BackIcon/>}/>
            </li>
            <li>
                <NavIcon link={props.username + '/profile'} icon={<UserIcon/>}/>
            </li>
            <li>
                <NavIcon link={props.username} icon={<HomeIcon/>}/>
            </li>
          </ul>
      </div>
    )
  };