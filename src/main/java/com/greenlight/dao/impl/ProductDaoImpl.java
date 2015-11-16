package com.greenlight.dao.impl;

import java.io.Serializable;
import java.util.List;


import com.greenlight.dao.ProductDao;
import com.greenlight.model.Product;

public class ProductDaoImpl extends BaseDaoImpl<Product> implements ProductDao {

	public Product getObject(Serializable id) {
		return super.getObject(Product.class, id);
	}

	public List<Product> getObjects() {
		return super.getObjects(Product.class);
	}

}