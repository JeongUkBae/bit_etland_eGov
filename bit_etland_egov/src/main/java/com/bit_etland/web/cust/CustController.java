package com.bit_etland.web.cust;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.bit_etland.web.cmm.IConsumer;
import com.bit_etland.web.cmm.IFunction;
import com.bit_etland.web.cmm.ISupplier;
import com.bit_etland.web.cmm.PrintService;
import com.bit_etland.web.cmm.Proxy;


/**
 * Handles requests for the application home page.
 */
@RestController
public class CustController {

	private static final Logger logger = LoggerFactory.getLogger(CustController.class);

	@Autowired Customer cust;
	@Autowired PrintService ps;
	@Autowired CustomerMapper custMap;
	@Autowired Map<String, Object> map;
	@Autowired Proxy pxy;
	
	@PostMapping("/customers/{userid}")
	public Customer login(
		@PathVariable String userid,
		@RequestBody Customer param) {
		logger.info("======= cust login 진입 =======");
		IFunction i = (Object o) -> custMap.selectCustomer(param);
		
		return (Customer) i.apply(param);
	}
	

	@GetMapping("/customers/page/{num}")
	public Map<?,?> list(
			@PathVariable String num) {
		logger.info("======= list 진입 ======");
		map.clear();
		map.put("page_num", "1");
		map.put("page_size", "5");
		map.put("block_Size", "5");
		map.put("total_count", "10");
		pxy.carryOut(map);
		IFunction i = (Object o) -> custMap.selectCustomers(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("ls", ls);
		map.put("pxy", pxy);
				  
		return map;
	}

	
	@PostMapping("/customers")
	public Map<String, Object> join(
			@RequestBody Customer param) {
		logger.info("======= cust join  진입 =======");
		ps.accept(param.toString());
		IConsumer i = (Object o)->custMap.insertCustomer(param);
		i.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}

	@PutMapping("/customers/{userid}")
	public Map<String, Object> update(
			@PathVariable String userid,
			@RequestBody Customer param) {
		logger.info("======= cust update 진입 =======");
		IConsumer i = (Object o)->custMap.updateCustomer(param);
		i.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}

	@DeleteMapping("/customers/{userid}")
	public Map<String, Object> delete(
			@PathVariable String userid,
			@RequestBody Customer param) {
		logger.info("======= cust delete 진입 =======");
		IConsumer i = (Object o)->custMap.deleteCustomer(param);
		i.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}
	
	
}