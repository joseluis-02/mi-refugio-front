export const upperCamelCase = (data) => {
   let palabra='';
    for(let i = 0; i < data.length; i++) {
        if(i===0){
            palabra += data[i].toUpperCase();
        }else{
            palabra += data[i].toLowerCase();
        }
        
    }
    return palabra;
}