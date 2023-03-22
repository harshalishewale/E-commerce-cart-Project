export const ADD = (item) => {
    return {
        type: "ADD_CART",
        payload: item
    }
}

export const REMOVE = (id) => {
    return {
        type: "REMOVE_CART",
        payload: id
    }
}


export const REMOVEONE = (item) => {
    return {
        type: "REMOVE_ONE",
        payload: item
    }
}