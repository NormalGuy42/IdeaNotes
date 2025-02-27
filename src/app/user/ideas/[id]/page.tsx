import { getAllIcons, getIdeaByID } from "@/lib/actions/ideas.actions"
import { getIconPathByName } from "@/lib/utils";
import { IdeaPageProps, IdeaWithCategory } from "@/types";
import { useRouter } from "next/navigation"


export default async function IdeaPage({ params }: { params: { id: string } }){

    const ideaID = params.id
    const result = await getIdeaByID(ideaID!);
    const icons = await getAllIcons()
    

    if(!result.success){
        return(
            <div>{result.message}</div>
        )
    }

    const idea = result.data;
    console.log(icons);

    return(
        <div className="p-4 max-w-[1200px] mx-auto">
            <h1 className="text-6xl font-bold text-center">{idea!.title}</h1>
            <div className="badge flex items-center gap-1 mt-3">
                <img src={getIconPathByName(idea!.category.image,icons)} height={16} width={16} alt={idea!.category.title + " image "}/>
                <span className="text-sm">{idea!.category.title}</span>
            </div>
            <p className="py-5">{idea!.text}</p>
            <h2 className="text-4xl font-bold">Notes</h2>
            <p>{idea!.notes}</p>
        </div>
    )
}