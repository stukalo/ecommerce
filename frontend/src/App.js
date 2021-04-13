import {Container} from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import HomeScreen from './components/screens/homeScreen/HomeScreen.jsx';
import ProductScreen from "./components/screens/productScreen/ProductScreen";
import CartScreen from "./components/screens/cartScreen/CartScreen";

function App() {
    return (
        <Router>
            <Header/>
            <main className='py-3'>
                <Container>
                    <Route path='/' component={HomeScreen} exact/>
                    <Route path='/product/:id' component={ProductScreen}/>
                    <Route path='/cart/:id?' component={CartScreen}/>
                </Container>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
