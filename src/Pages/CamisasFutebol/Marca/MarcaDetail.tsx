import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/data';
import { Product } from '../data/types';
import '../Style.css';
import NavBar from '../../../assets/Components/NavBar';

const MarcaDetail: React.FC = () => {
  const { marca } = useParams<{ marca: string }>();

  const filteredProducts: Product[] = products.filter((product) => product.marca === marca);

  return (
    <div>
      <NavBar/>
      <h1 className="title">{marca}</h1>
      <div className="product-container">
        {filteredProducts.map((product) => (
            <div className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <button>Adicionar ao Carrinho</button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default MarcaDetail;
