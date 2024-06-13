import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getOrder, deleteOrder } from '../../api/Order.api';
import { toast } from 'react-toastify';

function FormDeleteOrder({ toggle, orderId, loadOrders }) {

    const [order, setOrder] = useState([]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await deleteOrder(order.id, data);
            toggle();
            loadOrders();
            toast.success("Order successfully removed");
          } catch (error) {
            toast.error(`Error deleting order`);
          }
    });

    useEffect(() => {
        async function loadOrder() {
            const res = await getOrder(orderId);
            setOrder(res.data);    
        }
        loadOrder();
      }, [orderId]
    );

    return (
        <>
        <h3>¿Are you sure you want to eliminate the order "{order.orderNumber}"?</h3>
        <form onSubmit={onSubmit}>
            <div className='contenedor-btn'>
                <button className='btn-cancelar' type='button' onClick={toggle}>Cancel</button>
                <button className='btn-eliminar' type='submit'>Delete</button>
            </div>
        </form>
        </>
    );
}

export { FormDeleteOrder };
