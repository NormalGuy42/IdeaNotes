"use client"

import { signup } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import { Icon, Plus } from "lucide-react";
import { cn, getIconPathByName } from "@/lib/utils";
import { createIdea, getAllIcons } from "@/lib/actions/ideas.actions";
import { useFormState, useFormStatus } from "react-dom";
import { Category, defaultIconsList } from "@/types";


function CreateIdeaButton(){
    const { pending } = useFormStatus()
    return(
        <button className="main-btn">
            {pending? "Submitting..."   :   "Create Idea "}
        </button>
    )
}


export default function NewIdeaForm(props: {icons: Array<defaultIconsList>, categories: Category[]}){
    
    const [error, setError] = useState<string>();
    const router = useRouter();
    const { toast } = useToast()

    const [categories, setCategories] = useState<Category[]>(props.categories);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    //New Category stuff
    const [showNewCategory,setShowNewCategory] = useState<Boolean>(false);
    const [newCategory, setNewCategory] = useState({ name: "", icon: "" });
    const [showIconList, setShowIconList] = useState(false);
    const [isNewCategory,setIsNewCategory] = useState(false);

    const [data, action] = useFormState(createIdea, {
        message: '',
        success: false,
    })

    const [errors, setErrors] = useState({
        ideaName: '',
        quickDescription: ''
    })


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

    const validateForm = (formData: FormData) => {
        let isValid = true;
        const newErrors = {
            ideaName: '',
            quickDescription: ''
        };

        // Get form values
        const ideaName = formData.get('name') as string;
        const quickDescription = formData.get('description') as string;

        // Email validation
        if (!ideaName || !quickDescription) {
            newErrors.ideaName = !ideaName? 'Idea Name is required' : '';
            newErrors.quickDescription = !quickDescription? 'Description is required' : '';
            isValid = false;
        } 

        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = (formData: FormData) => {
        if (validateForm(formData)) {
            action(formData)
            if (!data.success) {
                toast({
                    variant: 'destructive',
                    description: data.message,
                })
                
            } else {
                toast({
                    description: data.message,
                })
                router.push(`/user`)
            }
        }
        
    }

     
    return(
        <section className="w-full flex items-center justify-center">
            <form 
                action={handleSubmit}
                className="card-main credentials-form py-3"
            >
                {data && !data.success && (
                    <div className="text-center text-destructive">{data.message}</div>
                )}
                <label className="w-full">Idea Name</label>
                <input
                    type="text"
                    placeholder="Idea Name"
                    className="w-full border border-solid py-1 px-2.5 rounded"
                    name="name"
                />
                {errors.ideaName && (
                    <div className="text-destructive">{errors.ideaName}</div>
                )}
                <label className="w-full">Category</label>
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
                                        src={getIconPathByName(categories.find(c => c.id === selectedCategory)?.icon!,props.icons)} 
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
                                        src={getIconPathByName(category.icon,props.icons)} 
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
                        {props.icons!.map((iconGroup) => (
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
                <label className="w-full">Quick Description</label>
                <div className="flex w-full">
                    <textarea
                    placeholder="Enter a quick description of your idea"
                    className="w-full border border-solid py-1 px-2.5 rounded"
                    name="description"
                    ></textarea>
                </div>
                {errors.quickDescription && (
                    <div className="text-destructive">{errors.quickDescription}</div>
                )}
                <label className="w-full">Notes</label>
                <div className="flex w-full">
                    <textarea
                    placeholder="Enter a quick description of your idea"
                    className="w-full border border-solid py-1 px-2.5 rounded"
                    name="notes"
                    ></textarea>
                </div>
                <CreateIdeaButton/>               
            </form>
        </section>           
    )
}