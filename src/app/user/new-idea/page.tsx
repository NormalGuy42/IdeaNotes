import NewIdeaForm from "@/components/forms/new-idea-form";
import { getAllIcons } from "@/lib/actions/ideas.actions";
import { getUserCategories } from "@/lib/actions/user.actions";
import { Category, defaultIconsList } from "@/types";

export default async function NewIdea(){
    const icons = await getAllIcons() as unknown as Array<defaultIconsList>;
    const categories = await getUserCategories()
    const data = categories.data as [Category]

    if(!categories.success){
        return(
            <div>{categories.message}</div>
        )
    }

    return(
        <div className="grid grid-cols-1 justify-items-center content-center h-full">
            <NewIdeaForm icons={icons} categories={data}/>
        </div>
    )
}