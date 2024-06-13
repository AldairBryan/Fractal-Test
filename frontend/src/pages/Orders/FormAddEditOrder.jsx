import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getOrder, createOrder, updateOrder } from '../../api/Order.api';
import { getAllProducts } from '../../api/Product.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/ContenedorComp.css';

function FormAddEditOrder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [activeProductModal, setActiveProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const loadProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res);
    } catch (error) {
      toast.error('Error loading products');
    }
  };

  const loadOrder = async () => {
    if (isEditing) {
      try {
        const res = await getOrder(id);
        setOrder(res.data);
        setOrderProducts(res.data.orderProducts || []);
        setValue('orderNumber', res.data.orderNumber);
        setValue('date', new Date(res.data.date).toISOString().substring(0, 10));
        setValue('numberOfProducts', res.data.orderProducts.length);
        setValue('finalPrice', res.data.finalPrice);
      } catch (error) {
        toast.error('Error fetching order');
      }
    } else {
      setValue('date', new Date().toISOString().substring(0, 10));
    }
  };

  useEffect(() => {
    loadProducts();
    loadOrder();
  }, [id]);

  const handleCancel = () => {
    navigate('/orders');
  };

  const handleAddProduct = () => {
    setActiveProductModal(true);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleProductSave = () => {
    const existingProduct = orderProducts.find(op => op.product.id === selectedProduct.id);
    if (existingProduct) {
      existingProduct.quantity += selectedQuantity;
      existingProduct.totalPrice += selectedProduct.unitPrice * selectedQuantity;
    } else {
      const newOrderProduct = {
        product: selectedProduct,
        quantity: selectedQuantity,
        totalPrice: selectedProduct.unitPrice * selectedQuantity,
      };
      setOrderProducts([...orderProducts, newOrderProduct]);
    }
    setActiveProductModal(false);
    setSelectedProduct(null);
    setSelectedQuantity(1);
  };

  const handleProductEdit = (index) => {
    setSelectedProduct(orderProducts[index].product);
    setSelectedQuantity(orderProducts[index].quantity);
    setActiveProductModal(true);
  };

  const handleProductRemove = (index) => {
    const updatedOrderProducts = [...orderProducts];
    updatedOrderProducts.splice(index, 1);
    setOrderProducts(updatedOrderProducts);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const orderData = {
        ...data,
        orderProducts: orderProducts.map(op => ({
          product: op.product.id,
          quantity: op.quantity,
          totalPrice: op.totalPrice,
        })),
      };
      console.log(orderData);
      if (isEditing) {
        await updateOrder(order.id, orderData);
        toast.success('Order successfully updated');
      } else {
        await createOrder(orderData);
        toast.success('Order successfully created');
      }
      navigate('/orders');
    } catch (error) {
      toast.error('Error while creating / editing the order');
    }
  });

  const totalProducts = orderProducts.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = orderProducts.reduce((acc, curr) => acc + curr.totalPrice, 0);
  
  useEffect(() => {
    setValue('numberOfProducts', totalProducts);
    setValue('finalPrice', totalPrice);
  }, [orderProducts]);

  return (
    <div className='contenedor-componente'>
      <h2>{isEditing ? 'Edit Order' : 'Add Order'}</h2>
      <div className='contenedor-crear'>
        <form onSubmit={onSubmit}>
          <div>
            <label>
              Order #
              <input
                className='input-text'
                type="text"
                placeholder='Order Number'
                {...register('orderNumber', { required: true })}
              />
              {errors.orderNumber && <p className='text-error'>*Order Number is required</p>}
            </label>
          </div>
          <div>
            <label>
              Date
              <input
                className='input-text'
                type="date"
                disabled
                {...register('date')}
              />
            </label>
          </div>
          <div>
            <label>
              # Products
              <input
                className='input-text'
                type="number"
                disabled
                {...register('numberOfProducts')}
              />
            </label>
          </div>
          <div>
            <label>
              Final Price
              <input
                className='input-text'
                type="number"
                step="0.01"
                disabled
                {...register('finalPrice')}
              />
            </label>
          </div>
          <div>
            <button type="button" className="btn-agregar" onClick={handleAddProduct}>
              Add Product
            </button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Unit Price</th>
                  <th>Qty</th>
                  <th>Total Price</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {orderProducts.map((orderProduct, index) => (
                  <tr key={index}>
                    <td>{orderProduct.product.id}</td>
                    <td>{orderProduct.product.name}</td>
                    <td>{orderProduct.product.unitPrice}</td>
                    <td>{orderProduct.quantity}</td>
                    <td>{orderProduct.totalPrice}</td>
                    <td>
                      <button type="button" onClick={() => handleProductEdit(index)}>
                        Edit
                      </button>
                      <button type="button" onClick={() => handleProductRemove(index)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
          <label>
            Status
            <select className='input-select'
                name="Status"
                {...register('status')}
                >
                <option value='' >Select Status</option>
                <option value='PENDING' >Pending</option>
                <option value='IN_PROGRESS' >In Progress</option>
                <option value='COMPLETED' >Completed</option>
            </select>
            {errors.status && <p className='text-error'>*Status is required</p>}
          </label>
          </div>
          <div className='contenedor-btn'>
            <button className='btn-cancelar' type='button' onClick={handleCancel}>Cancel</button>
            <button className='btn-registrar' type='submit'>Save</button>
          </div>
        </form>
      </div>
      <Modal active={activeProductModal} toggle={() => setActiveProductModal(!activeProductModal)}>
        <div>
          <h3>Select Product</h3>
          <select onChange={(e) => handleProductSelect(products.find(p => p.id === parseInt(e.target.value)))}>
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <label>
            Quantity
            <input
              type="number"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
            />
          </label>
          <button type="button" onClick={handleProductSave}>Save</button>
        </div>
      </Modal>
    </div>
  );
}

export { FormAddEditOrder};