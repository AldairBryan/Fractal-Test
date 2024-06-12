package com.fractal.backend.service;

import com.fractal.backend.dto.OrderDto;

import java.util.List;

public interface OrderService {
    OrderDto createOrder(OrderDto orderDto);
    OrderDto getOrderById(Long orderId);
    List<OrderDto> getAllOrders();
    OrderDto updateOrder(Long orderId,OrderDto orderDto);
    void deleteOrder(Long orderId);
}
