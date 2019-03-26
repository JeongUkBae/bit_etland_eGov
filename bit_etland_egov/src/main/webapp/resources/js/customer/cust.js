var cust = cust || {}
cust.permission = (()=>{
	let login =()=>{
		
		$('#left_content ul').empty();
		let arr = [
			{val:'회원 로그인', name:'login'},
			{val:'회원 가입', name:'join'},
			{val:'사원 로그인', name:'access'},
			{val:'사원 가입', name:'registe'}];
		$('form button[type=submit]').click(()=>{
			alert('테스트')
		});	
		$.each(arr,(i,j)=>{
			$('<li><a href="#">'+j.val+'</a></li>')
				.attr('name',j.name)
				.addClass('cursor')
				.appendTo('#left_content ul')
				.click(function(){
					let that = $(this).attr('name');
					switch(that){
					case 'login' : 
							$('#right_content').html(compo.cust_login_form());

						break;
					case 'join' : 
							$('#right_content').html(compo.cust_join_form());
						break;
					case 'access' : 
						$('#right_content').html(compo.emp_access_form());
						break;
					case 'registe' : 
						$('#right_content').html(compo.emp_register_form());
						break;
					}
				});
		}); //navi_end

		
		
	
		
		$.getScript($.js()+'/component/compo.js')
		.done(()=>{
			$('#right_content').html(compo.cust_login_form());
		})
		.fail(()=>{
			alert('component/compo.js 를 찾지 못했습니다.');
		});
	};
	let join =()=>{
		
	};
	let mypage =()=>{};
	return {
		login : login,
		join : join,
		mypage : mypage
	};
	
})();