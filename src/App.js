
import './App.css';
//import NFTswap from "./pages/NFTswap";
import Index from './pages/index';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store"
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Index />
          </BrowserRouter>

        </div>
      </Provider>

      <ToastContainer></ToastContainer>
    </>

  );
}

export default App;
