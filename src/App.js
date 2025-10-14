import logo from './logo.svg';
import './App.css';
import helloWorld from './componentes/helloWorld';
import FormUser from './componentes/FormUser';
import FormUserLogin from './componentes/FormUserLogin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FormUser/>
        <FormUserLogin nome = "Renoir" curso ="ADS"/>
      </header>
    </div>
  );
}

export default App;
