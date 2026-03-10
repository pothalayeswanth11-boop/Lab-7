import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    // Using URL state (search parameters) to simulate basic history/filtering
    const filter = searchParams.get('filter') || '';

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=12')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(filter.toLowerCase())
    );

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading products...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h2>Products Overview</h2>

            <input
                type="text"
                placeholder="Search products (Updates URL)..."
                value={filter}
                onChange={(e) => setSearchParams({ filter: e.target.value })}
                style={{ padding: '10px', width: '300px', marginBottom: '2rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
                {filteredProducts.map(product => (
                    <div key={product.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white' }}>
                        <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                        <div style={{ padding: '1rem' }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{product.title}</h3>
                            <p style={{ color: '#38a169', fontWeight: 'bold', margin: '0 0 1rem 0' }}>${product.price}</p>
                            {/* This Link uses dynamic routing to the details page! */}
                            <Link
                                to={`/products/${product.id}`}
                                style={{
                                    display: 'block', backgroundColor: '#3182ce', color: 'white', textAlign: 'center', padding: '8px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold'
                                }}
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
