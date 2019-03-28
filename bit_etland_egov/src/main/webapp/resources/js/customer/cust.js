var cust = cust || {}
cust = (()=>{
	let _,js,compojs,r_cnt, l_cnt;
	let init =(x)=>{
		  _ = $.ctx();
	      js = $.js();
	      compojs = js+'/component/compo.js';
	      r_cnt = '#right_content';
	      l_cnt = '#left_content';
		onCreate(x);
	};
	let onCreate =(x)=>{
		setContentView(x);
	};
	let setContentView =(x)=>{
		$.getScript(compojs)
		.done(()=>{
			myPage(x);
			$('div button[type=submit]').click(e=>{
				alert('정보수정 클릭 ');
				upDatepage(x);
				
				e.preventDefault();
			});

			
		});
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
	return {init:init}
})();