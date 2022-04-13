import { createStore, combineReducers } from "redux";

import { HudReducer } from "../Apps";

const store = createStore(
    combineReducers({
        hud: HudReducer,
    })
);
export default store;
