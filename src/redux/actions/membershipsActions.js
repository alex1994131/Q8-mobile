import { Request } from "../services";
import { setToken } from "../services/index";

export const membershipsLoad = () => async ( dispatch ) => {
  return await Request('get',"memberships/")
  .then((res) => {
    dispatch({ type: "MEMBERSHIPS_DATA", payload: res });
  }).catch(err=>{
    setToken('');
    dispatch({type:"LOGOUT"});
  })
};