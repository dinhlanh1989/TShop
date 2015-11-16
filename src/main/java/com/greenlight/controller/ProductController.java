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

import com.greenlight.model.Product;
import com.greenlight.model.*;
import com.greenlight.service.ProductService;

@Controller
@RequestMapping("/Product")
public class ProductController {

	@Autowired
	ProductService productService;

	static final Logger logger = Logger.getLogger(ProductController.class);

	/* Submit form in Spring Restful Services */
	@RequestMapping(value = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Status addProduct(@RequestBody Product product) {
		try {
			productService.addProduct(product);
			return new Status(1, "Product added Successfully !");
		} catch (Exception e) {
			// e.printStackTrace();
			return new Status(0, e.toString());
		}

	}

	/* Ger a single objct in Json form in Spring Rest Services */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody Product getProduct(@PathVariable("id") long id) {
		Product product = null;
		try {
			product = productService.getProductById(id);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return product;
	}

	/* Getting List of objects in Json format in Spring Restful Services */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody List<Product> getProduct() {

		List<Product> productList = null;
		try {
			productList = productService.getProductList();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return productList;
	}

	/* Delete an object from DB in Spring Restful Services */
	@RequestMapping(value = "delete/{id}", method = RequestMethod.GET)
	public @ResponseBody Status deleteProduct(@PathVariable("id") long id) {

		try {
			productService.deleteProduct(id);
			return new Status(1, "Product deleted Successfully !");
		} catch (Exception e) {
			return new Status(0, e.toString());
		}

	}
}
