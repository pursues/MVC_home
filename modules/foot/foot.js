//引入foot这个模块
MVC
.addView("foot",function(model,template){
	//获取元素容器
	var dom = $(".foot");
	//获取数据
	var data = model.get("foot");
	//console.log(data)
	//定义模板
	var tpl = [
		'<div class="box">',
			'<div class="d1">',
				'<h3>{#title1#}</h3>',
				'<ul>{#d1lis#}</ul>',
			'</div>',
			'<div class="d2">',
				'<h3>{#title2#}</h3>',
				'<ul>{#d2lis#}</ul>',
			'</div>',
			'<div class="d3">',
				'<h3>{#title3#}</h3>',
				'<p class="p1">{#d3p1#}</p>',
				'<br />',
				'<p class="p2">{#d3p2#}</p>',
			'</div>',
			'<div class="d4">',
				'<h3>{#title4#}</h3>',
				'<div class="form">',
					'<form action="">',
						'<input type="text" /> Name*',
						'<input type="text" /> Email*',
						'<input type="textarea" />',
						'<input type="submit" value="submit" />',
					'</form>',
				'</div>',
			'</div>',
		'</div>'
	].join("");

	var d1LiTpl = [
		'<li>',
			'<div class="bar">',
				'<p>{#day#}</p>',
				'<span>{#month#}</span>',
			'</div>',
			'<div class="explain">{#content#}</div>',
		'</li>'
	].join("");

	var d2LiTpl = [
		'<li>',
			'<img src="modules/foot/{#src#}" alt="" />',
		'</li>'
	].join("");
	//定义字符串
	var html = d1Lis = d2Lis = "" ;

	data.days.list.forEach(function(obj,index){
		d1Lis += template(d1LiTpl,obj)
	})
	//console.log(d1Lis)
	data.img.list.forEach(function(obj,index){
		d2Lis += template(d2LiTpl,{src:obj})
	})
	//console.log(d2Lis)
	//格式化模板
	html = template(tpl,{
		title1 : data.days.title,
		'd1lis' : d1Lis,
		title2 : data.img.title,
		"d2lis" : d2Lis,
		title3 : data.about.title,
		"d3p1" : data.about.list[0],
		"d3p2" : data.about.list[1],
		title4 : data.touch.title
	})

	dom.html(html);
	return dom;


})
.addCtrl("foot",function(model,view,observer){
	$.get('data/about.json',function(res){
		if(res&&res.errno===0){
			model.add("foot",res.data);
			view.create("foot");
			//init();
		}
	})

})