package com.fractal.backend.mapper;

import com.fractal.backend.dto.OrderDto;
import com.fractal.backend.entity.Order;

import java.util.stream.Collectors;

public class OrderMapper {
    public static OrderDto mapToOrderDto(Order order) {
        return new OrderDto(
                order.getId(),
                order.getOrderNumber(),
                order.getDate(),
                order.getNumberOfProducts(),
                order.getFinalPrice(),
                order.getStatus(),
                order.getOrderProducts().stream()
                        .map(OrderProductMapper::mapToOrderProductDto)
                        .collect(Collectors.toList())
        );
    }

    public static Order mapToOrder(OrderDto orderDto) {
        return new Order(
                orderDto.getId(),
                orderDto.getOrderNumber(),
                orderDto.getDate(),
                orderDto.getNumberOfProducts(),
                orderDto.getFinalPrice(),
                orderDto.getStatus(),
                orderDto.getOrderProducts().stream()
                        .map(OrderProductMapper::mapToOrderProduct)
                        .collect(Collectors.toList())
        );
    }
}
