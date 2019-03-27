var auth = auth || {}
auth = (()=>{
/*	let _ = $.ctx();
	let js = $.js();
	let comopjs = $.js()+'/component/compo.js';
	let rightCtnt = $('#right_content');
	*/
	let _,js,compojs,r_cnt, l_cnt;
	let init =()=>{
		
		  _ = $.ctx();
	      js = $.js();
	      compojs = js+'/component/compo.js';
	      r_cnt = '#right_content';
	      l_cnt = '#left_content';
		onCreate();
	};
	let onCreate =()=>{
		
		setContentView();
		};
	let setContentView =()=>{
		$.getScript($.js()+'/component/compo.js')
		.done(()=>{
			
		/*	let a = {name : $('form li[name=login]').val() };
			alert('aa?::' +a.name);
			if (a){}*/
			
			
			$('#left_content ul').empty();
			let arr = [
				{val:'회원 로그인', name:'login'},
				{val:'회원 가입', name:'join'},
				{val:'사원 로그인', name:'access'},
				{val:'사원 가입', name:'registe'}];
			$.each(arr,(i,j)=>{
				
				$('<li><a href="#">'+j.val+'</a></li>')
					.attr('name',j.name)
					.addClass('cursor')
					.appendTo('#left_content ul')
					.click(function(){
						let that = $(this).attr('name');
						switch(that){
						case 'login' : 
							$('#right_content').empty();
							$(compo.cust_login_form()).appendTo('#right_content');
							login();

							break;
						case 'join' : 
							$('#right_content').empty();
							$(compo.cust_join_form()).appendTo('#right_content');
							break;
						case 'access' : 
							$('#right_content').empty();
							$(compo.emp_access_form()).appendTo('#right_content');
							break;
						case 'registe' : 
							$('#right_content').empty();
							$(compo.emp_register_form()).appendTo('#right_content');
							break;
						}
					});
			}); //navi_end
		
		
		})
		.fail(()=>{
			alert('component/compo.js 를 찾지 못했습니다.');
		});
	};
	let login =()=>{
		$('#right_content').empty();
		$(compo.cust_login_form()).appendTo('#right_content');
		/*$('#right_content').html(compo.cust_login_form());*/
		action();
	};
	let action =()=>{
		$('form button[type=submit]').click(e=>{	
			let data = {customerID:$('form input[name=uname]').val(), 
						password:$('form input[name=psw]').val()};
			alert('ID :: '+data.customerID);
			$.ajax({
				url: $.ctx()+'/cust/login',
				type: 'post',
				data: JSON.stringify(data),
				dataType: 'json',
				contentType: 'application/json; charset=UTF-8',
				success: d=>{
					if(d.customerID!==''){
						alert('로그인성공::'+d.customerID);
						$('#right_content').empty();
						$(compo.cust_mypage()).appendTo('#right_content');
					}else{
						alert('로그인 실패');
					}
						
				},
				error: e=>{
					alert('실패');
				}
			});
		});	
	};

	
    let join =()=>{};
    let register =()=>{};
    let access =()=>{};
	return {init:init, login:login};
	
})();