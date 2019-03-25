var app = app || {};
app =  (()=>{
	let init =x=>{
		app.$.init(x);		
	};
	let onCreate =()=>{
		setContentView();
	};
	let setContentView =(x)=>{
		$.when(
			$.getScript($.js()+'/component/compo.js'),
			$.getScript($.js()+'/customer/cust.js'),
			$.getScript($.js()+'/employee/emp.js')
			
		).done(()=>{alert('1')
			cust.permission.login();
		alert('2')
			app.navi.nav();
		alert('3')
		});  
	};

	return {init:init, onCreate:onCreate};

})();

app.session =(()=>{
	var init =x=>{
		onCreate(x);
	};
	var onCreate =x=>{
		sessionStorage.setItem('ctx',x);
		sessionStorage.setItem('img',x+'/resources/img');
		sessionStorage.setItem('css',x+'/resources/css');
		sessionStorage.setItem('js',x+'/resources/js');
	};
	return {init:init}
})();

app.$ = {
		init : (x)=>{

			$.getScript(x+'/resources/js/router.js',()=>{
				$.extend(new Session(x));
				app.onCreate();
			})
		}
	};

app.navi = {
		nav : ()=>{
			let nav_arr = [
				{id:'emp_access', val:'회원 로그인'},
				{id:'emp_registe', val:'회원 가입'},
				{id:'cust_singin', val:'사원 로그인'},
				{id:'cust_singup', val:'사원 가입'}]

			$.each(nav_arr,(i,j)=>{
				$('.nav').children('li').eq(i).attr('id',j.id).html('<a href="">'+j.val+'</a>');
				
			});
			
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
		
}

var navi =(()=>{
	 let nav_arr = [
			{id:'emp_access', val:'회원 로그인'},
			{id:'emp_registe', val:'회원 가입'},
			{id:'cust_singin', val:'사원 로그인'},
			{id:'cust_singup', val:'사원 가입'}]

		$.each(nav_arr,(i,j)=>{
			$('.nav').children('li').eq(i).attr('id',j.id).html('<a href="">'+j.val+'</a>');
			
		});
		
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
	
})();


