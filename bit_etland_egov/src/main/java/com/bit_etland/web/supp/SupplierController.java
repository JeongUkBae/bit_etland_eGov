package com.bit_etland.web.supp;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SupplierController {
	private static final Logger logger = LoggerFactory.getLogger(SupplierController.class);
	
	@Autowired Map<String, Object> map;
	
	@GetMapping("")
	public Map<?,?> list(
			@RequestBody Supplier param){
		
		return map;
	}


}
