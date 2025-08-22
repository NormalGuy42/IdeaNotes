"use client"

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn, getIconPathByName } from "@/lib/utils";
import { Category, defaultIconsList } from "@/types";
import { Plus } from "lucide-react";
import { CreateIdeaButton } from "./new-idea-form";

function NewIdeaFormTemplate() {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    
    //New Category stuff
    const [showNewCategory,setShowNewCategory] = useState<Boolean>(false);
    const [newCategory, setNewCategory] = useState({ name: "", icon: "" });
    const [showIconList, setShowIconList] = useState(false);
    const [isNewCategory,setIsNewCategory] = useState(false);

    const [categories, setCategories] = useState<Category[]>([]);
    
    
    const [icons,setIcons] = useState<defaultIconsList[]>(
       [{"iconCategoryName":"Technology","icons":[{"iconName":"Computer","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914225/programming_vj3qil.png"},{"iconName":"Smartphone","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914289/smartphone_relmp7.png"},{"iconName":"CPU","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914272/cpu_mmv9qm.png"},{"iconName":"AI","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914267/brain_ins17y.png"},{"iconName":"Robot","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914284/robot_xdorth.png"},{"iconName":"Tools","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914290/tools_bynaov.png"},{"iconName":"Controller","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914271/console_g5p8e8.png"},{"iconName":"Lightbulb","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914272/cpu_mmv9qm.png"},{"iconName":"Rocket","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914286/shuttle_unspyn.png"}]},{"iconCategoryName":"Art","icons":[{"iconName":"Pallete","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914279/palette_twl9tv.png"},{"iconName":"Books","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914266/books_hfsopk.png"},{"iconName":"Script","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914285/script_yqwdwp.png"},{"iconName":"Guitar","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914275/guitar_lko1jx.png"}]},{"iconCategoryName":"Food","icons":[{"iconName":"Pizza","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914281/pizza_phrbga.png"},{"iconName":"Recipe","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914282/recipe_qkcene.png"}]},{"iconCategoryName":"Miscellaneous","icons":[{"iconName":"Dollar","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914273/dollar-bill_g6qciq.png"},{"iconName":"Lightning","iconImg":"https://res.cloudinary.com/dawhxun8o/image/upload/v1719914289/thunder_czqaos.png"}]}]
    )    
        
    // This is to change the values
    const handleAddCategory = (value: string) => {
        setSelectedCategory(value);
        if (value === "add") {
          setShowNewCategory(true);
          return
        }
        if(showNewCategory) setShowNewCategory(false)
    };
    
    const handleCategorySubmit = () => {
        const newCategoryID = String(categories.length + 1);
        if (newCategory.name && newCategory.icon) {
          setCategories([
            ...categories,
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

    return (  
         <form 
                action={()=>{}}
                className="card-main credentials-form py-3 relative z-20"
            >

                <input
                    type="text"
                    placeholder="Idea Name"
                    className="w-full border border-none outline-none py-1 px-2.5 rounded"
                    name="name"
                />
                <div className="flex w-full">
                <input type="hidden" name="newCategory" value={isNewCategory? 'true' : 'false'} />
                <input type="hidden" name="categoryIcon" value={categories.find(c => c.id === selectedCategory)?.icon!}/>
                <input type="hidden" name="categoryName" value={categories.find(c => c.id === selectedCategory)?.name} />
                <Select
                    value={selectedCategory}
                    onValueChange={handleAddCategory}
                    name="category"
                >
                    <SelectTrigger className={cn("w-full border border-solid border-black py-1 px-2.5 rounded select")}>
                        <SelectValue placeholder="Choose a category">
                            {selectedCategory && selectedCategory != 'add' ? (
                                <div className="flex items-center gap-2">
                                    <img 
                                        src={getIconPathByName(categories.find(c => c.id === selectedCategory)?.icon!,icons)} 
                                        alt="" 
                                        className="w-4 h-4"
                                    />
                                    <span>{categories.find(c => c.id === selectedCategory)?.name}</span>
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
                        {categories.map((category) => (
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
                </div>
                {showNewCategory && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 mb-5">
                    <div className="space-y-2">
                    <label className="w-full">New Category</label>
                    <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) =>
                        setNewCategory({ ...newCategory, name: e.target.value })
                        }
                        className="w-full glass-input p-3"
                        placeholder="Enter category name..."
                        name="newCategory"
                    />
                    </div>

                    <div>
                    <div className="flex items-center space-x-4">
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
                        <button
                        type="button"
                        onClick={handleCategorySubmit}
                        disabled={!newCategory.name || !newCategory.icon}
                        className={cn(
                            "flex items-center justify-center text-center",
                            "main-btn w-36",
                            (!newCategory.name || !newCategory.icon) && "opacity-50 cursor-not-allowed"
                        )}
                        >
                        <span>Add Category</span>
                        </button>
                    </div>
                    
                    {showIconList && (
                        <div className="mt-2 p-4 h-60 overflow-y-scroll glass-input flex flex-col gap-4 animate-in fade-in-50">
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
                    </div>
                </div>
                )}
                <div className="flex w-full">
                    <textarea
                    placeholder="Quick description of your idea"
                    className="w-full border-none outline-none py-1 px-2.5 rounded"
                    name="description"
                    ></textarea>
                </div>
               
                <div className="flex w-full">
                    <textarea
                    placeholder="Notes"
                    className="w-full border-none outline-none py-1 px-2.5 rounded"
                    name="notes"
                    ></textarea>
                </div>
                <CreateIdeaButton/>               
            </form>
    );
}

export default NewIdeaFormTemplate;