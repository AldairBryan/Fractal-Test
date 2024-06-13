import React, { useEffect, useState } from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { getAllOrders } from '../../api/Order.api';
import orderColumns from '../../Utils/componentUtils/orderColumns';
import  Modal  from '../../components/Modal';
import { Table } from '../../components/Table/Table';
import { FormDeleteOrder } from './FormDeleteOrder';
import { useNavigate } from 'react-router-dom';
import '../../styles/ContenedorComp.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Orders() {

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);   

  const [activeFormDelete, setActiveFormDelete] = useState(false);
  
  const [selectedIdOrder, setSelectedIdOrder] = useState();
  
  const handleAdd = () => {
    navigate(`/orders/add-edit`);
  }
  
  const handleEdit = (idOrder) => {
    const order = orders.find(order => order.id === idOrder);
    if (order.status === 'COMPLETED') {
      toast.error('Cannot edit an order that is finished.');
      return;
    }
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
        <div className='btn-agregar' onClick={handleAdd}>
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
        onEdit={handleEdit}
        onDelete={handleDelete}
        clickableRows={false}
      />         
    </div>

    <ToastContainer />
    <Modal active={activeFormDelete} toggle={handleDelete}>
      <FormDeleteOrder toggle={handleDelete} orderId={selectedIdOrder} loadOrders={loadOrders} /> 
    </Modal>
    </>
  )
}

export default Orders;