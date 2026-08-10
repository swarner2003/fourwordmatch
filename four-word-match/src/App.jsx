import ConnectGame from './ConnectGame.jsx';
import Header from './Header.jsx';
import Register from './Register.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return(
    <div>
        <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ConnectGame /> }/>
          <Route path="/login" element={<Register /> }/>
          <Route path="/:gameID" element={<ConnectGame /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App
