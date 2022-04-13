import store from "./Services/redux.service";
import { Provider } from "react-redux";

import { Hud } from "./Apps";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Hud />
            </div>
        </Provider>
    );
}

export default App;
