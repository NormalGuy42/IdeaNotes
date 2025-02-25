import IdeaCard from "@/components/cards/IdeaCard"
import { getAllIcons, getIdeasWithCategories } from "@/lib/actions/ideas.actions";

export default async function UserPage(){
    const icons = await getAllIcons()
    const result = await getIdeasWithCategories();
    const ideas = result.data;
    
    // if(!result.success){
    //     return(
    //         <div>{result.message}</div>
    //     )   
    // }

    return(
        <div>
            <div className="flex justify-center items center gap-2">
                <div className="search-container">
                    <input type="text" placeholder="Search in your ideas"/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff" height={16} width={16} className="search-icon">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                </div>
                <button className="sort-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width={32} height={32} viewBox="0 0 32 32" version="1.1" >
                        <title>bars-filter</title>
                        <path d="M30 6.749h-28c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h28c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM24 14.75h-16c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h16c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM19 22.75h-6.053c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h6.053c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0z"/>
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-4 px-4 py-12 gap-4">
                {ideas!.map((item)=>
                    <IdeaCard 
                        // key={item.id}
                        id={''}
                        title={item.title}
                        category={item.category}
                        type={item.status}
                        text={item.text}
                        icons={icons}
                    />
                )}
            </div>
        </div>
    )
}