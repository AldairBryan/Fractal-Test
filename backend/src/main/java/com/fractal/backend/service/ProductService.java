package com.fractal.backend.service;

import com.fractal.backend.dto.ProductDto;

import java.util.List;

public interface ProductService {
    ProductDto createProduct(ProductDto productDto);
    ProductDto getProductById(long id);
    List<ProductDto> getAllProducts();
    ProductDto updateProduct(Long productId, ProductDto updatedProduct);
    void deleteProduct(long id);
}
