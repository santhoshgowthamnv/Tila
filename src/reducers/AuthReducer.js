import { SET_MODAL, SET_TOKEN, SET_TRACKED_EVENTS } from "../actions/types"

const INITIAL_STATE = {
    modalVisible: false,
    userName: "",
    trackingEvents: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_MODAL:
            return { ...state, modalVisible: !state.modalVisible };
        case SET_TOKEN:
            return { ...state, userName: action.payload };
        case SET_TRACKED_EVENTS:
            return { ...state, trackingEvents: action.payload };
        default:
            return state;
    }
};