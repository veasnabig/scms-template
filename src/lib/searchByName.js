const toLower=(text) =>{
    return text.toString().toLowerCase()
}
const searchByName=(items, term)=> {
    if (term) {
        return items.filter(item => toLower(item.name).includes(toLower(term)))
    }
    return items
}
export default searchByName;