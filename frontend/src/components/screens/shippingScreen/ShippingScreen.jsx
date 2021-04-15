import React, {useState} from 'react';
import FormContainer from "../../formContainer/FormContainer";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../../../actions/cartActions";
import CheckoutSteps from "../../checkoutSteps/CheckoutSteps";

function ShippingScreen({history}) {
    const dispatch = useDispatch();
    const {shippingAddress} = useSelector(state => state.cart);

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const submitHandler = e => {
        e.preventDefault();
        dispatch(saveShippingAddress({
            city,
            address,
            country,
            postalCode,
        }));
        history.push('/payment');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter City'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Country'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' variant='primary' onClick={submitHandler}>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;