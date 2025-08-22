import { IdeaCardInteractivity } from "@/components/IdeaCardList";
import { ObjectId } from "mongoose";

export const APP_NAME = "IdeaNotes";

export const allowedStatusColors = [
    {
        statusTitle: "active",
        color:  "status-green",
    },
    {
        statusTitle: "on hold",
        color:  "status-yellow",
    },
    {
        statusTitle: "dropped",
        color:  "status-red",
    },
    {
        statusTitle: "finished",
        color:  "status-blue",
    }

]

export const emptyIdeaCardData : [IdeaCardInteractivity] = [
    {
        idea: {
            id: '' as unknown as ObjectId,
            title: '',
            text: '',
            status: '',
            notes: '',
            category: {
                id: '',
                title: '',
                image: '',
            }
        },
        openTooltip: false,
        editMode: false,
        id: 0
    }
]

export const TwitterLink = 'https://x.com/_madiou'

export const DiscordLink = 'https://discord.gg/jh2H577Ytr'