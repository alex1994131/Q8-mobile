import { Request } from "../services";

export const productsLoad = () => async (dispatch, getState) => {
  return await Request('get',"products/")
  .then(res => {
    dispatch({ type: "PRODUCT_DATA", data: res})
  })
  .catch(err => console.log(err))
}

export const productsDelete = (id)=> async (dispatch, getState) => {
  var products = getState().products.productsData;
  return await Request('delete',`products/${id}`)
  .then(res => {
    products = products.filter(function( obj ) {
      return obj.id !== id;
    });
    dispatch({ type: "PRODUCT_DATA", data: products })
  })
  .catch(err => console.log(err))
}

export const productsCreate =(req)=> async (dispatch) => {
  return await Request('post','products/',req)
  .then(res => {
    alert('Waiting for administrator approval.')
  })
  .catch(err => console.log(err))
}

export const productsUpdate = (req,id) =>  async (dispatch) => {
  return await Request('put',`products/${id}`,req)
  .then(res => {
    dispatch({ type: "PRODUCT_DATA", data: res })
    alert('Success')
  })
  .catch(err => console.log(err))
}