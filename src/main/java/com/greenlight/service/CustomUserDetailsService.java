package com.greenlight.service;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface CustomUserDetailsService extends UserDetailsService {

	public Collection<? extends GrantedAuthority> getAuthorities(Integer role);
	public List<String> getRoles(Integer role);
	public List<GrantedAuthority> getGrantedAuthorities(List<String> roles);
	

}
