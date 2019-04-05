package com.bit_etland.web.prod;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bit_etland.web.cate.Category;
import com.bit_etland.web.cate.CategoryMapper;
import com.bit_etland.web.cmm.IConsumer;
import com.bit_etland.web.cmm.IFunction;
import com.bit_etland.web.cmm.ISupplier;
import com.bit_etland.web.cmm.Image;
import com.bit_etland.web.cmm.PrintService;
import com.bit_etland.web.cmm.Proxy;
import com.bit_etland.web.supp.Supplier;
import com.bit_etland.web.supp.SupplierMapper;


@RestController
public class ProdController {
	
	private static final Logger logger = LoggerFactory.getLogger(ProdController.class);
	
	@Autowired Product prod;
	@Autowired PrintService ps;
	@Autowired ProductMapper prdMap;
	@Autowired Map<String, Object> map;
	@Autowired Proxy pxy;
	@Autowired CategoryMapper cateMap;
	@Autowired SupplierMapper suppMap;
	@Autowired Category cate;
	@Autowired Supplier supp;
	@Autowired Image img;
	
	@Resource(name = "uploadPath")private String uploadPath;
	
	
	@PostMapping("/phones/files")
	public Map<?,?> fileUpload(@RequestBody MultipartFile file )throws Exception{
		ps.accept("넘어온 파일명: "+file.getName());
		ps.accept("파일 저장경로"+uploadPath);
		return map;
		
	}
	
	
	@SuppressWarnings("unchecked")
	@GetMapping("/phones/{page}")
	public Map<?,?> list(
			@PathVariable String page) {
		logger.info("======= list 진입 ======");
		map.clear();
		map.put("page_num", page);
		map.put("page_size", "5");
		ISupplier sup = () -> prdMap.countProduct();
		map.put("block_size", "5");
		ps.accept("총 카운터는?"+sup.get());
		ps.accept("시작값: "+pxy.getStartRow());
		ps.accept("마지막값: "+pxy.getEndRow());
		map.put("total_count", sup.get());
		pxy.carryOut(map);
		IFunction i = (Object o) -> prdMap.selectProducts(pxy);
		List<Product> ls = (List<Product>) i.apply(pxy);
		ps.accept("ps??::"+ls);
		map.clear();
		map.put("ls", ls);
		map.put("pxy", pxy);
		return map;
	}
	@SuppressWarnings("unchecked")
	@GetMapping("/phones/{srchword}/{page}")
	public Map<?,?> srchList(
			@PathVariable String srchword,
			@PathVariable String page) {
		logger.info("======= srch list 진입 ======");
		map.clear();
		map.put("page_num", page);
		map.put("page_size", "5");
		String word = "%"+srchword+"%"; 
		map.put("searchWord", word );
		IFunction sup = (o) -> prdMap.countsrchs((String) o);
		map.put("block_size", "5");
		ps.accept("총 카운터는?"+sup.apply(word));
		ps.accept("시작값: "+pxy.getStartRow());
		ps.accept("마지막값: "+pxy.getEndRow());
		map.put("total_count", sup.apply(word));
		pxy.carryOut(map);
		ps.accept(page.toString());
		ps.accept(srchword.toString());
		IFunction f = (Object o) -> prdMap.txProducts((Proxy) o);
		ps.accept("과연?:::::"+pxy.getSearchWord());
		List<Product> ls = (List<Product>) f.apply(pxy);
		ps.accept("이건과연??:::"+ls.toString());
		map.clear();
		map.put("ls", ls);
		ps.accept("이제제발!!:::"+ls);
		map.put("pxy", pxy);
		return map;
	}
	//'/phones/'+x.srchword+'/grid/'+x.page
	@SuppressWarnings("unchecked")
	@GetMapping("/phones/{srchword}/grid/{page}")
	public Map<?,?> grid(
			@PathVariable String srchword,
			@PathVariable String page) {
		logger.info("======= 프로덕트 grid 진입 ======");
		map.clear();
		map.put("page_num", page);
		map.put("page_size", "9");
		String word = "%"+srchword+"%"; 
		map.put("searchWord", word );
		IFunction sup = (o) -> prdMap.countsrchs((String) o);
		map.put("block_size", "5");
		ps.accept("총 카운터는?"+sup.apply(word));
		ps.accept("시작값: "+pxy.getStartRow());
		ps.accept("마지막값: "+pxy.getEndRow());
		map.put("total_count", sup.apply(word));
		pxy.carryOut(map);
		ps.accept(page.toString());
		ps.accept(srchword.toString());
		IFunction f = (Object o) -> prdMap.txProducts((Proxy) o);
		ps.accept("과연?:::::"+pxy.getSearchWord());
		List<Product> ls = (List<Product>) f.apply(pxy);
		ps.accept("이건과연??:::"+ls.toString());
		map.clear();
		map.put("ls", ls);
		ps.accept("이제제발!!:::"+ls);
		map.put("pxy", pxy);
		return map;
	}
	
	@PostMapping("/phones")
	public Product login(
		@PathVariable String userid,
		@RequestBody Product param) {
		logger.info("======= cust login 진입 =======");
		IFunction i = (Object o) -> prdMap.selectProduct(param);
		
		return (Product) i.apply(param);
	}
	

	@Transactional
	@PostMapping("/products")
	public Map<String, Object> regist(
			@RequestBody Product param) {
		logger.info("======= cust join  진입 =======");
		List<String> ls = param.getFreebies();
		ps.accept("리스트?::"+ls);
		ps.accept("리스트?::"+param.toString());
		IFunction f = s -> cateMap.txCategory((String)s);
		IFunction f2 = s -> suppMap.txSupplier((String)s);
		String cateID = (String) f.apply(param.getCategoryID());
		String suppID = (String) f2.apply(param.getSupplierID());
		param.setCategoryID(cateID);
		param.setSupplierID(suppID);
		ps.accept(param.getCategoryID());
		ps.accept(param.getProductID());
/*		IConsumer i = o -> prdMap.insertProduct((Product)o);
		i.accept(param);*/
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}

	@PutMapping("/products/{userid}")
	public Map<String, Object> update(
			@PathVariable String userid,
			@RequestBody Product param) {
		logger.info("======= cust update 진입 =======");
		IConsumer i = (Object o)->prdMap.updateProduct(param);
		i.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}

	@DeleteMapping("/products/{userid}")
	public Map<String, Object> delete(
			@PathVariable String userid,
			@RequestBody Product param) {
		logger.info("======= cust delete 진입 =======");
		IConsumer i = (Object o)->prdMap.deleteProduct(param);
		i.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}
	
}
