import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getProduct, deleteProduct } from '../../api/Product.api';
import { toast } from 'react-toastify';

function FormDeleteProduct({ toggle, productId, loadProducts }) {

    const [product, setProduct] = useState([]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await deleteProduct(product.id, data);
            toggle();
            loadProducts();
            toast.success("Product successfully removed");
          } catch (error) {
            toast.error(`Error deleting product`);
          }
    });

    useEffect(() => {
        async function loadProduct() {
            const res = await getProduct(productId);
            setProduct(res.data);    
        }
        loadProduct();
      }, [productId]
    );

    return (
        <>
        <h3>¿Are you sure you want to eliminate the product "{product.name}"?</h3>
        <form onSubmit={onSubmit}>
            <div className='contenedor-btn'>
                <button className='btn-cancelar' type='button' onClick={toggle}>Cancel</button>
                <button className='btn-eliminar' type='submit'>Delete</button>
            </div>
        </form>
        </>
    );
}

export { FormDeleteProduct };
