var prod = prod || {};
prod = (()=>{
	let _,js,compojs,r_cnt, l_cnt;
	let setpath=()=>{
		  _ = $.ctx();
	      js = $.js();
	      compojs = js+'/component/compo.js';
	      r_cnt = '#right_content';
	      l_cnt = '#left_content';
	};
	let init=()=>{

		onCreate();
	};
	let onCreate=()=>{
		setpath();
		setContentView();
	};
	let setContentView=()=>{
		$.getScript(compojs,()=>{
			prod_post();
		});
	};
	let carousel =()=>{	
		setpath();
		$.getScript(compojs,()=>{
			$(r_cnt).empty();
			$(compo.shop_Carousel()).appendTo(r_cnt);
			$(r_cnt).after(compo.prod_post());
			
		});
			
		/*$(compo.shop_Carousel).html(r_cnt);*/
	};
	let prod_post =()=>{
		$(r_cnt).empty();
		$(compo.prod_post_to()).appendTo(r_cnt);
		
	};
	let post =()=>{
		
	};
	let get =()=>{
		
	};
	let put =()=>{
		
	};
	let del =()=>{
		
	};
	
	return {init:init, carousel:carousel}
	
})();