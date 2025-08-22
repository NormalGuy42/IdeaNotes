"use client"

import { cn, getIconPathByName } from "@/lib/utils";
import {Category, defaultIconsList, IdeaCardData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { CancelIcon, PenIcon, TrashIcon } from "../main-icons/Icons";
import { allowedStatusColors } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createIdea, getAllIcons } from "@/lib/actions/ideas.actions";
import { getUserCategories } from "@/lib/actions/user.actions";
import { Plus } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";

function EditIdeaButton(){
    const { pending } = useFormStatus()
    return(
        <button className="main-btn">
            {pending? "Submitting..."   :   "Create Idea "}
        </button>
    )
}

function EditIdeaCard(props: {idea: IdeaCardData, }){

    const [error, setError] = useState<string>();
    const router = useRouter();
    const { toast } = useToast()

    const savedCategories = localStorage.getItem('userCategories')
    const savedIcons = localStorage.getItem('defaultIcons')

    const [categories, setCategories] = useState<Category[]>(()=>{
        return savedCategories ? JSON.parse(savedCategories) : []
    });
    const [icons,setIcons] = useState<defaultIconsList[]>(()=>{
        return savedIcons ? JSON.parse(savedIcons) : []
    })

    // const [categories, setCategories] = useState<Category[]>([])
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

    // useEffect(()=>{
    //     const fetchData = async()=>{
    //         try{

    //             const icons = await getAllIcons()
    //             const categories = await getUserCategories()
    //             // const data = categories.data as [Category]
                
    //             if(!categories.success){
    //                 return(
    //                     <div>{categories.message}</div>
    //                 )
    //             }


    //             setCategories(categories.data!)
    //             setIcons(icons)

    //             if(!savedIcons || !savedCategories){
    //                 localStorage.setItem('userCategories',JSON.stringify(categories.data))
    //                 localStorage.setItem('defaultIcons',JSON.stringify(icons))
    //             }

    //         }catch(error){
    //             console.log(error)
    //         }
    //     }

    //     fetchData()

    // },[])
    
    return(
        <form 
            action={handleSubmit}
            className="credentials-form relative bg-black w-full h-full min-w-0 max-h-56 flex flex-col justify-between"
        >
            <button className="main-btn h-7 w-7 rounded-full p-[4px] absolute right-[-4px] top-[-8px] z-30" onClick={()=>{}}>
                <CancelIcon/>
            </button>

            {data && !data.success && (
                <div className="text-center text-destructive">{data.message}</div>
            )}
            {errors.ideaName && (
                <div className="text-destructive">{errors.ideaName}</div>
            )}
            <div className="flex w-full">
                <input type="hidden" name="newCategory" value={isNewCategory? 'true' : 'false'} />
                <input type="hidden" name="categoryIcon" value={categories.find(c => c.id === selectedCategory)?.icon!}/>
                <input type="hidden" name="categoryName" value={categories.find(c => c.id === selectedCategory)?.name} />
                <Select
                    value={selectedCategory}
                    onValueChange={handleAddCategory}
                    name="category"
                >
                    <SelectTrigger className={cn("w-full border border-solid border-black py-1 px-2.5 rounded select mb-0 edit-card-select")}>
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
            <input
                type="text"
                placeholder="Idea Name"
                defaultValue={props.idea.title}
                className="w-full border border-none outline-none py-1 px-2.5 rounded my-0"
                name="name"
            />
            <div className="flex w-full">
                <textarea
                placeholder="Quick description of your idea"
                className="w-full border-none outline-none py-1 px-2.5 rounded my-0"
                name="description"
                ></textarea>
            </div>
            {errors.quickDescription && (
                <div className="text-destructive">{errors.quickDescription}</div>
            )}
            <EditIdeaButton/>               
        </form>
    )
}


export default function IdeaCard(props: {idea: IdeaCardData,openToolTip: boolean, editMode: boolean, clientX: number, clientY: number}){
    const ideaCardRef = useRef(null)
    const [editMode, setEditMode] = useState(props.editMode)
    const [openToolTip, setOpenTooltip] = useState(props.openToolTip)

    function Tooltip(){
        let windowWidth = window.innerWidth
        let windowHeight = document.querySelector('body')!.clientHeight
        let x = windowWidth - props.clientX > 180? props.clientX : windowWidth - 180
        let y = windowHeight - props.clientY > 250? props.clientY : windowHeight - 250


        return(
            <div className="card-main absolute z-10 min-w-40 min-h-60" style={{top:`${y}px`, left:`${x}px`}}>
                <div className="flex flex-col gap-2">
                    <button className="flex items-center edit-card-button" onClick={handleEdit}>
                        <div className="mr-[4px] ml-[6px]">
                            <PenIcon/>
                        </div>
                        Edit
                    </button>
                    <button className="flex items-center delete-card-button">
                        <TrashIcon />
                        <span className="text-destructive">Delete</span>
                    </button>
                </div>
                <div className="line w-16 h-1 bg-white mx-auto mt-3"></div>
                <div className="flex-col">
                    <h3 className="pt-0">CHANGE STATUS</h3>
                    {allowedStatusColors.map((status,index)=>(
                        <div className="flex items-center gap-2" key={index}>
                            <div className={`circle bg-${status.color} h-3 w-3 rounded-full`}></div>
                            <h4>SET {status.statusTitle.toUpperCase()}</h4>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    function handleEdit(){
        console.log('EDIT MODE LET\'S GOOOO')
        setOpenTooltip(false)
        setEditMode(true)
    }

    function handleForm(){

    }

   
    return(
        <div ref={ideaCardRef} className="h-full">
            {
                editMode?
                    <EditIdeaCard idea={props.idea} />
                :
                    <Link href={"user/ideas/"+ props.idea.id}>
                        <div className="card-main max-[320px] min-w-[240px] h-56">
                            <div className="badge flex items-center gap-1">
                                <img src={getIconPathByName(props.idea.category.image,props.idea.icons)} height={16} width={16} alt={props.idea.category.title + " image "}/>
                                <span className="text-sm">{props.idea.category.title}</span>
                            </div>
                            <h3 className="font-bold text-xl">{props.idea.title}</h3>
                            <p>{props.idea.text}</p>
                        </div>
                    </Link>
            }
            {
                props.openToolTip && 
                <Tooltip/>
            }
        </div>
    )
}