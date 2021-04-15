import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import FormContainer from "../../formContainer/FormContainer";
import CheckoutSteps from "../../checkoutSteps/CheckoutSteps";
import {Button, Col, Form} from "react-bootstrap";
import {savePaymentMethod} from "../../../actions/cartActions";

function PaymentScreen({history}) {
    const dispatch = useDispatch();
    const {shippingAddress} = useSelector(state => state.cart);
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    useEffect(() => {
        if (!shippingAddress.address) {
            history.push('/shipping');
        }
    }, [history, shippingAddress]);

    const submitHandler = e => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default PaymentScreen;