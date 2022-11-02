import { InitialState } from "@ngrx/store/src/models";
import { ActionParent } from "../actions/todo.actions";
import { Todo } from "../Entity/Todo";
import { TodoActionType } from "../shared/enum/todo-actions-enum";

const initState: Todo[] = [{
        title: "Dummy Title 1"
}]

export function TodoReducer(state = initState, action: ActionParent) {
    switch (action.type) {
        case TodoActionType.Add:
            return [...state, action.payload];
        case TodoActionType.Remove:
            return [...state.splice(action.payload, 1)]
        default:
            return state;
    }  
} 