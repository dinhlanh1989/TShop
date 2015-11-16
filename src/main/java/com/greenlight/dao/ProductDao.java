package com.greenlight.dao;

import java.io.Serializable;
import java.util.List;

import com.greenlight.model.Product;

public interface ProductDao extends BaseDao<Product> {

	public Product getObject(Serializable id);

	public List<Product> getObjects();

}
