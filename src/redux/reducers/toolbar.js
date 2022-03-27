const initialState = {
    node: false,
    edge: false,
    eraser: false,
    popper: false,
};

const toolbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case "DISABLE_ALL":
            return initialState
        case "SET_NODE_ACTIVE":
            return {
                ...state,
                node: true
            }
        case "SET_EDGE_ACTIVE":
            return {
                ...state,
                edge: true
            }
        case "SET_ERASER_ACTIVE":
            return {
                ...state,
                eraser: true
            }
        case "SET_POPPER_ACTIVE":
            return{
                ...state,
                popper: true
            }
        default:
            return state;
    }
}

export default toolbarReducer;