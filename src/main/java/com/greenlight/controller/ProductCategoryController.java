package com.greenlight.controller;

import java.util.List;

import org.apache.log4j.Logger;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.greenlight.model.ProductCategory;
import com.greenlight.model.*;
import com.greenlight.service.ProductCategoryService;

@Controller
@RequestMapping("/ProductCategory")
public class ProductCategoryController {

	@Autowired
	ProductCategoryService productCategoryService;

	static final Logger logger = Logger.getLogger(ProductCategoryController.class);

	/* Submit form in Spring Restful Services */
	@RequestMapping(value = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Status addProductCategory(@RequestBody ProductCategory productCategory) {
		try {
			productCategoryService.addProductCategory(productCategory);
			return new Status(1, "ProductCategory added Successfully !");
		} catch (Exception e) {
			// e.printStackTrace();
			return new Status(0, e.toString());
		}

	}

	/* Ger a single objct in Json form in Spring Rest Services */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody ProductCategory getProductCategory(@PathVariable("id") long id) {
		ProductCategory productCategory = null;
		try {
			productCategory = productCategoryService.getProductCategoryById(id);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return productCategory;
	}

	/* Getting List of objects in Json format in Spring Restful Services */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody List<ProductCategory> getProductCategory() {

		List<ProductCategory> productCategoryList = null;
		try {
			productCategoryList = productCategoryService.getProductCategoryList();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return productCategoryList;
	}

	/* Delete an object from DB in Spring Restful Services */
	@RequestMapping(value = "delete/{id}", method = RequestMethod.GET)
	public @ResponseBody Status deleteProductCategory(@PathVariable("id") long id) {

		try {
			productCategoryService.deleteProductCategory(id);
			return new Status(1, "ProductCategory deleted Successfully !");
		} catch (Exception e) {
			return new Status(0, e.toString());
		}

	}
}
