package com.fractal.backend.mapper;

import com.fractal.backend.dto.ProductDto;
import com.fractal.backend.entity.Product;

import java.util.stream.Collectors;

public class ProductMapper {
    public static ProductDto mapToProductDto(Product product) {
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getUnitPrice(),
                product.getOrderProducts().stream()
                        .map(OrderProductMapper::mapToOrderProductDto)
                        .collect(Collectors.toList())
        );
    }

    public static Product mapToProduct(ProductDto productDto) {
        return new Product(
                productDto.getId(),
                productDto.getName(),
                productDto.getUnitPrice(),
                productDto.getOrderProducts().stream()
                        .map(OrderProductMapper::mapToOrderProduct)
                        .collect(Collectors.toList())
        );
    }
}
