package com.greenlight.dao;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.hibernate.Session;


public interface BaseDao<T> {
	
	public Session getSession();
	
	public void saveObject(T object);
	
	public void saveObjects(Collection<T> collection);
	
	public void updateObject(T object);
	
	public T getObject(Class<T> clazz, Serializable id);
	
	public List<T> getObjects(Class<T> clazz);
	
	public void removeObject(Class<T> clazz, Serializable id);

	public Integer getRowCount(Class<T> clazz);
	
}
