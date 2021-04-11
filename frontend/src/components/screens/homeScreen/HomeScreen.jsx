import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from "react-bootstrap";
import Product from "../../product/Product";
import { listProducts } from '../../../actions/productActions';

const HomeScreen = props => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, []);

    console.log(productList);

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <h2>Loading...</h2> :
                error ? <h3>{error}</h3> :
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
            }
        </div>
    )
}

export default HomeScreen;