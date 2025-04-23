import axios from 'axios';




// instance of axios with name api and now we make the req with api and the configuration in this api is for all 
const api = axios.create({
  // baseURL: 'http://localhost:4000',
  headers: { 'Content-Type': 'multipart/form-data' },
  // timeout: 15000,
  withCredentials: true
});









export const axiosReqFunc = async (method, url, data = {}, isImage) => {
  try {

    console.log(method, url)
    // if (isImage) {
    //   isHaveImage = true
    // }




    // let configuration = {
    //   method,
    //   url,
    //   data,
    //   withCredentials: true
    // }







    let configuration = null;

    if (method == "get") {
      configuration = {
        method,
        url,
        withCredentials: true
      }

    }

    else if (method == "post") {
      configuration = {
        method,
        url,
        data,
        withCredentials: true
      }

    }



    if (!isImage) {
      configuration.headers= {
        'Content-Type':"application/json"
      }
    }






    let response= await axios(configuration)







    // let response = null;

    // if (method == "get") {
    //   response = await api({ method, url });
    // }

    // else if (method == "post") {
    //   response = await api({ method, url, data });
    // }



    console.log(response.data)
    return response;


    // if(response){
    // }else{
    //     throw new Error("Data not found From server")
    // }





  } catch (err) {
    throw new Error(err.message);
  }
};  