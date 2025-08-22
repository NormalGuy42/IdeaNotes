"use server"

import { connectToMongoDB } from "@/db/connection";
import Idea from "../models/Idea";
import { auth } from "@/auth";
import User from "../models/User";
import IconsList from "../models/Iconslist";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Types } from "mongoose";
import { IdeaPageProps, IdeaWithCategory, UserWithCategories } from "@/types";

// GET ICONS

export async function getAllIcons(){
    const session = await auth();
    if(!session) throw new Error('User is not authenticated')

    try{
        await connectToMongoDB();
        
        const iconsList = await IconsList.findOne({});
        if (!iconsList) {
            throw new Error('No icons found');
        }
        
        return iconsList.data;
    }catch(error){
        console.log(`Error fecthing Icons: ${error}`);
        throw error
    }
}

// CREATE
export async function createIdea(
    prevState: unknown,
    formData: FormData
) {
    
    const session = await auth();
    if(!session) throw new Error('User is not authenticated')

    try {
        await connectToMongoDB();
        const userID = session.user.id;
        
        // Get form data
        const name = formData.get('name') as string;
        const category = formData.get('category') as string;
        const categoryIcon = formData.get('categoryIcon') as string;
        const categoryName = formData.get('categoryName') as string
        const description = formData.get('description') as string;
        const notes = formData.get('notes') as string;
        const isNewCategory = formData.get('newCategory') === 'true'? true : false;

        // First, check if user exists and has the correct schema
        const existingUser = await User.findOne({ _id: userID });

        if (!existingUser) {
            return { success: false, message: 'User not found' };
        }
        
        // Validate required fields
        if (!name || !description) {
            return { success: false, message: 'Name and description are required' };
        }


        // Create new idea
        const idea = new Idea({
            userID: userID,
            ideaName: name,
            ideaCategory: category,
            ideaDescription: description,
            status: 'unset',
            ideaNotes: notes
        });

        const savedIdea = await idea.save();

        // Update user's ideas array
        // Base update operation
        const updateOperation: any = {
            $push: { ideas: savedIdea._id }
        };

        // Only add category if it's a new one
        if (isNewCategory && categoryName && categoryIcon) {

            const newCategory = {
                id: category,
                name: categoryName,
                icon: categoryIcon
            };

            // Check if category already exists
            const categoryExists = existingUser.categories?.some(
                (cat: { id: string; }) => cat.id === category
            );

            if (!categoryExists) {
                updateOperation.$addToSet = {
                    categories: newCategory
                };
            }

            updateOperation.$addToSet = {
                categories: newCategory
            };
        }

        // Update user document
        await User.findOneAndUpdate(
            { _id: userID },
            updateOperation,
            { new: true }
        );


        // Revalidate the ideas page
        revalidatePath('/user');
        return {
            success: true,
            message: 'Idea created successfully'
        };

    } catch (error) {
        console.error('Error creating idea:', error);
        return {
            success: false,
            message: `Error creating idea: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}

// GET IDEAS

export async function getAllIdeas(){
    const session = await auth();
    if (!session) {
        return { success: false, message: 'Not authenticated' };
    }

    try {

        await connectToMongoDB();

        const ideas = await Idea.find({ 
            userID: session.user.id 
        }).sort({ 
            createdAt: -1  // Sort by newest first
        });

        return { 
            success: true, 
            data: ideas 
        };

    } catch (error) {
        console.error('Error fetching ideas:', error);
        return {
            success: false,
            message: `Error fetching ideas: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}



export async function getIdeasWithCategories() {
    try {
        const session = await auth();
        if (!session) {
            return { success: false, message: 'Not authenticated' };
        }

        await connectToMongoDB();

        // Get user with explicit type
        const user = await User.findOne({ 
            _id: session.user.id 
        })
        .select('categories')
        .lean<UserWithCategories>();

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        // Create a category lookup map with null check
        const categoryMap = new Map(
            (user.categories || []).map(cat => [cat.id, {
                id: cat.id,
                title: cat.name,
                image: cat.icon
            }])
        );

        // Get ideas
        const ideas = await Idea.find({ 
            userID: session.user.id 
        })
        .sort({ createdAt: -1 })
        .lean();

        // Transform ideas
        const mergedIdeas = ideas.map(idea => ({
            id: idea._id as String,
            title: idea.ideaName,
            text: idea.ideaDescription,
            status: idea.status,
            notes: idea.ideaNotes,
            category: categoryMap.get(idea.ideaCategory) || {
                id: idea.ideaCategory,
                title: 'Uncategorized',
                image: '/default-category-icon.png'
            }
        }));

        return { 
            success: true, 
            data: mergedIdeas 
        };

    } catch (error) {
        console.error('Error fetching ideas with categories:', error);
        return {
            success: false,
            message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}

export async function getIdeaByID(ideaID: String){
    
    const session = await auth();
    if (!session) {
        return { success: false, message: 'Not authenticated' };
    }

    await connectToMongoDB();

    try{

        const userID = session.user.id;

        const user = await User.findOne({
            _id: userID
        })
        .select("categories")
        .lean<UserWithCategories>()

        if(!user) return {success: false, message: 'User not found'}

        const categoryMap = new Map(
            (user.categories || []).map(cat => [cat.id, {
                id: cat.id,
                title: cat.name,
                image: cat.icon
            }])
        );

        const idea = await Idea.findOne({
            _id: ideaID
        })

        if(!idea) return {success: false, message: 'Idea does not exist'}

        const mergedIdea: IdeaPageProps = {
            id: idea._id,
            title: idea.ideaName,
            text: idea.ideaDescription,
            notes: idea.ideaNotes,
            status: idea.status,
            category: categoryMap.get(idea.ideaCategory) || {
                id: idea.ideaCategory,
                title: 'Uncategorized',
                image: '/default-category-icon.png'
            }
        };


        return{
            success: true,
            data: mergedIdea,
        }

    }catch(error){
        return {
            success: false,
            message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        };       
    }
}

// UPDATE

export async function updateIdea(prevState:unknown, formData: FormData){
    const session = await auth();
    if (!session) {
        return { success: false, message: 'Not authenticated' };
    }

    await connectToMongoDB();

    try{
        const userID = session.user.id;
        
        // Get form data
        const  ideaID = formData.get('ideaID') as string
        const name = formData.get('name') as string;
        const category = formData.get('category') as string;
        const categoryIcon = formData.get('categoryIcon') as string;
        const categoryName = formData.get('categoryName') as string
        const description = formData.get('description') as string;
        const notes = formData.get('notes') as string;
        const isNewCategory = formData.get('newCategory') === 'true'? true : false;
        const status = formData.get('status') as string

        // First, check if user exists and owns idea
        const existingUser = await User.findOne({ _id: userID }).select("ideas");

        if (!existingUser) {
            return { success: false, message: 'User not found' };
        }

        if(!existingUser.ideas.includes(ideaID)){
            return { success: false, message: 'Unauthorized access to idea document. This idea does not belong to you' };
        }

        const idea = await Idea.findOne({ _id: ideaID})

        const update = {
            userID: userID,
            ideaName: name,
            ideaCategory: category,
            ideaDescription: description,
            status: status,
            ideaNotes: notes
        };

        await idea.updateOne(update);

        // Update user's ideas array
        // Base update operation
        const updateOperation: any = {
            $push: { ideas: idea._id }
        };

        // Only add category if it's a new one
        if (isNewCategory && categoryName && categoryIcon) {

            const newCategory = {
                id: category,
                name: categoryName,
                icon: categoryIcon
            };

            // Check if category already exists
            const categoryExists = existingUser.categories?.some(
                (cat: { id: string; }) => cat.id === category
            );

            if (!categoryExists) {
                updateOperation.$addToSet = {
                    categories: newCategory
                };
            }

            updateOperation.$addToSet = {
                categories: newCategory
            };
        }

        // Update user document
        await User.findOneAndUpdate(
            { _id: userID },
            updateOperation,
            { new: true }
        );


        // Revalidate the ideas page
        revalidatePath(`user/ideas/${ideaID}`);

        return{
            success: true,
            data: update,
        }


    }catch(error){
        return {
            success: false,
            message: `Error: Something terrible happened ${error}`
        }
    }
}


//  DELETE


export async function deleteIdea(ideaID: string){
    const session = await auth();
    if (!session) {
        return { success: false, message: 'Not authenticated' };
    }

    await connectToMongoDB();

    try{
        const userID = session.user.id;

        // First, check if user exists and owns idea
        const existingUser = await User.findOne({ _id: userID }).select("ideas");

        if (!existingUser) {
            return { success: false, message: 'User not found' };
        }

        if(!existingUser.ideas.includes(ideaID)){
            return { success: false, message: 'Unauthorized access to idea document. This idea does not belong to you' };
        }


        //Remove ID from ideas array and Add ID to trash array
        const updateOperation: any = {
            $pull: { ideas: ideaID },
            $push: {trash: ideaID}
        };

        // Update user document
        await User.findOneAndUpdate(
            { _id: userID },
            updateOperation,
            { new: true }
        );

        return {
            success: true,
            message: 'Idea thrown in trash successfully'
        }
    }catch(error){
        return {
            success: false,
            message: `Error: Failed deleting idea ${error}`
        }
    }
}