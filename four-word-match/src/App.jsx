import ConnectGame from './ConnectGame.jsx';
import ForeignProfile from './ForeignProfile.jsx';
import Header from './Header.jsx';
import Profile from './Profile.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return(
    <div>
        <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ConnectGame /> }/>
          <Route path="/:gameID" element={<ConnectGame /> }/>
          <Route path="/profile" element={<Profile /> }/>
          <Route path="/profile/:profileID" element={<ForeignProfile /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App
