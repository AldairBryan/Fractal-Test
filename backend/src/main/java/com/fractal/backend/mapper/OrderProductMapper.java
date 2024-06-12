package com.fractal.backend.mapper;

import com.fractal.backend.dto.OrderProductDto;
import com.fractal.backend.entity.Order;
import com.fractal.backend.entity.OrderProduct;
import com.fractal.backend.entity.Product;

public class OrderProductMapper {
    public static OrderProductDto mapToOrderProductDto(OrderProduct orderProduct) {
        return  new OrderProductDto(
                orderProduct.getId(),
                orderProduct.getOrder().getId(),
                orderProduct.getProduct().getId(),
                orderProduct.getQuantity(),
                orderProduct.getTotalPrice()
        );
    }

    public static OrderProduct mapToOrderProduct(OrderProductDto orderProductDto) {
        Order order = new Order();
        order.setId(orderProductDto.getOrderId());

        Product product = new Product();
        product.setId(orderProductDto.getProductId());

        return new OrderProduct(
                orderProductDto.getId(),
                order,
                product,
                orderProductDto.getQuantity(),
                orderProductDto.getTotalPrice()
        );
    }
}
