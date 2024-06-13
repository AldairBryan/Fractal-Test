package com.fractal.backend.service.impl;

import com.fractal.backend.dto.OrderDto;
import com.fractal.backend.dto.OrderProductDto;
import com.fractal.backend.entity.Order;
import com.fractal.backend.entity.OrderProduct;
import com.fractal.backend.entity.Product;
import com.fractal.backend.exception.ResourceNotFoundException;
import com.fractal.backend.mapper.OrderMapper;
import com.fractal.backend.mapper.OrderProductMapper;
import com.fractal.backend.repository.OrderProductRepository;
import com.fractal.backend.repository.OrderRepository;
import com.fractal.backend.repository.ProductRepository;
import com.fractal.backend.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderProductRepository orderProductRepository;
    private final ProductRepository productRepository;

    @Override
    public OrderDto createOrder(OrderDto orderDto) {
        Order order = OrderMapper.mapToOrder(orderDto);
        Order savedOrder = orderRepository.save(order);
        for (OrderProduct op : savedOrder.getOrderProducts()) {
            op.setOrder(savedOrder);
            orderProductRepository.save(op);
        }
        return OrderMapper.mapToOrderDto(savedOrder);
    }

    @Override
    public OrderDto getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order is not exists with id: "+ orderId));
        return OrderMapper.mapToOrderDto(order);
    }

    @Override
    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map(OrderMapper::mapToOrderDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderDto updateOrder(Long orderId, OrderDto updatedOrder) {
        // Obtener la orden existente por su ID
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order does not exist with id: " + orderId));

        // Actualizar los campos de la orden con los datos proporcionados en updatedOrder
        order.setOrderNumber(updatedOrder.getOrderNumber());
        order.setDate(updatedOrder.getDate());
        order.setNumberOfProducts(updatedOrder.getNumberOfProducts());
        order.setFinalPrice(updatedOrder.getFinalPrice());
        order.setStatus(updatedOrder.getStatus());

        // Mapear y configurar los nuevos OrderProduct para la orden actualizada
        List<OrderProduct> updatedOrderProducts = updatedOrder.getOrderProducts().stream()
                .map(OrderProductMapper::mapToOrderProduct)
                .collect(Collectors.toList());

        // Eliminar los OrderProduct existentes asociados a esta orden
        orderProductRepository.deleteByOrderId(orderId);

        // Asignar la orden actualizada a los nuevos OrderProduct y guardarlos
        updatedOrderProducts.forEach(orderProduct -> orderProduct.setOrder(order));
        order.setOrderProducts(updatedOrderProducts);

        // Guardar la orden actualizada
        Order updated = orderRepository.save(order);

        // Mapear y devolver la orden actualizada como un OrderDto
        return OrderMapper.mapToOrderDto(updated);
    }

    @Override
    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order is not exists with id: "+ orderId));
        orderRepository.deleteById(orderId);
    }
}
