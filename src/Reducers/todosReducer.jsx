import { v4 } from 'uuid';
export default function Reducer(currentTodos, action) {
    switch (action.type) {
        case "added": {
            const newTodo = {
                id: v4(),
                title: action.payload.newTitle,
                details: "",
                isCompleted: false,
            };
            const updatedTodos = [...currentTodos, newTodo];
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case "deleted": {
            const updatedTodos = currentTodos.filter((ele) => {
                return ele.id != action.payload.id;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case "updated": {
            const updatedTodos = currentTodos.map((ele) => {
                if (ele.id == action.payload.id) {
                    return {
                        ...ele,
                        title: action.payload.title,
                        details: action.payload.details,
                    };
                } else return ele;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos)); //set local storage after all changes
            return updatedTodos;
        }
        case "get":{
            const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? []; //if local storage is empty return empty array
            return storageTodos ;
        }
        case "toggleCompleted":{
            const updateTodo = currentTodos.map((e) => {
                if (e.id === action.payload.id) {
                 let update={...e,isCompleted: !e.isCompleted }
                    // e.isCompleted = !e.isCompleted //mutation
                    return update;
                }
                return e;
            });
            localStorage.setItem("todos", JSON.stringify(updateTodo));
            return updateTodo;
        }

        // eslint-disable-next-line no-fallthrough
        default: {
            throw Error("unknown error " + action.type);
        }
    }
    return [];
}
