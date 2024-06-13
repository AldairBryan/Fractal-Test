import useAxios from "../Utils/useAxios";

const OrderApi = useAxios('api/orders');

export const getOrder = (orderId) => {
    return OrderApi.get(`${orderId}`);
}

export const getAllOrders = async () => {
    const response = await OrderApi.get(``);
    return response.data;
}

export const createOrder = (order) => {
    return OrderApi.post('/create', order);
}

export const updateOrder = (id, order) => {
    return OrderApi.put(`/update/${id}`, order);
}

export const deleteOrder = (id) => {
    return OrderApi.delete(`/delete/${id}`);
}

export const getCountOrder = async () => {
    const res = await OrderApi.get('');
    const orders = res.data;
    const length = orders.length;
    return length;
}