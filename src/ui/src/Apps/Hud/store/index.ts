const INITIAL_STATE = {
    visible: false,
    data: {},
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
    }
}

export default reducer;
