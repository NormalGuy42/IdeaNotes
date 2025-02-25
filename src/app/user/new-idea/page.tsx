import NewIdeaForm from "@/components/forms/new-idea-form";
import { getAllIcons } from "@/lib/actions/ideas.actions";
import { defaultIconsList } from "@/types";

export default async function NewIdea(){
    const icons = await getAllIcons() as unknown as Array<defaultIconsList>;
    
    return(
        <div className="grid grid-cols-1 justify-items-center content-center h-full">
            <NewIdeaForm icons={icons}/>
        </div>
    )
}