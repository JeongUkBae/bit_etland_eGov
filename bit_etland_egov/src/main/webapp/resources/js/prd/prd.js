var prod = prod || {};
prod = (()=>{
	let _,js,compojs,r_cnt, l_cnt;
	let init=()=>{
		  _ = $.ctx();
	      js = $.js();
	      compojs = js+'/component/compo.js';
	      
	      r_cnt = '#right_content';
	      l_cnt = '#left_content';
		onCreate();
	};
	let onCreate=()=>{
		setContentView();
	};
	let setContentView=()=>{
		$.getScript(compojs,()=>{
			carousel();
		});
	};
	let carousel =()=>{
		$(r_cnt).empty();
		$(compo.shop_Carousel()).appendTo(r_cnt);
		/*$(compo.shop_Carousel).html(r_cnt);*/
	};
	return {init:init}
	
})();