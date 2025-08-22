import IdeaPageComponent from "@/components/IdeaPage";
import { PenIcon } from "@/components/main-icons/Icons";
import { getAllIcons, getIdeaByID } from "@/lib/actions/ideas.actions"
import { getUserCategories } from "@/lib/actions/user.actions";
import { getIconPathByName } from "@/lib/utils";
import { IdeaPageProps, IdeaWithCategory } from "@/types";
import { useRouter } from "next/navigation"


export default async function IdeaPage({ params }: { params: { id: string } }){

    const ideaID = params.id
    const result = await getIdeaByID(ideaID!);
    const icons = await getAllIcons()
    const categories = await getUserCategories()


    if(!result.success){
        return(
            <div>{result.message}</div>
        )
    }

    if (!categories.success){
        return(
            <div>{result.message}</div>
        )
    }

    const idea = JSON.parse(JSON.stringify(result.data));
    const categoriesResult = categories.data
    
    return(
        <IdeaPageComponent idea={idea!} icons={icons} categories={categoriesResult!}/>
    )
}