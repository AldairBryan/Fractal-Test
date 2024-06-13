import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getProduct, createProduct, updateProduct } from '../../api/Product.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function FormAddEditProduct({loadProducts}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [product, setProduct] = useState([]);
  const {
    register,
    handleSubmit,  
    setValue,
    formState: { errors },
  } = useForm();
  
  const validateMaxSize = (value) => {
    return value.length <= 255;
  };

  const handleCancel = () => {
    navigate('/products');
  };

  const onSubmit = handleSubmit(async data => {
    try {
        if(isEditing){
          await updateProduct(product.id, data);
          loadProducts;
          toast.success('Successfully created product');
          navigate('/products');
        } else {
          data.orderProducts = [];
          await createProduct(data);
          loadProducts;
          toast.success('Error while editing the product');
          navigate('/products');
        }
    } catch (error) {
      toast.error(`Error while creating / editing the product`);
    }
  });

  const loadOrder = async () => {
    if (isEditing) {
      try {
        const res = await getProduct(id);
        setProduct(res.data);
        setValue('name',res.data.name);
        setValue('unitPrice',res.data.unitPrice);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  return (
    <>
    <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
    <form onSubmit={onSubmit}>
      <label>
        Name Of The Product
        <input
          className='input-text'
          type="text"
          placeholder='Name of the Product'
          {...register('name', { required: true,
            validate: (value) => validateMaxSize(value),
          })}
        />
        {errors.name?.type === 'required' && <p className='text-error'>*The name field is required</p>}
        {errors.name?.type === 'validate' && <p className='text-error'>*The name field must not exceed 5 characters</p>}    
      </label>
      <label>
        Unit Price
        <input
          className='input-text'
          type="number"
          step="0.01"
          min="0"
          placeholder='Unit Price'
          {...register('unitPrice', { required: true})}
        />
        {errors.unitPrice?.type === 'required' && <p className='text-error'>*The name Unit Price is required</p>}
      </label>
      <div className='contenedor-btn'>
        <button className='btn-cancelar' type='button' onClick={() => handleCancel()}>Cancel</button>
        <button className='btn-registrar' type='submit'>Finish</button>
      </div>
    </form>
    </>
  )
}

export { FormAddEditProduct };