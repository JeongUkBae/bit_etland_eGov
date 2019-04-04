package com.bit_etland.web.cmm;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bit_etland.web.prod.Product;
import com.bit_etland.web.prod.ProductMapper;

@RestController
@Transactional
public class TxCotroller {
	private static final Logger logger = LoggerFactory.getLogger(TxCotroller.class);
	@Autowired Map<String, Object> map;
	@Autowired PrintService ps;
	@Autowired Product prod;
	@Autowired ProductMapper prodMap;
	
	@GetMapping("/prodsrch/{srch}")
	public Map<?,?> srch(
			@RequestBody Product prod,
			@PathVariable String srch){
		ps.accept(srch.toString());
		/*IFunction f = (Object o) -> */
		
		logger.info("======= txController srch진입 =======");
		return map;
	}
}
