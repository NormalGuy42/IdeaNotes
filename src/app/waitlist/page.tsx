
import WaitlistForm from "@/app/waitlist/waitlist-page";
import { CustomLoadingIcon } from "@/components/main-icons/Icons";
import Header from "@/components/shared/Header";
import { toast } from "@/hooks/use-toast";
import { subscribe } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export const metadata: Metadata = {
    title: 'IdeaNotes Waitlist',
    description: 'Join our Waitlist to be informed of our full release',
}
   
export default function WaitlistPage(){

    return(
        <WaitlistForm/>
    )
}