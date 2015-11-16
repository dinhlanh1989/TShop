package com.greenlight.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@Entity
@Table(name = "products")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Product implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "product_id")
	private long id;

	@Column(name = "product_name", unique = true, nullable = false)
	private String productName;

	@Column(name = "description_html", unique = false, nullable = true)
	private String descriptionHTML;

	@Column(name = "image", unique = false, nullable = true)
	private String image;

	@Column(name = "customer_review_count", nullable = true)
	private int customerReviewCount;

	@Column(name = "customer_review_average", nullable = true)
	private Float customerReviewAverage;

	@Column(name = "regular_price", nullable = true)
	private Float regularPrice;

	@Column(name = "sale_price", nullable = true)
	private Float salePrice;

	@Column(name = "in_stock", nullable = true)
	private boolean instock;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "category_id")
	private ProductCategory category;

	@Column(name = "created_by", nullable = true)
	private String createdBy;

	@Column(name = "created_date", nullable = true)
	private Date createdDate;

	@Column(name = "modified_by", nullable = true)
	private String modifiedBy;

	@Column(name = "modified_date", nullable = true)
	private Date modifiedDate;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getDescriptionHTML() {
		return descriptionHTML;
	}

	public void setDescriptionHTML(String descriptionHTML) {
		this.descriptionHTML = descriptionHTML;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public int getCustomerReviewCount() {
		return customerReviewCount;
	}

	public void setCustomerReviewCount(int customerReviewCount) {
		this.customerReviewCount = customerReviewCount;
	}

	public Float getCustomerReviewAverage() {
		return customerReviewAverage;
	}

	public void setCustomerReviewAverage(Float customerReviewAverage) {
		this.customerReviewAverage = customerReviewAverage;
	}

	public Float getRegularPrice() {
		return regularPrice;
	}

	public void setRegularPrice(Float regularPrice) {
		this.regularPrice = regularPrice;
	}

	public Float getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Float salePrice) {
		this.salePrice = salePrice;
	}

	public boolean isInstock() {
		return instock;
	}

	public void setInstock(boolean instock) {
		this.instock = instock;
	}

	public ProductCategory getCategory() {
		return category;
	}

	public void setCategory(ProductCategory category) {
		this.category = category;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

}
