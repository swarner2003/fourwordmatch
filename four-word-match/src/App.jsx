import ConnectGame from './ConnectGame.jsx';
import Header from './Header.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ConnectGame /> }/>
        <Route path="/:gameID" element={<ConnectGame /> }/>
      </Routes>
    </BrowserRouter>
  );

}

export default App
