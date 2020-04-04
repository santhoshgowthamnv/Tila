import { NAME_CHANGED } from "./types"

export const nameChanged = (name) => {
    return {
        type: NAME_CHANGED,
        payload: name
    }
}
