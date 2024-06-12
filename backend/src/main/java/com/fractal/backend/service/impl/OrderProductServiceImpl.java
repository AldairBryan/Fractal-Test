package com.fractal.backend.service.impl;

import com.fractal.backend.dto.OrderProductDto;
import com.fractal.backend.entity.OrderProduct;
import com.fractal.backend.exception.ResourceNotFoundException;
import com.fractal.backend.mapper.OrderProductMapper;
import com.fractal.backend.repository.OrderProductRepository;
import com.fractal.backend.repository.OrderRepository;
import com.fractal.backend.repository.ProductRepository;
import com.fractal.backend.service.OrderProductService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OrderProductServiceImpl implements OrderProductService {
    private final OrderProductRepository orderProductRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Override
    public OrderProductDto createOrderProduct(OrderProductDto orderProductDto) {
        OrderProduct orderProduct = OrderProductMapper.mapToOrderProduct(orderProductDto);
        orderProduct.setOrder(orderRepository.findById(orderProductDto.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order does not exist with id: " + orderProductDto.getOrderId())));
        orderProduct.setProduct(productRepository.findById(orderProductDto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with id: " + orderProductDto.getProductId())));
        OrderProduct savedOrderProduct = orderProductRepository.save(orderProduct);
        return OrderProductMapper.mapToOrderProductDto(savedOrderProduct);
    }

    @Override
    public OrderProductDto getOrderProductById(Long orderProductId) {
        OrderProduct orderProduct = orderProductRepository.findById(orderProductId)
                .orElseThrow(() -> new ResourceNotFoundException("OrderProduct does not exist with id: " + orderProductId));
        return OrderProductMapper.mapToOrderProductDto(orderProduct);
    }

    @Transactional
    @Override
    public OrderProductDto updateOrderProduct(Long orderProductId, OrderProductDto updatedOrderProductDto) {
        OrderProduct orderProduct = orderProductRepository.findById(orderProductId)
                .orElseThrow(() -> new ResourceNotFoundException("OrderProduct does not exist with id: " + orderProductId));

        orderProduct.setOrder(orderRepository.findById(updatedOrderProductDto.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order does not exist with id: " + updatedOrderProductDto.getOrderId())));
        orderProduct.setProduct(productRepository.findById(updatedOrderProductDto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with id: " + updatedOrderProductDto.getProductId())));
        orderProduct.setQuantity(updatedOrderProductDto.getQuantity());
        orderProduct.setTotalPrice(updatedOrderProductDto.getTotalPrice());

        OrderProduct updatedOrderProduct = orderProductRepository.save(orderProduct);
        return OrderProductMapper.mapToOrderProductDto(updatedOrderProduct);
    }

    @Override
    public void deleteOrderProduct(Long orderProductId) {
        OrderProduct orderProduct = orderProductRepository.findById(orderProductId)
                .orElseThrow(() -> new ResourceNotFoundException("OrderProduct does not exist with id: " + orderProductId));
        orderProductRepository.deleteById(orderProductId);
    }
}
