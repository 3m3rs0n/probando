const popperCreatorReducer = (state = {}, action) => {
    switch(action.type) {
        case "SET_NEW_POPPER_POSITION":
            return {
                ...state,
                node: action.data
            }
        default:
            return state;
    }
}

export default popperCreatorReducer;