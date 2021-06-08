import { Request } from "../services";
import { setToken } from "../services/index";

export const categoriesLoad = (id) => async ( dispatch ) => {
  console.log(id);
  if(id){
    console.log(id,'ddddddddddddddd')
    await Request('post',"categories/find", {shop:id})
    .then((res) => {
      console.log(res,'ddddddddddddddd')
      dispatch({ type: "CATEGORIES_DATA", payload: res });
    }).catch(err=>{
      setToken('');
      dispatch({type:"LOGOUT"});
    })
  }else{
    await Request('get',"categories/")
    .then((res) => {
      dispatch({ type: "CATEGORIES_DATA", payload: res });
    }).catch(err=>{
      setToken('');
      dispatch({type:"LOGOUT"});
    })
  }
};