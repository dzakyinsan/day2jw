import { TAMBAH, KURANG } from "../type"

export const Tambahactions=()=>{
    return{
        type:TAMBAH
    }
}

export const Kurangactions=()=>{
    return{
        type:'KURANG'
    }
}
export const ResetActions=()=>{
    return{
        type:'RESET'
    }
}