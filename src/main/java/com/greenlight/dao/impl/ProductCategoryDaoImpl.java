package com.greenlight.dao.impl;

import java.io.Serializable;
import java.util.List;


import com.greenlight.dao.ProductCategoryDao;
import com.greenlight.model.ProductCategory;

public class ProductCategoryDaoImpl extends BaseDaoImpl<ProductCategory> implements ProductCategoryDao {

	public ProductCategory getObject(Serializable id) {
		return super.getObject(ProductCategory.class, id);
	}

	public List<ProductCategory> getObjects() {
		return super.getObjects(ProductCategory.class);
	}

}