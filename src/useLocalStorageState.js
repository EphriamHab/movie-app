import { useState, useEffect } from "react";

export function useLocalStorageState(intialState, key){
    const [value, setValue] = useState(function(){
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : intialState;
      });

      useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))

      },[value, setValue, key])
}