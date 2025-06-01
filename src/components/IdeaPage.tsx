"use client"

import { cn, getIconPathByName } from "@/lib/utils"
import { Category, IdeaPageComponentProps } from "@/types"
import { PenIcon, SaveIcon } from "./main-icons/Icons"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Plus } from "lucide-react"



export default function IdeaPageComponent({idea,icons,categories}:IdeaPageComponentProps){

    const [editMode, setEditMode] = useState(false)
    const [title,setTitle] = useState(idea.title)

    const [selectedCategory, setSelectedCategory] = useState<string>(idea.category.id);
    const [userCategories, setUserCategories] = useState<Category[]>(categories)
    //New Category stuff
    const [showNewCategory,setShowNewCategory] = useState<Boolean>(false);
    const [newCategory, setNewCategory] = useState({ name: "", icon: "" });
    const [showIconList, setShowIconList] = useState(false);
    const [isNewCategory,setIsNewCategory] = useState(false);

    // This is to change the values
    const handleAddCategory = (value: string) => {
        console.log('add')
        setSelectedCategory(value);
        if (value === "add") {
          setShowNewCategory(true);
          return
        }
        if(showNewCategory) setShowNewCategory(false)
    };
    
    const handleCategorySubmit = () => {
        const newCategoryID = String(userCategories.length + 1);
        if (newCategory.name && newCategory.icon) {
          setUserCategories([
            ...userCategories,
            { id: newCategoryID, ...newCategory },
          ]);

          setSelectedCategory(newCategoryID)
          setNewCategory({ name: "", icon: "" });
          setShowNewCategory(false);
          setShowIconList(false);
          setIsNewCategory(true);
        }
    };

    const toggleIconList = () => {
        setShowIconList(!showIconList);
    };

    const selectIcon = (icon: string) => {
        setNewCategory({ ...newCategory, icon });
        setShowIconList(false);
    };

    return(
        <div className="p-4 max-w-[1200px] mx-auto relative">
            <h1 className="text-6xl font-bold text-center">
                {
                    !editMode &&
                    idea.title
                }
                {
                    editMode &&
                    <input 
                        type="text" 
                        defaultValue={idea.title}
                        className="w-full border my-0 border-none outline-none py-0 px-2.5 h-14 text-center rounded"
                    />
                }
            </h1>
            {
                !editMode &&
                <div className="badge flex items-center gap-1 mt-3">
                    <img src={getIconPathByName(idea.category.image,icons)} height={16} width={16} alt={idea!.category.title + " image "}/>
                    <span className="text-sm">{idea.category.title}</span>
                </div>
            }
            {
                editMode &&
                <Select
                    value={selectedCategory}
                    onValueChange={handleAddCategory}
                    name="category"
                >
                    <SelectTrigger className={cn("max-w-44 border border-solid border-black py-1 px-2.5 rounded select")}>
                        <SelectValue placeholder="Choose a category">
                            {selectedCategory && selectedCategory != 'add' ? (
                                <div className="flex items-center gap-2">
                                    <img 
                                        src={getIconPathByName(userCategories.find(c => c.id === selectedCategory)?.icon!,icons)} 
                                        alt="" 
                                        className="w-4 h-4"
                                    />
                                    <span>{userCategories.find(c => c.id === selectedCategory)?.name}</span>
                                </div>
                                ):(
                                <div className="flex items-center gap-2">
                                    <img 
                                        src={'/icons/add.svg'} 
                                        alt="" 
                                        className="w-4 h-4"
                                    />
                                    <span>Add</span>
                                </div>
                                )}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent
                        className="bg-black"
                    >
                        {userCategories.map((category) => (
                            <SelectItem 
                                key={category.id} 
                                value={category.id}
                                className={cn("cursor-pointer hover:bg-slate-800 bg-black text-white")}
                            >
                                <div className="flex items-center gap-2 py-1">
                                    <img 
                                        src={getIconPathByName(category.icon,icons)} 
                                        alt="" 
                                        className="w-4 h-4"
                                    />
                                    <span>{category.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                        <SelectItem 
                                key={"add"} 
                                value={"add"}
                                className={cn("cursor-pointer hover:bg-slate-800 bg-black text-white")}
                            >
                                <div className="flex items-center gap-2 py-1">
                                    <img 
                                        src={"/icons/add.svg"} 
                                        alt="" 
                                        className="w-4 h-4"
                                    />
                                    <span>Add</span>
                                </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            }
            {showNewCategory && (
                <div className=" card-main absolute w-44 space-y-4 animate-in fade-in slide-in-from-top-4 mb-5">
                    <div className="space-y-2">
                    <label className="w-full">New Category</label>
                    <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) =>
                        setNewCategory({ ...newCategory, name: e.target.value })
                        }
                        className="w-full glass-input p-3"
                        placeholder="Enter new name"
                        name="newCategory"
                    />
                    </div>

                    <div>
                    <div className="flex-col justify-center items-center">
                        <button
                        type="button"
                        onClick={toggleIconList}
                        className={cn(
                            "flex items-center space-x-2 glass-input px-4 py-2",
                            "hover-lift purple-glow"
                        )}
                        >
                        <Plus size={18} />
                        <span>{newCategory.icon ? `Selected: ${newCategory.icon}` : "Add Icon"}</span>
                        </button>
                        {showIconList && (
                            <div className="mt-2 p-0 h-28 overflow-y-scroll glass-input flex flex-col gap-4 animate-in fade-in-50">
                            {icons!.map((iconGroup) => (
                                <div key={iconGroup.iconCategoryName}>
                                    <h3>{iconGroup.iconCategoryName}</h3>
                                    <div className="grid icons-grid justify-around">
                                        {iconGroup.icons.map((icon) => (
                                            <div className="flex flex-col items-center" onClick={()=> selectIcon(icon.iconName)} key={icon.iconName}>
                                                <img src={icon.iconImg} alt=""  className="h-8 w-8"/>
                                                <div className="text-sm">{icon.iconName}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        )}
                        <button
                        type="button"
                        onClick={handleCategorySubmit}
                        disabled={!newCategory.name || !newCategory.icon}
                        className={cn(
                            "flex items-center justify-center text-center",
                            "main-btn w-36 mt-2 mx-0",
                            (!newCategory.name || !newCategory.icon) && "opacity-50 cursor-not-allowed"
                        )}
                        >
                        <span>Add Category</span>
                        </button>
                    </div>
                    </div>
                </div>
            )}
            <p className="py-5">
                {
                    !editMode &&
                    idea.text
                }
                {
                    editMode &&
                    <input 
                        type="text" 
                        defaultValue={idea.text}
                        className="w-full border my-0 mx-0 border-none outline-none max-h-6 min-h-6 py-0 px-0 rounded"
                    />
                }
            </p>
            <h2 className="text-4xl font-bold">Notes</h2>
            <p>
                {
                    !editMode &&
                    idea.notes
                }
                {
                    editMode &&
                    <textarea 
                        name="" 
                        id=""
                        defaultValue={idea.notes}
                        className="w-full border-none outline-none py-0 px-0 mx-0 rounded"
                    ></textarea>
                }
            </p>
            {
                !editMode && 
                <button className="ideapage-circular-btn" onClick={()=>setEditMode(true)}>
                    <PenIcon/>
                </button>
            }
            {
                editMode &&
                <button className="ideapage-circular-btn" onClick={()=>setEditMode(false)}>
                    <SaveIcon/>
                </button>
            }
        </div>
    )
}

