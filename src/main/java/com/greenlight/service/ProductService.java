package com.greenlight.service;

import java.util.List;

import com.greenlight.model.Product;

public interface ProductService {
	public void addProduct(Product product)
			throws Exception;

	public Product getProductById(long id) throws Exception;

	public List<Product> getProductList() throws Exception;

	public void deleteProduct(long id) throws Exception;
}