import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getOrderDetails, payOrder} from "../../../actions/orderActions";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import Message from "../../meassage/Message";
import {Link} from "react-router-dom";
import {round} from "../../../utils/formatNumbers";
import Loader from "../../loader/Loader";
import {PayPalButton} from "react-paypal-button-v2";
import {toLocalDateTime} from "../../../utils/formatDateTime";

function OrderScreen({match}) {
    const PAY_PAL_CLIENT_ID = 'ASvHTnir2aAIwIzNmmY3NwDnOHT9p5oYm3YQYXjYLiesjBryUMd2rqPY2P7wasCmK48nKxrPqmmauYZr';
    const payPalScriptSrc = `https://www.paypal.com/sdk/js?client-id=${PAY_PAL_CLIENT_ID}`;
    const orderId = match.params.id;
    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false);

    const {order = {}, error: errorDetails, loading: loadingDetails, success: successDetails} = useSelector(state => state.orderDetails);
    const {paymentMethod, shippingAddress = {}, orderItems = [], _id, user = {}, isPaid, paidAt, isDelivered, deliveredAt} = order;

    const {loading: loadingPay, success: successPay} = useSelector(state => state.orderPay);

    let itemsPrice = 0, shippingPrice = 0, taxPrice = 0, totalPrice = 0;

    if (!loadingDetails && !errorDetails && successDetails) {
        itemsPrice = round(orderItems.reduce((acc, el) => acc + el.price * el.qty, 0), 2);
        shippingPrice = round(itemsPrice > 100 ? 0 : 10, 2);
        taxPrice = round(0.082 * itemsPrice, 2);
        totalPrice = round(itemsPrice + shippingPrice + taxPrice, 2);
    }

    const checkScriptAppended = () => {
        const script = document.getElementsByTagName('head')[0].querySelector(`script[src='${payPalScriptSrc}']`);
        return !!script;
    }

    const addPayPalScript = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = payPalScriptSrc;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        }
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    const successPaymentHandler = paymentResult => {
        dispatch(payOrder(orderId, paymentResult));
    }

    useEffect(() => {
        if (!order || order._id !== parseInt(orderId)) {
            !loadingDetails && !errorDetails && dispatch(getOrderDetails(orderId));
        } else if (!isPaid) {
            if (!window.paypal && !checkScriptAppended()) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [successPay, loadingDetails, order, orderId]);

    return loadingDetails ? (
        <Loader/>
    ) : errorDetails ? (
        <Message variant='danger'>{errorDetails}</Message>
    ) : (
        <div>
            <h1>Order: {_id}</h1>
            <Row>
                <Col md={7}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${user.email}`}>{user.email}</a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {shippingAddress.address}, {shippingAddress.city}
                                {' '}
                                {shippingAddress.postalCode}
                                {' '}
                                {shippingAddress.country}
                            </p>
                            {isDelivered ? (
                                <Message variant='success'>Delivered on {toLocalDateTime(deliveredAt)}</Message>
                            ) : (
                                <Message variant='warning'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                            {isPaid ? (
                                <Message variant='success'>Paid on {toLocalDateTime(paidAt)}</Message>
                            ) : (
                                <Message variant='warning'>Not paid</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Item</h2>
                            {!orderItems.length ? (
                                <Message variant='info'>Your order is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {orderItems.map((item, index) => (
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
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={5}>
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
                            {!isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}
                                    {!sdkReady ? (
                                        <Loader/>
                                    ) : (
                                        <PayPalButton
                                            amount={totalPrice}
                                            options={{clientId: PAY_PAL_CLIENT_ID, currency: 'USD'}}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default OrderScreen;