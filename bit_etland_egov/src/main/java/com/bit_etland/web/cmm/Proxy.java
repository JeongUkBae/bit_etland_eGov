package com.bit_etland.web.cmm;

import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component @Data @Lazy
public class Proxy {
	private int pageNum, pageSize, blockSize, blockNum,
	startRow, endRow, startPage, endPage,
	prevBlock, nextBlock, totalcount;
private boolean existPrev, existNext;



public void carryOut(Map<?,?> paramMap) {
			System.out.println("프록시 페이지네이션 도착");
			String _pageNum = (String) paramMap.get("page_num");
			pageNum = ((String)paramMap.get("page_num")==null)? 1: Integer.parseInt((String) paramMap.get("page_num"));
			String _pageSize = (String) paramMap.get("page_size");
			pageSize = ((String)paramMap.get("page_size")==null)? 5: Integer.parseInt((String) paramMap.get("page_size"));
			System.out.println("pageSize:::"+this.pageSize);


		
			/*totalcount = CustomerServiceImpl.getInstance().countCustomer(null);*/
			System.out.println("totalcount:::"+this.totalcount);
			
			//this.startRow = String.valueOf(totalcount-Integer.parseInt(this.pageSize));
			//this.endRow = String.valueOf(Integer.parseInt(this.startRow) +Integer.parseInt(this.pageSize)) ;  
			System.out.println("pageNUM??"+pageNum);
			System.out.println("pageSize??"+pageSize);
			
			/*
			 * startRow = (totalcount-((pageSize*pageNum)-1)); 
			 * endRow = ((totalcount-((pageSize*pageNum)-1))+4);
			 */
			blockSize = ((String)paramMap.get("blockSize")==null)?5:Integer.parseInt((String) paramMap.get("blockSize")); 
			System.out.println("count의 나누기는?"+blockSize);
			
			System.out.println("count의 나머지는?"+blockSize);
		 
			int pageCount = totalcount/pageSize;
			if(totalcount%pageSize!=0) {
				pageCount++; 
			}
			System.out.println("전체 페이지수: "+pageCount); 
			startRow = (pageNum -1) *pageSize + 1; 
			System.out.println("스타트로우: "+startRow); 
			endRow = (totalcount > pageNum * pageSize)? pageNum * pageSize: pageCount;
			System.out.println("엔드로우: "+endRow);
			 
			System.out.println("blockSize::"+blockSize);
			//	blockSize
			
			existPrev = (pageNum<=blockSize)?false:true;
			blockNum = (pageNum-1)/blockSize;
			
			
			startPage = blockNum*blockSize+1;


			endPage = startPage+4;
			if(endPage>=pageCount) {
				endPage=pageCount;
			}
			existNext = (startPage+pageSize)>=pageCount?true:false;
			/*
			 * startPage = endPage-pageSize+1; endPage = totalcount/pageSize-1;
			 */
			System.out.println("==startPage::"+startPage);
			System.out.println("==endPage::"+endPage);
			
			prevBlock = startPage - pageSize; 
			nextBlock = startPage + pageSize;
			System.out.println("==prevBlock::"+prevBlock);
			System.out.println("==nextBlock::"+nextBlock);
			




	}
}
