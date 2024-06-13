import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getProduct, createProduct, updateProduct } from '../../api/Product.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function FormAddEditProduct() {
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
          navigate('/products');
          toast.success('Successfully created product');
        } else {
          data.orderProducts = [];
          await createProduct(data);
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
        toast.error('Error fetching product:', error);
      }
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  const styles = {
    flexContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    flexItem: {
      flex: '1',
      margin: '0 5px',
    },
  };
  
  return (
    <div className='contenedor-componente'>
      <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
        <div className='contenedor-crear'>
          <form onSubmit={onSubmit}>
            <div style={styles.flexContainer}>
              <div style={styles.flexItem}>
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
              </div>
            </div>
            <div style={styles.flexContainer}>
              <div style={styles.flexItem}>
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
              </div>
            </div>
            <div className='contenedor-btn'>
              <button className='btn-cancelar' type='button' onClick={() => handleCancel()}>Cancel</button>
              <button className='btn-registrar' type='submit'>Finish</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export { FormAddEditProduct };