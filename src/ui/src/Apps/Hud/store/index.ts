const INITIAL_STATE = {
    visible: true,
    data: `function reactUI() {
    return "This is all working :) Yay | 'Hello World' <=== cant forget this one";
}`,
};

function reducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "SET_HUD_VISIBLE":
            return {
                ...state,
                visible: action.payload,
            };
        case "SET_HUD_DATA":
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;