import Rawr from "./page/Rawr";
import React from "react";
import { StoreProvider } from "easy-peasy";
import store from "./redux/store";

const App: React.FC = () => {
    return (
        <StoreProvider store={store}>
            <Rawr />
        </StoreProvider>
    );
};

export default App;
