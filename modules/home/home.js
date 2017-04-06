MVC
//添加视图
.addView("home",function(){
	var dom = $("#app");
	//定义模板
	var tpl =  [
	'<div class="inner module">',
	//定义banner位置
	'<div class="banner"></div>',
	//定义新闻位置
	'<div class="news"></div>',
	//定义图片位置
	'<div class="image"></div>',
	'</div>'
	].join(''); 
	dom.html(tpl);
	return dom;
})
//添加控制器
.addCtrl("home",function(model,view,observer){
	view.create("home");
	$.get('data/home.json',function(res){
		if(res&&res.errno===0){
			model.add("home",res.data);
			observer.fire("homeComplete")
		}
	})
})