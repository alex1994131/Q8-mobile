var initdata = {
    categoriesData : null, 
}
const categoriesReducer = (state = initdata, action) => {
    switch (action.type) {
        case "CATEGORIES_DATA": {
            return { ...state, categoriesData: action.payload }
        }
        default: {
            return state
        }
    }
}
export default categoriesReducer