package com.fractal.backend.dto;

import com.fractal.backend.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private String orderNumber;
    private Date date;
    private int numberOfProducts;
    private double finalPrice;
    private OrderStatus status;
    private List<OrderProductDto> orderProducts;
}
