import useAxios from "../Utils/useAxios";

const ProductApi = useAxios('api/products');

export const getProduct = (productId) => {
    return ProductApi.get(`${productId}`);
}

export const getAllProducts = async () => {
    const response = await ProductApi.get(``);
    return response.data;
}

export const createProduct = (product) => {
    return ProductApi.post('/create', product);
}

export const updateProduct = (id, product) => {
    return ProductApi.put(`/update/${id}`, product);
}

export const deleteProduct = (id) => {
    return ProductApi.delete(`/delete/${id}`);
}

export const getCountProduct = async () => {
    const res = await ProductApi.get('');
    const products = res.data;
    const length = products.length;
    return length;
}