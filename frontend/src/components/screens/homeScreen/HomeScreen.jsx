import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from "react-bootstrap";
import Product from "../../product/Product";
import { listProducts } from '../../../actions/productActions';

const HomeScreen = props => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.productList);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

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