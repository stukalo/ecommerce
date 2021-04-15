import {Button, Col, Form, Row, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getQueryParams} from "../../../utils/queryStringHelper";
import {getUserDetails, register, updateUserProfile} from "../../../actions/userActions";
import Message from "../../meassage/Message";
import Loader from "../../loader/Loader";
import {Link} from "react-router-dom";
import FormContainer from "../../formContainer/FormContainer";
import {USER_UPDATE_PROFILE_RESET} from "../../../constants/userConstants";
import {listMyOrders} from "../../../actions/orderActions";
import {toLocalDateTime} from "../../../utils/formatDateTime";
import {LinkContainer} from 'react-router-bootstrap';

function ProfileScreen({history}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const {error: userDetailsError, loading: userDetailsLoading, user} = useSelector(state => state.userDetails);
    const {userInfo} = useSelector(state => state.userLogin);
    const {success: userUpdateProfileSuccess} = useSelector(state => state.userUpdateProfile);
    const {error: myOrdersListError, loading: myOrdersListLoading, orders} = useSelector(state => state.myOrdersList);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user || !user.name || userUpdateProfileSuccess) {
                dispatch({type: USER_UPDATE_PROFILE_RESET});
                !userDetailsError && !userDetailsLoading && dispatch(getUserDetails('profile'));
                !myOrdersListError && !myOrdersListLoading && dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [history, userInfo, user, userUpdateProfileSuccess]);

    const submitHandler = e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Password does not match');
        } else {
            dispatch(updateUserProfile({
                id: user._id,
                name,
                email,
                password,
            }))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {userDetailsError && <Message variant='danger'>{userDetailsError}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {userDetailsLoading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {myOrdersListLoading ? (
                    <Loader/>
                ) : myOrdersListError ? (
                    <Message variant='danger'>{myOrdersListError}</Message>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{toLocalDateTime(order.createdAt)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? toLocalDateTime(order.paidAt) : (
                                        <i className='fas fa-times' style={{color: 'red'}}/>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                    <td>{order._id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
}

export default ProfileScreen;