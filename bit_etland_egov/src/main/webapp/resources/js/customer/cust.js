var cust = cust || {}
cust.permission = (()=>{
	let login =()=>{
		$.getScript($.js()+'/component/compo.js')
		.done(()=>{
			alert('4')
			$('#right_content').html(compo.cust_login_form());
		})
		.fail(()=>{
			alert('component/compo.js 를 찾지 못했습니다.');
		});
	};
	let join =()=>{};
	let mypage =()=>{};
	return {
		login : login,
		join : join,
		mypage : mypage
	};
	
})();