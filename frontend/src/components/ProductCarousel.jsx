import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return (<>
    {
      isLoading 
        ? <Loader /> 
        : error 
        ? <Message variant="danger">{error}</Message>
        : (
          <Carousel pause="hover" className="carousel bg-primary mb-4 w-50">
            {
              products.map((product) => (
                <Carousel.Item key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid className="d-block w-100" />
                    <Carousel.Caption className="carousel-caption">
                      <h2>
                        {product.name} - ${product.price}
                      </h2>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              ))
            }
          </Carousel>
        )
    }
  </>)
}

export default ProductCarousel