var common = common || {};
common = {
		nav : ()=>{
		/*	$('.nav').children('li').eq(0).attr('id','emp_access').html('<a href="">회원 로그인</a>');
			$('.nav').children('li').eq(1).attr('id','emp_registe').html('<a href="">회원 가입</a>');
			$('.nav').children('li').eq(2).attr('id','cust_singin').html('<a href="">사원 로그인</a>');
			$('.nav').children('li').eq(3).attr('id','cust_singup').html('<a href="">사원 가입</a>');
			page_move();*/
			
					
		let nav_arr = [
				{id:'emp_access', val:'회원 로그인'},
				{id:'emp_registe', val:'회원 가입'},
				{id:'cust_singin', val:'사원 로그인'},
				{id:'cust_singup', val:'사원 가입'}]
			
			$.each(nav_arr,(i,j)=>{
				$('.nav').children('li').eq(i).attr('id',j.id).html('<a href="">'+j.val+'</a>');
			
			}); 
		page_move();
		}
		
};

function page_move(){

	$('#emp_registe').children('a').click(()=>{
		alert('회원가입 클릭!')
		$('#right_content').html(compo.cust_join_form());
	});

	$('#cust_singin').children('a').click(()=>{
		alert('사원접속 클릭!')
		$('#right_content').html(compo.emp_access_form());
	});
	
	$('#cust_singup').children('a').click(()=>{
		alert('사원가입 클릭!')
		$('#right_content').html(compo.emp_register_form());
	});
}
