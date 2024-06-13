import React, { useEffect, useState } from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { getAllOrders } from '../../api/Order.api';
import orderColumns from '../../Utils/componentUtils/orderColumns';
import  Modal  from '../../components/Modal';
import { Table } from '../../components/Table/Table';
//import { FormDeleteProduct } from './FormDeleteProduct';
import '../../styles/ContenedorComp.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Orders() {

  const [orders, setOrders] = useState([]);   

  const [activeFormDelete, setActiveFormDelete] = useState(false);
  
  const [selectedIdOrder, setSelectedIdOrder] = useState();
  
  const handleAddEdit = (idOrder) => {
    navigate(`/orders/add-edit/${idOrder}`);
  }
  const handleDelete = (idOrder) => {
    setSelectedIdOrder(idOrder);
    setActiveFormDelete(!activeFormDelete);
  };
  
  const loadOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res);
    } catch (error) {
        toast.error(`Error loading Products`);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <>   
    <div className='contenedor-componente'>
      <div className='contenedor-titulo'>
        <h2>Orders</h2>
        <div className='btn-agregar' onClick={handleAddEdit}>
          <BsFillPlusCircleFill
            color='green'
            className="icon-add"
          />
          <h3>Add</h3>
        </div>
      </div>
      <Table
        nombreID={'id'}
        columns={orderColumns()}
        data={orders}
        nombre={'orders'}
        onEdit={handleAddEdit}
        onDelete={handleDelete}
        clickableRows={false}
      />         
    </div>

    <ToastContainer />

    {/* Modal para eliminar  
    <Modal active={activeFormDelete} toggle={handleDelete}>
      <FormDeleteProduct toggle={handleDelete} productId={selectedIdProduct} loadProducts={loadProducts} /> 
    </Modal> */}
    </>
  )
}

export default Orders;