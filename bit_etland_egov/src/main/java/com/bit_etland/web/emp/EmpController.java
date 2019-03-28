package com.bit_etland.web.emp;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bit_etland.web.cmm.IConsumer;
import com.bit_etland.web.cmm.IFunction;
import com.bit_etland.web.cmm.PrintService;
import com.bit_etland.web.cmm.Users;


@RestController
public class EmpController {
	private static final Logger logger = LoggerFactory.getLogger(EmpController.class);


	@Autowired Employee emp;
	@Autowired PrintService ps;
	@Autowired EmployeeMapper empMap;
	@Autowired Users<?> user;
	@Autowired Map<String, Object> map;
	@PostMapping("/employees/{employee}")
	public Employee login(
		@PathVariable String userid,
		@RequestBody Employee param) {
		logger.info("======= emp login 진입 =======");
		IFunction i = (Object o) -> empMap.selectEmployee(param);
		
		return (Employee) i.apply(param);
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("/{user}/list")
	public List<Users<?>> list(
			@PathVariable String user,
			@RequestBody Employee param) {
		
			logger.info("======= login 진입 =======");
			IFunction i = (Object o) -> empMap.selectEmployee(param);
			List<Users<?>> ls= (List<Users<?>>) i.apply(param);
			ps.accept(ls);
			return ls;
		}
		
	@PostMapping("/employees")
	public Map<?, ?> join(
			@PathVariable String user,
			@RequestBody Employee param) {
		logger.info("======= emp join  진입 =======");
		ps.accept(param.toString());
		IConsumer i = (Object o)->empMap.insertEmployee(param);
		i.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}

	@PutMapping("/emp/{userid}")
	public  Map<?, ?> update(
			@PathVariable String user,
			@PathVariable String userid,
			@RequestBody Employee param) {
		logger.info("======= emp update 진입 =======");
		IConsumer i = (Object o)->empMap.updateEmployee(param);
		i.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}
	
	@DeleteMapping("/emp/{userid}")
	public  Map<?, ?> delete(
			@PathVariable String user,
			@PathVariable String userid,
			@RequestBody Employee param) {
		logger.info("======= emp delete 진입 =======");
		IConsumer i = (Object o)->empMap.deleteEmployee(param);
		i.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}
	
	
	
}
