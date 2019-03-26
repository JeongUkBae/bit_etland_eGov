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