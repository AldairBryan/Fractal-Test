import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { getOrder, createOrder, updateOrder } from '../../api/Order.api';
import { getAllProducts } from '../../api/Product.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/ContenedorComp.css';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

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
        const allProducts = await getAllProducts();
        const mappedOrderProducts = res.data.orderProducts.map(op => {
          const productDetails = allProducts.find(p => p.id === op.productId);
          return {
            ...op,
            product: productDetails || { id: op.productId },
          };
        });
        setOrderProducts(mappedOrderProducts);
        setValue('orderNumber', res.data.orderNumber);
        setValue('date', new Date(res.data.date).toISOString().substring(0, 10));
        setValue('numberOfProducts', res.data.numberOfProducts);
        setValue('finalPrice', res.data.finalPrice);
        setValue('status', res.data.status);
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
    const existingProductIndex = orderProducts.findIndex(op => op.product.id === selectedProduct.id);

    const totalPrice = parseFloat((selectedProduct.unitPrice * selectedQuantity).toFixed(2));

    if (existingProductIndex !== -1) {
      const updatedOrderProducts = [...orderProducts];
      updatedOrderProducts[existingProductIndex] = {
        ...updatedOrderProducts[existingProductIndex],
        quantity: selectedQuantity,
        totalPrice: totalPrice,
      };
      setOrderProducts(updatedOrderProducts);
    } else {
      const newOrderProduct = {
        id: null,
        product: selectedProduct,
        quantity: selectedQuantity,
        totalPrice: totalPrice,
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
        orderNumber: data.orderNumber,
        date: data.date,
        numberOfProducts: data.numberOfProducts,
        finalPrice: parseFloat(totalPrice.toFixed(2)),
        orderProducts: orderProducts.map(op => ({
          id: op.id,
          productId: op.product.id,
          quantity: op.quantity,
          totalPrice: op.totalPrice,
        })),
        status: data.status,
      };
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
    setValue('finalPrice', parseFloat(totalPrice.toFixed(2)));
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
          <div className='btn-agregar' onClick={handleAddProduct}>
            <BsFillPlusCircleFill
              color='green'
              className="icon-add"
            />
            <h3>Add Product</h3>
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
                    <td>{orderProduct.totalPrice.toFixed(2)}</td>
                    <td>
                      <span className="actions">
                        <BsFillPencilFill
                          color='green'
                          className="btn-edit"
                          onClick={() => handleProductEdit(index)}
                        />
                        <BsFillTrashFill
                          color='green'
                          className="btn-delete"
                          onClick={() => handleProductRemove(index)}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <label>
              Status
              <select className='input-select' {...register('status', { required: true })}>
                <option value=''>Select Status</option>
                <option value='PENDING'>Pending</option>
                <option value='IN_PROGRESS'>In Progress</option>
                <option value='COMPLETED'>Completed</option>
              </select>
              {errors.status && <p className='text-error'>*Status is required</p>}
            </label>
          </div>
          <div className='contenedor-btn'>
            <button className='btn-cancelar' type='button' onClick={handleCancel}>
              Cancel
            </button>
            <button className='btn-registrar' type='submit'>
              Save
            </button>
          </div>
        </form>
      </div>
      <Modal active={activeProductModal} toggle={() => setActiveProductModal(!activeProductModal)}>
        <h3>Select Product</h3>
        <select onChange={(e) => handleProductSelect(products.find(p => p.id === parseInt(e.target.value)))}>
          <option value=''>Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <label>
          Quantity
          <input
            type='number'
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
          />
        </label>
        <div className='contenedor-btn'>
          <button className='btn-registrar' type='submit' onClick={handleProductSave}>Save</button>
        </div>
      </Modal>
    </div>
  );
}

export { FormAddEditOrder };
