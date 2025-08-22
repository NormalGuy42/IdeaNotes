import { ObjectId, Types } from "mongoose";

export type Idea = {
    id: string,
    title: String,
    category: CategoryIdea,
    type: String,
    text: String,
}

export type IdeaCardData = {
    id: string,
    title: string,
    category: CategoryIdea,
    type: string,
    text: string,
    icons: [defaultIconsList]
}



export interface UserWithCategories {
    _id: Types.ObjectId,
    categories: Category[],
}

export interface IdeaWithCategory {
    id: ObjectId,
    title: string,
    text: string,
    category: {
        id: string,
        title: string,
        image: string,
    }
}

export interface IdeaPageProps {
    id: ObjectId,
    title: string,
    text: string,
    status: string,
    notes: string,
    category: {
        id: string,
        title: string,
        image: string,
    }
}

export interface IdeaPageComponentProps {
    idea: IdeaPageProps,
    categories: Category[],
    icons: defaultIconsList[]
}

export type CategoryIdea = {
    title: String,
    image: string,
}

export interface Category {
    id: string,
    name: string,
    icon: string,
}

export type defaultIconsList = {
    iconCategoryName: string,
    icons: Array<defaultIcon>,
}

export type defaultIcon = {
    iconName: string,
    iconImg: string,
}