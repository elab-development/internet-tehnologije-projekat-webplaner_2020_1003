import logo from './logo.svg';
import './App.css';
import Pocetna from './components/Pocetna';
import Footer from './components/Footer';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
        <Pocetna></Pocetna>
        <Register></Register>
        <Footer></Footer>
    </div>
  );
}

export default App;
