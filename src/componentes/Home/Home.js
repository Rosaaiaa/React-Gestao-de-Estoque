import "./Home.css";
import Header from '../Header/Header'
import fundo from '../../assets/Home imagem.png'

function Home () {
    return (
        <>
        <Header></Header>
        <img src={fundo} alt="Logo da empresa" className="fundo" />
        </>
    )
}

export default Home;