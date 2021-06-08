const initialState = {
    brandsData: null,
}
  
const brandsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "BRAND_DATA":
        return {...state, brandsData: action.data}
      default:
        return state
    }
}
    
export default brandsReducer