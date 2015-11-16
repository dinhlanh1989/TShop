package com.greenlight.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@Entity
@Table(name = "product_category")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class ProductCategory implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "category_id")
	private long id;

	@Column(name = "category_name", unique = true, nullable = false)
	private String categoryName;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "parent_category")
	ProductCategory parentCategory;

	@OneToMany(mappedBy = "parentCategory")
	List<ProductCategory> subCategories;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public ProductCategory getParentCategory() {
		return parentCategory;
	}

	// JsonIgnore
	public void setParentCategory(ProductCategory parentCategory) {
		this.parentCategory = parentCategory;
	}

	@JsonIgnore
	public List<ProductCategory> getSubCategories() {
		return subCategories;
	}

	public void setSubCategories(List<ProductCategory> subCategories) {
		this.subCategories = subCategories;
	}

}
