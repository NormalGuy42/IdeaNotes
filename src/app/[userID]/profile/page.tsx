"use client";
import { signOut } from "next-auth/react";
import React from "react"

const Profile = () => {
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: '/', redirect:true })}>Logout</button>
    </div>
  )
};

export default Profile;
