package com.bit_etland.web.prod;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.bit_etland.web.cmm.Proxy;

@Repository
public interface ProductMapper {
	public void insertProduct(Product pro);
	
	public List<Product> selectProductsList(Map<?,?> m);
	public List<Product> selectProducts(Proxy pxy);
	public List<Product> txProducts(Proxy pxy);
	public List<Product> txProduct(Proxy pxy);
	public Product selectProduct(Product prod);
	public int countProduct();
	public int countsrchs(String a);
	public boolean existsProductID(Product pro);
	public void updateProduct(Product pro);
	public Map<String, Object> selectProfile(Map<?,?> m);
	public void deleteProduct(Product pro);
	public Map<String, Object> selectPhone(Map<?,?> m);
	
	
}
