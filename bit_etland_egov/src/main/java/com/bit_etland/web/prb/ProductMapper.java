package com.bit_etland.web.prb;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface ProductMapper {
	public void insertProduct(Product pro);
	
	public List<Product> selectProductsList(Map<?,?> m);
	public List<Product> selectProducts(Map<?,?> m);
	public Product selectProduct(Product pro);
	public int countProduct(Map<?,?> m);
	public boolean existsProductID(Product pro);
	public void updateProduct(Product pro);
	public Map<String, Object> selectProfile(Map<?,?> m);
	public void deleteProduct(Product pro);
	public Map<String, Object> selectPhone(Map<?,?> m);
}
