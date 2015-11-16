package com.greenlight.dao;

import java.io.Serializable;
import java.util.List;

import com.greenlight.model.ProductCategory;

public interface ProductCategoryDao extends BaseDao<ProductCategory> {

	public ProductCategory getObject(Serializable id);

	public List<ProductCategory> getObjects();

}
