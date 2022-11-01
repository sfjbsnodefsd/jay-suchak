import { InitialState } from "@ngrx/store/src/models";
import { ActionParent } from "../actions/todo.actions";
import { Todo } from "../Entity/Todo";

const initState: Todo[] = [{
        title: "Dummy Title 1"
}]

export function TodoReducer(state = initState, action: ActionParent) {
    switch (action.type) {
        default:
            return state;
            break;
    }  
} 