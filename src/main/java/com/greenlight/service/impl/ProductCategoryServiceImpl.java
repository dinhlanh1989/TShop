package com.greenlight.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.greenlight.dao.ProductCategoryDao;
import com.greenlight.model.ProductCategory;
import com.greenlight.service.ProductCategoryService;

public class ProductCategoryServiceImpl implements ProductCategoryService {

	@Autowired
	ProductCategoryDao productCategoryDao;

	public void addProductCategory(ProductCategory productCategory)
			throws Exception {
		productCategoryDao.saveObject(productCategory);
	}

	public ProductCategory getProductCategoryById(long id) throws Exception {
		return productCategoryDao.getObject(id);
	}

	public List<ProductCategory> getProductCategoryList() throws Exception {
		return productCategoryDao.getObjects();
	}

	public void deleteProductCategory(long id) throws Exception {
		productCategoryDao.removeObject(ProductCategory.class, id);
	}

}