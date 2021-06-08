import { Request } from "../services";

export const brandsLoad = () => async (dispatch) => {
  return await Request('get',"brands/")
  .then(res => {
    dispatch({ type: "BRAND_DATA", data: res})
  })
  .catch(err => console.log(err))
}

export const brandsCreate =(req)=> async (dispatch) => {
  return await Request('post','brands/',req)
  .then(res => {
    dispatch({ type: "BRAND_DATA", data: res})
  })
  .catch(err => console.log(err))
}

export const brandsUpdate = (req) => async (dispatch) => {
  return await Request('put',`brands/${req.getAll('id')[0]}`,req)
  .then(res => {
    dispatch({ type: "BRAND_DATA", data: res})
  })
  .catch(err => console.log(err))
}

export const brandsDelete = (id)=> async (dispatch) => {
  return await Request('delete',`brands/${id}`)
  .then(res => {
    dispatch({ type: "BRAND_DATA", data: res})
  })
  .catch(err => console.log(err))
}