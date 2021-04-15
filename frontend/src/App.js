import {Container, Row} from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import HomeScreen from './components/screens/homeScreen/HomeScreen.jsx';
import ProductScreen from "./components/screens/productScreen/ProductScreen";
import CartScreen from "./components/screens/cartScreen/CartScreen";
import LoginScreen from "./components/screens/loginScreen/LoginScreen";
import RegisterScreen from "./components/screens/registerScreen/RegisterScreen";
import ProfileScreen from "./components/screens/profileScreen/ProfileScreen";
import ShippingScreen from "./components/screens/shippingScreen/ShippingScreen";
import PaymentScreen from "./components/screens/paymentScreen/PaymentScreen";
import PlaceOrderScreen from "./components/screens/placeOrderScreen/PlaceOrderScreen";
import OrderScreen from "./components/screens/orderScreen/OrderScreen";
import UserListScreen from "./components/screens/userListScreen/UserListScreen";

// https://godaddy.zoom.us/j/96042277867?pwd=TVh2WXZPVUlwYzBINDJSTUxaWFBtZz09

function App() {
    return (
        <Router>
            <Header/>
            <main className='py-3'>
                <Container>
                    <Route path='/' component={HomeScreen} exact/>
                    <Route path='/login' component={LoginScreen}/>
                    <Route path='/profile' component={ProfileScreen}/>
                    <Route path='/register' component={RegisterScreen}/>
                    <Route path='/product/:id' component={ProductScreen}/>
                    <Route path='/cart/:id?' component={CartScreen}/>
                    <Route path='/order/:id?' component={OrderScreen}/>
                    <Route path='/shipping' component={ShippingScreen}/>
                    <Route path='/payment' component={PaymentScreen}/>
                    <Route path='/placeorder' component={PlaceOrderScreen}/>
                    <Route path='/admin/users' component={UserListScreen}/>
                </Container>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
