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

import com.example.demo.entity.Country;
import com.example.demo.entity.Customer;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductCategory;
import com.example.demo.entity.State;

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
		cors.addMapping("/**")
        .allowedOrigins("http://localhost:4200")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true)
        .maxAge(3600);
		disableHttpMethods(ProductCategory.class,config, theUnsupportedAction);
		disableHttpMethods(Product.class,config, theUnsupportedAction);
		disableHttpMethods(Country.class,config, theUnsupportedAction);
		disableHttpMethods(State.class,config, theUnsupportedAction);
//		disableHttpMethods(Customer.class,config, theUnsupportedAction);
		exposeIds(config);
	}
	private void disableHttpMethods(Class<?> theClass,RepositoryRestConfiguration config, HttpMethod[] theUnsupportedAction) {
		config.getExposureConfiguration()
		.forDomainType(theClass)
		.withItemExposure((metadata,httpMethods)->httpMethods.disable(theUnsupportedAction))
		.withCollectionExposure((metadata,httpMehtods)->httpMehtods.disable(theUnsupportedAction));
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