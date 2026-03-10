import React, { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams(); // Get the dynamic `id` from the URL string
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading specific product {id}...</div>;
    if (!product) return <div style={{ padding: '2rem', textAlign: 'center' }}>Product not found.</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <button
                onClick={() => navigate('/products')}
                style={{ marginBottom: '1rem', background: 'none', border: 'none', color: '#3182ce', cursor: 'pointer', textDecoration: 'underline' }}
            >
                ← Back to All Products
            </button>

            <div style={{ display: 'flex', gap: '2rem' }}>
                <img src={product.thumbnail} alt={product.title} style={{ width: '300px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <div>
                    <h2 style={{ marginTop: 0, fontSize: '2rem' }}>{product.title}</h2>
                    <p style={{ color: '#4a5568', fontSize: '1.2rem', margin: '0 0 1rem 0' }}>{product.brand} - {product.category}</p>
                    <p style={{ color: '#38a169', fontWeight: 'bold', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>${product.price}</p>
                    <p style={{ lineHeight: '1.6' }}>{product.description}</p>

                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                        <Link
                            to="reviews"
                            style={{ padding: '8px 16px', backgroundColor: '#edf2f7', borderRadius: '4px', textDecoration: 'none', color: '#2d3748', border: '1px solid #cbd5e0' }}
                        >
                            Show Reviews (Nested Route)
                        </Link>
                        <Link
                            to="specs"
                            style={{ padding: '8px 16px', backgroundColor: '#edf2f7', borderRadius: '4px', textDecoration: 'none', color: '#2d3748', border: '1px solid #cbd5e0' }}
                        >
                            Show Specs (Nested Route)
                        </Link>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid #e2e8f0' }}>
                {/* Render nested routes here! If the user goes to /products/1/reviews, it renders the Reviews component right here */}
                <h2>Product Details View:</h2>
                <Outlet context={product} /> {/* Pass data down to nested routes */}

                {/* If there's no nested route currently matched, show a prompt. */}
                {location.pathname === `/products/${id}` && (
                    <p style={{ color: '#a0aec0', fontStyle: 'italic' }}>Select a tab above to view more details without reloading the page.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
