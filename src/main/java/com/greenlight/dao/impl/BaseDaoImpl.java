package com.greenlight.dao.impl;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.NonUniqueObjectException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.greenlight.dao.*;

/**
 * Generic DAO Interface to have generic DAO methods that could be reused.
 * @author Oussama M Billah
 *  @param <T> custom Type.
 */
@Repository
public abstract class BaseDaoImpl<T> implements BaseDao<T> {
	
	protected static final Logger LOGGER = Logger.getLogger(BaseDaoImpl.class);	
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}
	
	public void saveObject(T object) {
		getSession().save(object);
	}

	public void saveObjects(Collection<T> collection) {
		for(T object : collection) {
			try {
				this.saveObject(object);
			} catch(NonUniqueObjectException ex) {
				LOGGER.error("skipping duplicate entry from entity " + object.getClass());
			}
			
		}
	}
	
	public void updateObject(T object) {
		getSession().update(object);
	}
	
	@SuppressWarnings("unchecked")
	public T getObject(Class<T> clazz, Serializable id) {
		return (T) getSession().get(clazz, id);
	}

	@SuppressWarnings("unchecked")
	public List<T> getObjects(Class<T> clazz) {
		Criteria criteria = getSession().createCriteria(clazz);
		return criteria.list();
	}
	
	public void removeObject(Class<T> clazz, Serializable id) {
		T object = this.getObject(clazz, id);
		getSession().delete(object);
	}

	public Integer getRowCount(Class<T> clazz) {
		Criteria criteria = getSession().createCriteria(clazz);
		criteria.setProjection(Projections.rowCount());
		Integer rowCount = (Integer) criteria.uniqueResult();
		return rowCount;
	}

}
