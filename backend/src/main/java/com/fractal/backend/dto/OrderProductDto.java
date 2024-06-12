package com.fractal.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductDto {
    private Long id;
    private OrderDto order;
    private ProductDto product;
    private int quantity;
    private double totalPrice;
}
