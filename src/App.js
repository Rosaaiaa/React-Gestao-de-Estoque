import './App.css';
import { Router, Route, Routes } from 'react-router-dom';
//<FormUserLogin nome = "Renoir" curso ="ADS"/>

import Home from './componentes/Home/Home'
import CadastrarUser from './componentes/CadastrarUser/CadastrarUser';
import EntrarUser from './componentes/EntrarUser/EntrarUser';
import AtivarUser from './componentes/AtivarUser/AtivarUser';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/cadastrar' element={<CadastrarUser/>}/>
          <Route path='/entrar' element={<EntrarUser/>}/>
          <Route path='/ativar' element={<AtivarUser/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
