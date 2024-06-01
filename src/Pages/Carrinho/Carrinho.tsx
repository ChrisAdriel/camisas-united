import React, { useState } from 'react';
import NavBar from '../../assets/Components/NavBar';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const cartItems: CartItem[] = [
    { id: 1, name: 'Produto 1', price: 29.99, quantity: 2 },
    { id: 2, name: 'Produto 2', price: 49.99, quantity: 1 },
    { id: 3, name: 'Produto 3', price: 19.99, quantity: 3 },
];

const Cart: React.FC = () => {
    const [items, setItems] = useState<CartItem[]>(cartItems);
    const [checkoutCompleted, setCheckoutCompleted] = useState(false);

    const getTotal = () => {
        return items
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    const deleteItem = (id: number) => {
        console.log('Removendo item com ID:', id);
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
    };

    const handleCheckout = () => {
        alert(`Prosseguindo para o pagamento com total: R$${getTotal()}`);
        setCheckoutCompleted(true);
    };

    const renderCartItems = () => {
        return (
            <table className="w-full mb-4 divide-y divide-gray-700 border-solid border border-gray-700 ">
                <thead>
                    <tr>
                        <th className="text-center">Produto</th>
                        <th className="text-center">Preço</th>
                        <th className="text-center">Quantidade</th>
                        <th className="text-center">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td className="p-2 text-center">{item.name}</td>
                            <td className="p-2 text-center">R$ {item.price.toFixed(2)}</td>
                            <td className="p-2 text-center">{item.quantity}</td>
                            <td className="p-2 text-center">R$ {(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => deleteItem(item.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const renderCheckoutConfirmation = () => {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Compra Finalizada!</h2>
                    <p className="text-lg">Obrigado por comprar conosco!</p>
                    <p className="text-lg">Total da compra: R${getTotal()}</p>
                </div>
            </div>
        );
    };

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-600 p-4">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold mb-4 text-white">Carrinho de Compras</h1>
                    <div className="bg-white p-4 shadow-md rounded-lg">
                        {checkoutCompleted ? renderCheckoutConfirmation() : renderCartItems()}
                        {items.length > 0 && !checkoutCompleted && (
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">Total: R${getTotal()}</span>
                                <button className="bg-orange-500 hover:bg-orange-600 px-20 text-white py-2 rounded-md text-lg" onClick={handleCheckout}>Finalizar Compra</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
