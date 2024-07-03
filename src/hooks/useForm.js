import React,{ useState } from 'react';

export const useForm = ( initialForm = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        if(name=="password" && value.length>4) {
            console.log("Piso password");
            return
            
        }
        setFormState({
            ...formState,
            [ name ]: value
        });
        
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}