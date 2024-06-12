package com.fractal.backend.service;

import com.fractal.backend.dto.OrderProductDto;

public interface OrderProductService {
    OrderProductDto createOrderProduct(OrderProductDto orderProductDto);
    OrderProductDto updateOrderProduct(Long orderProductId, OrderProductDto orderProductDto);
    OrderProductDto getOrderProductById(Long orderProductId);
    void deleteOrderProduct(Long orderProductId);
}
