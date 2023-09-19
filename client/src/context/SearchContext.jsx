import { createContext, useReducer } from "react";

// create context api for date
const INITIAL_STATE={
    city:undefined,
    dates:[],
    options:{
      adult:undefined,
      childen:undefined,
      room:undefined
    },
};
export const SearchContext=createContext(INITIAL_STATE)

// reducer
const SearchReducer=(state,action)=>{
    switch(action.type){
        case "NEW_SEARCH":
        return action.payload
        // payload will be city,dates and options
        case "RESET_SEARCH":
        return INITIAL_STATE
        default:
            return state;
    }
};

//  send reduce in provider
export const SearchContextProvider= ({children})=>{
    const [state,dispatch]=useReducer(SearchReducer,INITIAL_STATE);


//  return the provider
 return(
    <SearchContext.Provider value={{city:state.city,dates:state.dates,options:state.options,dispatch}}>
        {children}
    </SearchContext.Provider>
 )   
}