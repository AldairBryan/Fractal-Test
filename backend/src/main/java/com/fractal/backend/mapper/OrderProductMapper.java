package com.fractal.backend.mapper;

import com.fractal.backend.dto.OrderProductDto;
import com.fractal.backend.entity.OrderProduct;

public class OrderProductMapper {
    public static OrderProductDto mapToOrderProductDto(OrderProduct orderProduct) {
        return  new OrderProductDto(
                orderProduct.getId(),
                OrderMapper.mapToOrderDto(orderProduct.getOrder()),
                ProductMapper.mapToProductDto(orderProduct.getProduct()),
                orderProduct.getQuantity(),
                orderProduct.getTotalPrice()
        );
    }

    public static OrderProduct mapToOrderProduct(OrderProductDto orderProductDto) {
        return  new OrderProduct(
                orderProductDto.getId(),
                OrderMapper.mapToOrder(orderProductDto.getOrder()),
                ProductMapper.mapToProduct(orderProductDto.getProduct()),
                orderProductDto.getQuantity(),
                orderProductDto.getTotalPrice()
        );
    }
}
