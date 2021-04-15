import {useDispatch, useSelector} from "react-redux";
import CheckoutSteps from "../../checkoutSteps/CheckoutSteps";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import Message from "../../meassage/Message";
import {Link} from "react-router-dom";
import {createOrder} from "../../../actions/orderActions";
import {round} from "../../../utils/formatNumbers";
import {useEffect} from "react";
import {ORDER_CREATE_RESET} from "../../../constants/orderConstants";

function PlaceOrderScreen({history}) {
    const dispatch = useDispatch();
    const {order, error, success, loading} = useSelector(state => state.orderCreate);
    const {paymentMethod, shippingAddress, cartItems} = useSelector(state => state.cart);

    const itemsPrice = round(cartItems.reduce((acc, el) => acc + el.price * el.qty, 0), 2);
    const shippingPrice = round(itemsPrice > 100 ? 0 : 10, 2);
    const taxPrice = round(0.082 * itemsPrice, 2);
    const totalPrice = round(itemsPrice + shippingPrice + taxPrice, 2);

    useEffect(() => {
        if (!paymentMethod) {
            history.push('/payment');
        }
    }, [history, paymentMethod]);

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [success, history]);

    const placeOrder = () => {
        dispatch(createOrder({
            taxPrice,
            totalPrice,
            itemsPrice,
            orderItems: cartItems,
            shippingPrice,
            paymentMethod,
            shippingAddress,
        }));
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {shippingAddress.address}, {shippingAddress.city}
                                {' '}
                                {shippingAddress.postalCode}
                                {' '}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Item</h2>
                            {!cartItems.length ? (
                                <Message variant='info'>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1} style={{padding: 0}}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item: </Col>
                                    <Col>${itemsPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${shippingPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${taxPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>${totalPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default PlaceOrderScreen;