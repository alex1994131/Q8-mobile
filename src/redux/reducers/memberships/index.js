var initdata = {
    membershipsData : null, 
}
const membershipsReducer = (state = initdata, action) => {
    switch (action.type) {
        case "MEMBERSHIPS_DATA": {
            return { ...state, membershipsData: action.payload }
        }
        default: {
            return state
        }
    }
}
export default membershipsReducer