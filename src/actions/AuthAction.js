import { SET_MODAL, SET_TOKEN, SET_TRACKED_EVENTS } from "./types"

export const setModal = () => {
    return {
        type: SET_MODAL,
    }
}

export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: token
    }
}

export const setTrackedEvents = (events) => {
    return {
        type: SET_TRACKED_EVENTS,
        payload: events
    }
}