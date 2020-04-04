import { NAME_CHANGED, CLEAR_NAME_ERROR } from "../actions/types"

const INITIAL_STATE = {
    name: "",
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NAME_CHANGED:
            return { ...state, name: action.payload };
        case CLEAR_NAME_ERROR:
            return { ...state };
        default:
            return state;
    }
};