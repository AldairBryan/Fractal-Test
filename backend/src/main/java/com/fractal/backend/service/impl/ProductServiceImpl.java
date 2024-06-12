package com.fractal.backend.service.impl;

import com.fractal.backend.dto.ProductDto;
import com.fractal.backend.entity.Product;
import com.fractal.backend.exception.ResourceNotFoundException;
import com.fractal.backend.mapper.ProductMapper;
import com.fractal.backend.repository.ProductRepository;
import com.fractal.backend.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

    @Service
    @AllArgsConstructor
    public class ProductServiceImpl implements ProductService {
        private final ProductRepository productRepository;
        @Override
        public ProductDto createProduct(ProductDto productDto) {
            Product product = ProductMapper.mapToProduct(productDto);
            Product savedProduct = productRepository.save(product);
            return ProductMapper.mapToProductDto(savedProduct);
        }

        @Override
        public ProductDto getProductById(long id) {
            Product product = productRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with id: " + id));
            return ProductMapper.mapToProductDto(product);
        }

        @Override
        public List<ProductDto> getAllProducts() {
            List<Product> products = productRepository.findAll();
            return products.stream().map(ProductMapper::mapToProductDto)
                    .collect(Collectors.toList());
        }

        @Override
        public ProductDto updateProduct(Long productId,ProductDto updatedProduct) {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with id: " + productId));
            product.setName(updatedProduct.getName());
            product.setUnitPrice(updatedProduct.getUnitPrice());
            Product updated = productRepository.save(product);
            return ProductMapper.mapToProductDto(updated);
        }

        @Override
        public void deleteProduct(long id) {
            Product product = productRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with id: " + id));
            productRepository.deleteById(id);
        }
    }
