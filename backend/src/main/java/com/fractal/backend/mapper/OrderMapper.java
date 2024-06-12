package com.fractal.backend.mapper;

import com.fractal.backend.dto.OrderDto;
import com.fractal.backend.entity.Order;
import com.fractal.backend.entity.OrderProduct;

import java.util.ArrayList;
import java.util.List;
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
        Order order = new Order(
                orderDto.getId(),
                orderDto.getOrderNumber(),
                orderDto.getDate(),
                orderDto.getNumberOfProducts(),
                orderDto.getFinalPrice(),
                orderDto.getStatus(),
                new ArrayList<>()
        );

        List<OrderProduct> orderProducts = orderDto.getOrderProducts().stream()
                .map(dto -> {
                    OrderProduct orderProduct = OrderProductMapper.mapToOrderProduct(dto);
                    orderProduct.setOrder(order);  // Evita la recursividad
                    return orderProduct;
                })
                .collect(Collectors.toList());

        order.setOrderProducts(orderProducts);
        return order;
    }
}
