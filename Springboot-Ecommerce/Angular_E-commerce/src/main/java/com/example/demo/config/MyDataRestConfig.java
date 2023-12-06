package com.example.demo.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductCategory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{
	
	private EntityManager entityManager;
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManger) {
		entityManager=theEntityManger;
	}
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
		HttpMethod[] theUnsupportedAction = {HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};
		config.getExposureConfiguration()
		.forDomainType(Product.class) 
		.withItemExposure((metadata,httpMethods)->httpMethods.disable(theUnsupportedAction))
		.withCollectionExposure((metadata,httpMethods)->httpMethods.disable(theUnsupportedAction));
		
		config.getExposureConfiguration()
		.forDomainType(ProductCategory.class) 
		.withItemExposure((metadata,httpMethods)->httpMethods.disable(theUnsupportedAction))
		.withCollectionExposure((metadata,httpMethods)->httpMethods.disable(theUnsupportedAction));
		
		exposeIds(config);
	}
	private void exposeIds(RepositoryRestConfiguration config) {
		Set<EntityType<?>> entities=entityManager.getMetamodel().getEntities();
		List<Class> entityClasses=new ArrayList<>();
		for(EntityType tempEntityType:entities) {
			entityClasses.add(tempEntityType.getJavaType());
		}
		
		Class[] domainTypes=entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
	}
	
}
