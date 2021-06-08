var initdata = {
    shopsData : [], 
}
const shopsReducer = (state = initdata, action) => {
    switch (action.type) {
        case "SHOPS_DATA": {
            return { ...state, shopsData: action.payload }
        }
        default: {
            return state
        }
    }
}
export default shopsReducer