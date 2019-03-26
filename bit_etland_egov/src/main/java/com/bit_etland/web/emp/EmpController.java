package com.bit_etland.web.emp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


import com.bit_etland.web.cust.Customer;

@RestController
public class EmpController {
	private static final Logger logger = LoggerFactory.getLogger(EmpController.class);

	
	@Autowired Customer cust;
	
	@PostMapping("/emp/login")
	public String login(@ModelAttribute Customer param) {
		logger.info("======= root 진입 =======");
		return "index";
	}
}
