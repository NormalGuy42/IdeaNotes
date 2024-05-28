type UserData = {
    usertype: Boolean | null,
    ideaList: Array<Idea> | null,
    username: String | null,
}

type Idea = {
    title: String,
    category: String,
    type: String,
    text: String,
}