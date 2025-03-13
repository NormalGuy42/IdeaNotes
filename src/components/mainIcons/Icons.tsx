export const CustomLoadingIcon = ()=>{
    return(
        <div role="status">
            <svg aria-hidden="true" className="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" height={24}>
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
}


export const BackIcon = ()=>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" className="nav-icon" style={{rotate:"-180deg",transform:"rotateY(-180deg)"}} >
            <path d="M9.70711 13.2929C10.0976 13.6834 10.0976 14.3166 9.70711 14.7071C9.31658 15.0976 8.68342 15.0976 8.29289 14.7071L3.29289 9.70711C2.90237 9.31658 2.90237 8.68342 3.29289 8.29289L8.29289 3.29289C8.68342 2.90237 9.31658 2.90237 9.70711 3.29289C10.0976 3.68342 10.0976 4.31658 9.70711 4.70711L6.41421 8H16C17.3261 8 18.5979 8.52678 19.5355 9.46447C20.4732 10.4021 21 11.6739 21 13V20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20V13C19 12.2044 18.6839 11.4413 18.1213 10.8787C17.5587 10.3161 16.7957 10 16 10H6.41421L9.70711 13.2929Z"/>
        </svg>
    )
}

export const AddIcon = ()=>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
        </svg>
    )
}

// export const LibraryIcon = ()=>{
//     return(
//         <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" width="800px" height="800px" viewBox="0 0 24 24">
//             <path d="M3 8v11c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v3zm3-4h13v12H5V5c0-.806.55-.988 1-1z"/><path d="m11.997 14 3.35-3.289a2.129 2.129 0 0 0 0-3.069 2.225 2.225 0 0 0-3.126 0l-.224.218-.224-.219a2.224 2.224 0 0 0-3.125 0 2.129 2.129 0 0 0 0 3.069L11.997 14z"/>
//         </svg>
//     )
// }

export const LibraryIcon = ()=>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" width="800px" height="800px" viewBox="0 0 24 24">
            <path d="M6.012 18H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19c0-.101.009-.191.024-.273.112-.576.584-.717.988-.727zM8.648 7.642a2.224 2.224 0 0 1 3.125 0l.224.219.223-.219a2.225 2.225 0 0 1 3.126 0 2.129 2.129 0 0 1 0 3.069L11.998 14l-3.349-3.289a2.128 2.128 0 0 1-.001-3.069z"/>
        </svg>
    )
}

export const UserIcon = ()=>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" viewBox="0 0 448 512">
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
        </svg>
    )
}

export const HomeIcon = ()=>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" viewBox="0 0 576 512">
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
        </svg>
    )
}