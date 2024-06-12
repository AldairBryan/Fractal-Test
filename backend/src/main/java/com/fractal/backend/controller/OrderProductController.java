package com.fractal.backend.controller;

import com.fractal.backend.dto.OrderProductDto;
import com.fractal.backend.service.OrderProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/order-product")
@CrossOrigin
public class OrderProductController {
    @Autowired
    private OrderProductService orderProductService;

    @PostMapping("/create")
    public ResponseEntity<OrderProductDto> createOrderProduct(@RequestBody OrderProductDto orderProductDto) {
        OrderProductDto createdOrderProduct = orderProductService.createOrderProduct(orderProductDto);
        return new ResponseEntity<>(createdOrderProduct, HttpStatus.CREATED);
    }

    @GetMapping("/{orderProductId}")
    public ResponseEntity<OrderProductDto> getOrderProductById(@PathVariable("orderProductId") Long orderProductId) {
        OrderProductDto orderProductDto = orderProductService.getOrderProductById(orderProductId);
        return ResponseEntity.ok(orderProductDto);
    }

    @PutMapping("/update/{orderProductId}")
    public ResponseEntity<OrderProductDto> updateOrderProduct(@PathVariable("orderProductId") Long orderProductId,
                                                              @RequestBody OrderProductDto updatedOrderProductDto) {
        OrderProductDto updatedOrderProduct = orderProductService.updateOrderProduct(orderProductId, updatedOrderProductDto);
        return ResponseEntity.ok(updatedOrderProduct);
    }

    @DeleteMapping("/delete/{orderProductId}")
    public ResponseEntity<String> deleteOrderProduct(@PathVariable("orderProductId") Long orderProductId) {
        orderProductService.deleteOrderProduct(orderProductId);
        return ResponseEntity.ok("Order product deleted successfully");
    }
}
