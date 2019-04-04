package com.bit_etland.web.cate;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.bit_etland.web.cmm.Proxy;

@Repository
public interface CategoryMapper {
	public void insertCategory(Category cate);
	
	public List<Category> selectAllCategorysList(Map<?,?> map);
	public List<?> selectCategorys(Proxy pxy);
	public String txCategory(String CategoryID);
	public int countCategory();
	
	public void updateCategory(Category cate);
	public Map<String, Object> selectProfile(Map<?,?> m); 
	public void deleteCategory(Category cate);


}
