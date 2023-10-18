import HomePage from "../pages/HomePage"
import {Routes, Route, Link, useNavigate, Navigate} from 'react-router-dom'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import './estilos.css'

function App() {

    return <>

    <Header>
        <header>
        <div className="logo">
            <a href="/" id="logo">Ariel Diez soluciones eléctricas</a>
        </div>
        <nav id="menu">
            <ul id="hamburguesa">
                <li><a href="#menu">abrir</a></li>
                <li><a href="#">cerrar</a></li>
            </ul>
            <ul id="barra">
                <li><a href="/">HOME</a></li>
                <li><a href="#servicios">SERVICIOS</a></li>
                <li><a href="#trabajos">TRABAJOS</a></li>
                <li><a href="#contacto">CONTACTO</a></li>
            </ul>
        </nav>
        </header>
    </Header>

    <Content>
    <Routes>
    <Route path='/' element={<HomePage/>}></Route>

    <Route path='/trabajos/:id' element={<DetalleTrabajo/>}></Route>

    </Routes>
    </Content>

    <Footer>
        <footer> <p>Ariel Diez Soluciones eléctricas 2023</p>
        <p>Todos los derechos reservados</p>
        </footer>
    </Footer>

    </>

}

export default App