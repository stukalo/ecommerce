import { useState, useEffect } from 'react';
import axios from 'axios';
import {Col, Row} from "react-bootstrap";
import Product from "../../product/Product";

const HomeScreen = props => {
    const [products, setProducts] = useState([]);

    useEffect( () => {
        (async function fetchProducts() {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        })();
    }, [])

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen;