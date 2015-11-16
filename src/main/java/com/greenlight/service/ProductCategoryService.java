package com.greenlight.service;

import java.util.List;

import com.greenlight.model.ProductCategory;

public interface ProductCategoryService {
	public void addProductCategory(ProductCategory productCategory)
			throws Exception;

	public ProductCategory getProductCategoryById(long id) throws Exception;

	public List<ProductCategory> getProductCategoryList() throws Exception;

	public void deleteProductCategory(long id) throws Exception;
}