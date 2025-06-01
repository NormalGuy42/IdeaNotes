import { getIconPathByName } from "@/lib/utils";
import {IdeaCardData } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function IdeaCard(props: IdeaCardData){
    return(
        <Link href={"user/ideas/"+ props.id}>
            <div className="card-main max-[320px] min-w-[240px] h-56">
                <div className="badge flex items-center gap-1">
                    <img src={getIconPathByName(props.category.image,props.icons)} height={16} width={16} alt={props.category.title + " image "}/>
                    <span className="text-sm">{props.category.title}</span>
                </div>
                <h3 className="font-bold text-xl">{props.title}</h3>
                <p>{props.text}</p>
            </div>
        </Link>
    )
}