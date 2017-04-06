//模块
MVC
.addModel('bg',{
	//随机显示背景图片
	num:parseInt(Math.random()*6),
	//图片的总数为7
	wholeNum:6
})
//添加视图
.addView('bg',function (model,template){
	//第一步获取元素容器
	var dom = $('<div id="bg" class="bg"></div>');
	//第二部 获取数据
	var data = model.get('bg');
	//第三步 定义模版得到背景图片
	var tpl = '<div class="bg-item item-{#item#} {#isShow#}"></div>';
	//第四步 定义字符串
	var html = '';
	//第五步 格式化模板
	for(var i = 0;i < data.wholeNum;i++){
		html += template(tpl,{
			item:i,
			isShow:data.num === i ? 'choose' : ''
		});
	};
	//第六部 渲染模板
	dom.html(html);
	//放入body元素内 加载到最前面
	dom.prependTo('body');
	//第七步 返回
	return dom;
})

//添加控制器
.addCtrl('bg',function (model,view,observer){
	//渲染视图
	var dom = view.create('bg');
	//得到所有的图片
	var wholeNum = model.get('bg.wholeNum');

	setInterval(function(){
	//得到随机图片
		var num = parseInt(Math.random()*wholeNum);
		dom.find('.bg-item').eq(num).addClass('choose').siblings().removeClass('choose');
		//更新
		model.add('bg.num',num);
	},2000)
})