"use client";

import { defaultIconsList, Idea, IdeaCardData, IdeaPageProps } from "@/types";
import IdeaCard from "./cards/IdeaCard";
import { useEffect, useState } from "react";
import { emptyIdeaCardData } from "@/lib/constants";


export interface IdeaCardInteractivity{
    id: number,
    idea: IdeaPageProps,
    openTooltip: boolean,
    editMode: boolean 
}

export default function IdeaCardList(props:{ideas: [IdeaPageProps],icons: [defaultIconsList]}){
    
    const [ideas, setIdeas] = useState<IdeaCardInteractivity[]>(()=>{
        return props.ideas.map((idea:IdeaPageProps,index)=>(({id:index, idea:{...idea},openTooltip: false, editMode: false})))
    })
    const [selectedIdea, setSelectedIdea] = useState<number | null>(null)
    const [positions, setPositions] = useState({
        clientX: 0,
        clientY: 0,
    })

    const handleOpenTooltip = (e: React.MouseEvent<HTMLDivElement>,id: number)=>{
        e.preventDefault()
        
        let bodyTop = document.querySelector('body')!.getBoundingClientRect().top

        if (e.nativeEvent.button === 2) {
            const newPositions = {
                clientX: e.clientX,
                clientY: e.clientY - bodyTop, // clientY is relative to viewport, need to get relative distance from the top
            }
            setPositions(newPositions)
            const newideas = ideas.map(idea => (
                idea.id === id  ? {...idea,openTooltip: true} 
                : idea.id === selectedIdea ? {...idea,openTooltip: false} 
                : idea ))
            setIdeas(newideas)
            setSelectedIdea(id)
        }
    }

    const cancelAllTooltips = ()=>{
        const newideas = ideas.map(idea => ({...idea,openTooltip: false}))
        setSelectedIdea(null)
        setIdeas(newideas)
    }

    useEffect(()=>{
        function handleClickOutside(ev: MouseEvent){
            //Typescript is unhappy if event is not cast as HTML Element first
            if(selectedIdea !== null && !(ev.target as HTMLElement).closest('.idea-card')){
                cancelAllTooltips()
            }
        }
        document.querySelector('body')!.addEventListener('click',handleClickOutside)
        return () => {
           document.querySelector('body')!.removeEventListener("click", handleClickOutside);
        };

    })
    return(
        <div className="grid grid-cols-[repeat(auto-fit,240px)] px-4 py-12 gap-4 justify-center">
            {ideas!.map((item)=>
                //On Context Menu is important to prevent default behavior of opening web browser menu
                <div className="idea-card" onContextMenu={(e)=>handleOpenTooltip(e,item.id)} onClick={(e)=>handleOpenTooltip(e,item.id)} key={item.id}>
                    <IdeaCard                    
                        idea={{
                            id: item.idea.id.toString(),
                            title: item.idea.title, 
                            category: item.idea.category,
                            type:item.idea.status,
                            text: item.idea.text,
                            icons: props.icons
                        }}
                        openToolTip={item.openTooltip}
                        editMode={item.editMode}
                        clientX={positions.clientX}
                        clientY={positions.clientY}
                    />
                </div>
            )}
        </div>
    )
}