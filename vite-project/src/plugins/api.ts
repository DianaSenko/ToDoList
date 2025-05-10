import axios from 'axios'; 


export const wrapperApi = async (method:string, url:string, data?:Record<string,string|number>) => {
try{
    const response = await axios({method, url, data});
    if(response.status === 200){
        return response.data;
    }
    throw new Error("Ошибка выполнения запроса");
    
    
}
catch(err){
    console.error(`Ошибка в api: ${err}`);
}
}