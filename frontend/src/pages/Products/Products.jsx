import React, { useEffect, useState } from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { getAllProducts } from '../../api/Product.api';
import productColumns from '../../Utils/componentUtils/productColumns';
import  Modal  from '../../components/Modal';
import { Table } from '../../components/Table/Table';
//import { FormDeleteProduct } from './FormDeleteProduct';
import '../../styles/ContenedorComp.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products() {

  const [products, setProducts] = useState([]);   

  const [activeFormDelete, setActiveFormDelete] = useState(false);
  
  const [selectedIdProduct, setSelectedIdProduct] = useState();
  
  const handleAddEdit = (idProduct) => {
    navigate(`/products/add-edit/${idProduct}`);
  }
  const handleDelete = (idProduct) => {
    setSelectedIdProduct(idProduct);
    setActiveFormDelete(!activeFormDelete);
  };
  
  const loadProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res);
    } catch (error) {
        toast.error(`Error loading Products`);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>   
    <div className='contenedor-componente'>
      <div className='contenedor-titulo'>
        <h2>Products</h2>
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
        columns={productColumns()}
        data={products}
        nombre={'products'}
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

export default Products;