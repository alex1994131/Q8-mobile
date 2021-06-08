import { Request } from "../services";
import { setToken } from "../services/index";

export const shopsLoad = () => async ( dispatch ) => {
  return await Request('get',"shops/")
  .then((res) => {
    dispatch({ type: "SHOPS_DATA", payload: res });
  }).catch(err=>{
    setToken('');
    dispatch({type:"LOGOUT"});
  })
};