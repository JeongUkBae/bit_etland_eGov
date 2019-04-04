package com.bit_etland.web.supp;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;
import com.bit_etland.web.cmm.Proxy;


@Repository
public interface SupplierMapper {
	public void insertSupplier(Supplier supp);
	
	public List<Supplier> selectAllSuppliersList(Map<?,?> map);
	public List<?> selectSuppliers(Proxy pxy);
	public String txSupplier(String supplierID);
	public int countSupplier();
	
	public void updateSupplier(Supplier supp);
	public Map<String, Object> selectProfile(Map<?,?> m); 
	public void deleteSupplier(Supplier supp);


}
