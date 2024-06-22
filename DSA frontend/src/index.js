import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import axios from "axios";


const container = document.getElementById('root')

const root = createRoot(container)

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1"

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)