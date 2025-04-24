import { createContext,useReducer } from "react";
import Reducer from "../Reducers/todosReducer";

export const TodosContext =createContext([])
const TodosProvider=({children})=>{
    const [todos,dispatchTodos]=useReducer(Reducer,[])
    return(
       < TodosContext.Provider value ={{todos:todos,dispatch:dispatchTodos}}>
       {children}
       </TodosContext.Provider>
    )
}
export default TodosProvider
// export const TodosContext=createContext([])