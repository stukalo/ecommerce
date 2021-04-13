import {getQueryParams} from "../../../utils/queryStringHelper";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {addToCart, removeFromCart} from "../../../actions/cartActions";
import {Button, Card, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import Message from "../../meassage/Message";
import {Link} from "react-router-dom";

function CartScreen({match, history}) {
    const {id: productId} = match.params;
    const {qty: qtyParam} = getQueryParams();
    const qty = qtyParam ? parseInt(qtyParam) : 1;
    const dispatch = useDispatch();
    const {cartItems} = useSelector(store => store.cart);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {!cartItems.length ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={e => {
                                                dispatch(addToCart(item.product, parseInt(e.target.value)));
                                            }}
                                        >
                                            {
                                                [...Array(item.countInStock)].map((_, index) => {
                                                    const value = index + 1;

                                                    return (
                                                        <option key={value} value={value}>
                                                            {value}
                                                        </option>
                                                    );
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash'/>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, el) => acc + el.qty, 0)}) items</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={!cartItems.length}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default CartScreen;