package com.greenlight.model;

import java.util.Date;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@Entity
@Table(name="users")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class User  implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "username")
	private String username;
	
	@Column(name = "password", unique = true, nullable = false)
	private String password;	
	
	@Column(name = "email", unique = true, nullable = false)
	private String email;
	
	@Column(name = "user_group")
	private String userGroup;
	
	@Column(name = "first_name", unique = true, nullable = false)
	private String firstName;
	
	@Column(name = "last_name", unique = true, nullable = false)
	private String lastName;
	
	@Column(name = "last_login", unique = true, nullable = false)
	private Date lastLogin;	
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinTable(name="user_roles",
		joinColumns = {@JoinColumn(name="username", referencedColumnName="username")},
		inverseJoinColumns = {@JoinColumn(name="role_id", referencedColumnName="id")}
	)
	private Role role;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserGroup() {
		return userGroup;
	}

	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(Date lastLogin) {
		this.lastLogin = lastLogin;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	

}
