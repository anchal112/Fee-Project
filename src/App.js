import './App.css';
import {Routes,Route} from "react-router-dom"
import Exchanges from './components/Exchanges';
import Coins from './components/Coins';
import CoinDetails from './components/CoinDetails'
import LoginSignUp from './components/LoginSignUp';
import SavedCoins from './components/SavedCoins';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Exchanges/>} />
      <Route path='/coins' element={<Coins/>}/>
      <Route path='/coins/:id' element={<CoinDetails/>}/>
      <Route path='/login' element={<LoginSignUp/>}/>
      <Route path='/saved-coins' element={<SavedCoins/>} />
    </Routes>
  );
}
export default App;
