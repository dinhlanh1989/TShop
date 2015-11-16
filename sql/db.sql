/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;  
/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;

-- Dumping database structure for employee_db 
CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS product_category;
-- Dumping structure for table employee_db.employee  
CREATE TABLE IF NOT EXISTS employee (  
  id bigint(20) NOT NULL AUTO_INCREMENT,  
  first_name varchar(45) DEFAULT NULL,  
  last_name varchar(45) DEFAULT NULL,  
  email varchar(45) DEFAULT NULL,  
  phone varchar(45) DEFAULT NULL,  
  PRIMARY KEY (id)  
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;  

CREATE TABLE IF NOT EXISTS product_category (  
  category_id bigint(20) NOT NULL AUTO_INCREMENT,  
  category_name varchar(45) DEFAULT NULL,  
  parent_category bigint(20) DEFAULT NULL,  
  PRIMARY KEY (category_id)  
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;  
  

CREATE TABLE IF NOT EXISTS product (
  product_id bigint(50) NOT NULL AUTO_INCREMENT,
  product_name varchar(200) NOT NULL,
  description_html varchar(5000) NOT NULL,
  image varchar(200) NOT NULL,
  customer_review_count int(11) NOT NULL,
  customer_review_average double NOT NULL,
  regular_price double NOT NULL,
  sale_price double NOT NULL,
  in_stock tinyint(1) NOT NULL,
  category_id varchar(50) DEFAULT NULL,
  created_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(100) DEFAULT NULL,
  modified_date timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  modified_by varchar(200) DEFAULT NULL,
  PRIMARY KEY (product_id),
  KEY category_id (category_id)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;
  
  
  
delete from employee;
-- Dumping data for table employee_db.employee: ~1 rows (approximately)  
/*!40000 ALTER TABLE employee DISABLE KEYS */;  
INSERT INTO employee (id, first_name, last_name, email, phone) VALUES  
 (3, 'Hoston', 'lindey', 'hl@gmail.com', '90908989899');  
/*!40000 ALTER TABLE employee ENABLE KEYS */;  
/*!40014 SET FOREIGN_KEY_CHECKS=1 */;  
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

delete from product_category;

INSERT INTO product_category (category_id, category_name, parent_category) VALUES  
 (1, 'Product 1', NULL);  
 INSERT INTO product_category (category_id, category_name, parent_category) VALUES  
 (2, 'Product 2', 1); 
  
  
  
  delete from product;
  INSERT INTO `product`(`product_id`, `product_name`, `description_html`, `image`, `customer_review_count`, `customer_review_average`, `regular_price`, `sale_price`, `in_stock`, `category_id`, `created_date`, `created_by`, `modified_date`, `modified_by`) VALUES (1,'Product 01', 'This is product 1','image1',0,0,1.5,1.5,1,2,'2012-12-30 19:28:25','abcdef', '2012-12-30 19:28:25', NULL),(2,'Product 02', 'This is product 2','image1',0,0,1.5,1.5,1,2, '2012-12-30 19:28:25','abcdef','2012-12-30 19:28:25', NULL)

  
  
  
  
  
  
  