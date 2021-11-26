export default {
    playerByIdentity:state=>(identity)=>{
        return state.avatars.filter(item=>item.identity==identity)
    }
}