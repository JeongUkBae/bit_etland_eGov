var cust = cust || {}
cust = (()=>{
	let setpath =()=>{
		 _= $.ctx();
	      js = $.js();
	      compojs = js+'/component/compo.js';
	      prddjs = js+'/prd/prod.js';
	      custjs = js+'/customer/cust.js';
	      empjs = js+'/employee/emp.js';
	      r_cnt = '#right_content';
	      l_cnt = '#left_content';
		
	};
	
	let init =(x)=>{
		setpath();
		onCreate(x);
	};
	let onCreate =(x)=>{
		setContentView(x);
	};
	let setContentView =(x)=>{
		$.getScript(compojs,()=>{
			myPage(x);
			$('div button[type=submit]').click(e=>{
				alert('정보수정 클릭 ');
				upDatepage(x);
				e.preventDefault();
			});
			$('#left_content ul').empty();
			cust_navi();
			$('#nav_mypage').addClass('active');
			
		});
	};
	let cust_navi =()=>{
		setpath();
		let arr = [
			{val:'마이페이지', name:'nav_mypage'},
			{val:'정보수정', name:'nav_update'},
			{val:'회원탈퇴', name:'nav_delete'},
			{val:'쇼핑몰', name:'nav_shop'},
			{val:'구매내역', name:'nav_history'},
			{val:'장바구니', name:'nav_basket'}
			];
		$.each(arr,(i,j)=>{
			$('<li><a href="#">'+j.val+'</a></li>')
				.attr('name',j.name)
				.attr('id',j.name)
				.addClass('cursor')
				.appendTo('#left_content ul')
				.click(function(){
					let that = $(this).attr('name');
					$(this).addClass('active');
					$(this).siblings().removeClass('active');
					switch(that){
					case 'nav_mypage' : 
						alert('마이페이지 클릭!')
						$('.nav li[name=nav_mypage]').click(e=>{
						
							e.preventDefault();
							/*updateE();*/
						});

						break;
					case 'nav_update' : 
						alert('회원수정 클릭!')
						$('.nav li[name=nav_update]').click(e=>{
							
							e.preventDefault();

						});

						break;
					case 'nav_delete' : 
						alert('회원탈퇴 클릭 ')
						$('.nav li[type=nav_delete]').click(e=>{
							e.preventDefault();
							
							
						});
						
						break;
					case 'nav_shop' : 
						$('#nav_shop').click(e=>{
							e.preventDefault();
							alert('쇼핑몰 클릭');
							prod.carousel();
						});
						
						break;
					case 'nav_history' : 
						alert('주문내역 클릭 ')
						$('.nav li[type=nav_history]').click(e=>{
							e.preventDefault();
							

						});
						break;
				
					case 'nav_basket' : 
						alert('장바구니 클릭 ')
						$('.nav li[type=nav_basket]').click(e=>{
							e.preventDefault();
							

						});
						break;
					}
				});
		}); //navi_end
	};

	let myPage =(x)=>{
		$(r_cnt).html(compo.cust_mypage());
		$('h2').eq(0).html('<h2>'+x.customerName+'님 환영합니다.</h2>');
		$('.w3-container').children('p').eq(0).html('<p>'+x.password+'</p>');
		$('.w3-container').children('p').eq(1).html('<p>'+x.phone+'</p>');
		$('.w3-container').children('p').eq(2).html('<p>'+x.city+'</p>');
		$('.w3-container').children('p').eq(3).html('<p>'+x.address+'</p>');
		$('.w3-container').children('p').eq(4).html('<p>'+x.postalcode+'</p>');

	};
	let upDatepage =(x)=>{
		$(r_cnt).empty();
		$(compo.cust_update()).appendTo(r_cnt);
		alert(x.password);
    	$('form input[name=password]').attr('value',x.password);
    	$('form input[name=phone]').attr('value',x.phone);
    	$('form input[name=city]').attr('value',x.city);
    	$('form input[name=address]').attr('value',x.address);
    	$('form input[name=postalcode]').attr('value',x.postalcode);
		//$('#password').html('<input type="password" placeholder="'+x.password+'" name="psw" "required"="">');
    	$('div button[type=submit]').click(()=>{
    		alert('정보수정 클릭 ');
    		updateE();
		});
	};
	let updateE =(x)=>{
		
		let data = { 
				customerID: x.customerID,
    			password : $('form input[name=password]').val(),
    			phone : $('form input[name=phone]').val(),
    			city : $('form input[name=city]').val(),
    			address : $('form input[name=address]').val(),
    			postalcode : $('form input[name=postalcode]').val()};
			
	    	$.ajax({
	    		url: $.ctx()+'/customers/update',
	    		type: 'put',
	    		data: JSON.stringify(data),
	    		dataType: 'json',
	    		contentType: 'application/json; charset=UTF-8',
	    		success: d=>{
					if(d.msg=='SUCCESS'){
						alert('수정 성공::'+d.msg);
						upDatepage();
						
					}else{
						alert('수정 실패');
						upDatepage();
					}
						
				},
				error: e=>{
					alert('실패');
				}
	    	
	    	});
		
	};
	
	
	let list = x=>{
		setpath();
		alert('x :: '+x)
		alert('cust list 접근');
		$.getJSON(_+'/customers/page/'+x, d=>{
			$(r_cnt).empty();
			$('<div class="grid-item" id="cust_lst">'
					+'<h1><font style="font-size: 30px">사원 리스트</font>'
					+'</h1>'
				    +'</div>'
				    +'<div class="grid-item" id="content_2"></div>')
				    .appendTo('#right_content');
			let table = '<table><tr><th>No.</th>'
				+'<th>아이디</th>'
				+'<th>이름</th>'
				+'<th>생년월일</th>'
				+'<th>성별</th>'
				+'<th>전화</th>'
				+'<th>주소</th>'
				+'<th>우편번호</th>'
				+'</tr>'
			$.each(d.ls,(i,j)=>{
				table += '<tr><td>'+j.rownum+'</td>'
				+'<td>'+j.customerID+'</td>'
				+'<td>'+j.customerName+'</td>'
				+'<td>'+j.ssn+'</td>'
				+'<td>'+'남'+'</td>'
				+'<td>'+j.phone+'</td>'
				+'<td>'+j.address+'</td>'
				+'<td>'+j.postalcode+'</td>'
				+'</tr>'
				
			});
			table += '</table>'
				
			$(table).attr('id','cust_tab')
				.css({'font-family':'arial, sans-serif',
						'border-collapse':'collapse',
						'width':'100%',
						'text-align': 'center',
						'display': 'inline-block'})
				.addClass('pagination center')
				.appendTo('#cust_lst');
			let html = '<div id=pagination>'
			let pxy = d.pxy;
			if(pxy.existPrev){
				$('<a id="laquo">&laquo;</a>').appendTo('#pagination');
			}
				let  i= 0;
				for(i=pxy.startPage; i<=pxy.endPage; i++){
					if(pxy.pageNum == i){
						$('<a class="page active">'+i+'</a>')
						.attr('href',_+'/customers/page/'+i)
						.appendTo(html)
						.click(e=>{
							e.preventDefault();
							alert('클릭한페이지'+$(this).text());
							list($(this).text());
						});
						
					}else{
						$('<a class="page">'+i+'</a>').appendTo(html);
						$('<a class="page active">'+i+'</a>')
						.attr('href',_+'/customers/page/'+pxy.nextBlock)
						.appendTo(html)
						.click(e=>{
							e.preventDefault();
							alert('클릭한페이지'+$(this).text());
							list($(this).text());
						});
					}
				};
				
			if(pxy.existNext){
				$('<a>&raquo;</a>').appendTo('#pagination');
			}
			html += '</div>';
			$(html).appendTo('#content_2');
	
				
			/*
			 * <div style="height: 50px"></div>
   <div class="center">
     <div class="pagination">
     <form id="form" name="form">
    <c:if test="${pagination.existPrev}">
         <a href='${ctx}/customer.do?cmd=cust_list&page=list&page_num=${pagination.prevBlock}'>&laquo;</a>
     </c:if>
     <c:forEach begin="${pagination.startPage}" end="${pagination.endPage}" varStatus="status">
     <c:choose>
       <c:when test="${pagination.pageNum eq status.index}" >
           <a href="#"class='page active'>${status.index}</a>
       </c:when>
       <c:otherwise>
           <a href="#"class='page'>${status.index}</a>
       </c:otherwise>
     </c:choose>
     </c:forEach>
     <c:if test="${pagination.existNext}">
       <a href='${ctx}/customer.do?cmd=cust_list&page=list&page_num=${pagination.nextBlock}' >&raquo;</a>
     </c:if>
     </form>
     </div>
   </div>
			 * 
			 * @charset "UTF-8";
					#cust_tab {
					font-family: arial, sans-serif;
					border-collapse: collapse;
					width: 100%;
					}
					#cust_tab td, th {
					border: 1px solid #dddddd;
					text-align: left;
					padding: 8px;
					}
					#cust_tab tr:nth-child(even) {
					background-color: #dddddd;
					}
					.center {
					text-align: center;
					}
					.pagination {
					display: inline-block;
					}
					.pagination a {
					color: black;
					float: left;
					padding: 8px 16px;
					text-decoration: none;
					transition: background-color .3s;
					border: 1px solid #ddd;
					margin: 0 4px;
					}
					.pagination a.active {
					background-color: #4CAF50;
					color: white;
					border: 1px solid #4CAF50;
					}
					.pagination a:hover:not(.active) {
					  background-color: #ddd;
					}
					
					.grid-item2{
					   display: grid;
					    grid-template-columns: auto auto auto auto;
					    background-color: #F7BE81;
					    padding: 5px;
					}
					.grid-item2 {
					background-color: rgba(255, 255, 255, 0.8);
					border: 1px solid rgba(0, 0, 0, 0.8);
					padding: 5px;
					font-size: 30px;
					text-align: center;
					}
					#itemd_1{
					  grid-column-start: 1;
					  grid-column-end: 4;
					}
					#itemd_2{
					  grid-column-start: 4;
					  grid-column-end: 5;
					}
					#itemd_3{
					  grid-column-start: 1;
					  grid-column-end: 5;
					}
			 * 
			 * */
			$.getScript(empjs,()=>{
				emp.init();
				
			});
				
		});
		
	};
	
	
	return {init:init, list:list}
})();