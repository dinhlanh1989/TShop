package com.greenlight.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.greenlight.dao.ProductDao;
import com.greenlight.model.Product;
import com.greenlight.service.ProductService;

public class ProductServiceImpl implements ProductService {

	@Autowired
	ProductDao productDao;

	public void addProduct(Product product)
			throws Exception {
		productDao.saveObject(product);
	}

	public Product getProductById(long id) throws Exception {
		return productDao.getObject(id);
	}

	public List<Product> getProductList() throws Exception {
		return productDao.getObjects();
	}

	public void deleteProduct(long id) throws Exception {
		productDao.removeObject(Product.class, id);
	}

}