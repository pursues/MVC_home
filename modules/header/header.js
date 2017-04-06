// 定义模型，视图，控制器
MVC
// 数据有异步请求获取，现在就没什么可以添加的了
/*.addModel('header', {
		"icon": [
			{
				"img": "icon-rss.png",
				"href": "index.html"
			},
			{
				"img": "icon-dribble.png",
				"href": "index.html"
			},
			{
				"img": "icon-twitter.png",
				"href": "index.html"
			},
			{
				"img": "icon-googleplus.png",
				"href": "index.html"
			},
			{
				"img": "icon-dribble.png",
				"href": "index.html"
			},
			{
				"img": "icon-flickr.png",
				"href": "index.html"
			},
			{
				"img": "icon-tumblr.png",
				"href": "index.html"
			}
		],
		"nav": [
			{
				"title": "Home",
				"href": "index.html"
			},
			{
				"title": "Portfolio",
				"href": "portfolio.html",
				"list": [
					{"title": "Portfolio 5 Columns", "href": "portfolio-columns.html"}, 
					{"title": "Portfolio Post", "href": "portfolio-post.html"}
				]
			},
			{
				"title": "Blog", 
				"href": "blog.html",
				"list": [
					{"title": "Blog Post", "href": "blog-post.html"}
				]
			},
			{
				"title": "Pages", 
				"href": "pages.html",
				"list": [
					{"title": "Full Width Page", "href": "pages.html"}, 
					{"title": "Page with Sidebar", "href": "pages.html"}
				]
			},
			{
				"title": "Styles", 
				"href": "styles.html",
				"list": [
					{"title": "Buttons Boxes Images", "href": "styles.html"}, 
					{"title": "Columns", "href": "styles.html"}, 
					{"title": "Typography", "href": "styles.html"}, 
					{"title": "Tabs Toggle Tables", "href": "styles.html"}, 
					{"title": "Testimonials", "href": "styles.html"}
				]
			},
			{
				"title": "Contact",
				"href": "contact.html"
			}
		]
	})*/
// 构建视图
.addView('header', function (model, template) {
	// 获取元素
	var dom = $('#header');
	// 获取数据
	var data = model.get('header');
	// 定义模板
	var tpl = [
		'<div class="inner">',
			'<div class="logo-container">',
				// logo图片,模板要渲染到html中，因此要在html文件中寻找该图片
				'<img src="modules/header/logo.png" alt="" class="logo" />',
				// 分享的icon,列表的内容要根据模型中的数据渲染
				'<ul>{#iconUl#}</ul>',
			'</div>',
			'<ul class="nav">{#navHtml#}</ul>',
		'</div>'
	].join('');
	// 如果模板需要用模型中的数据渲染，尽量让渲染的变量名称与模型中的数据属性名称一致
	var iconLiTpl = '<li><a href="{#href#}"><img src="modules/header/{#img#}" alt="" /></a></li>';
	// 定义每一个导航成员模板
	// 我们想将外层li和内层的li复用同一个模板
	var navItemTpl = '<li class="{#cls#}"><a href="{#href#}">{#title#}</a>{#childList#}</li>';
	var innerUlTpl = '<ul class="inner-nav">{#navHtml#}</ul>';
	// 定义字符串
	var html = iconHTML = navHtml = innerNavHtml = '';
	// 格式化模板
	// 遍历icon数据
	data.icon.forEach(function (obj, index) {
		// 渲染输出iconUl结果
		iconHTML += template(iconLiTpl, obj);
	})
	// 渲染nav用data中的nav数据，是一个数组
	// 遍历最外层的li
	data.nav.forEach(function (obj, index) {
		// 判断obj是否有list属性值，有的话，我们要渲染下拉框
		if (obj.list) {
			// 清空保证当前innerNavHtml变量没有内容
			innerNavHtml = ''
			// list是一个数组，我们还需要遍历
			obj.list.forEach(function (o, i) {
				// 得到的结果 '<li><a href=""></a></li><li><a href=""></a></li>'
				innerNavHtml += template(navItemTpl, {
					cls: 'inner-nav-item',
					href: o.href,
					title: o.title,
					childList: ''
				})
			})
			// 我们要用格式化后的innerNavHtml去格式化innerUlTpl模板得到完整列表，我们重新定义innerNavHtml
			innerNavHtml = template(innerUlTpl, {navHtml: innerNavHtml})
		} else {
			innerNavHtml = '';
		}
		// 渲染li
		navHtml += template(navItemTpl, {
			cls: 'nav-item',
			href: obj.href,
			title: obj.title,
			childList: innerNavHtml
		})
	})
	// 格式化tpl模板
	html = template(tpl, {
		// 添加icon字符串
		iconUl: iconHTML,
		// 渲染导航模块
		navHtml: navHtml
	})
	// 渲染到页面中
	dom.html(html);
	// 返回dom
	return dom;
})
// 添加控制器
.addCtrl('header', function (model, view, observer) {
	// 定义页面初始化方法
	var init = function () {
		// 获取元素
		var dom = view.create('header')
		// 绑定事件
		dom
			// 鼠标移入，显示下拉框
			.delegate('.nav-item', 'mouseenter', function () {
				// 显示下拉框
				$(this).find('ul').stop().slideDown(200)
			})
			// 鼠标移出隐藏下拉框
			.delegate('.nav-item', 'mouseleave', function () {
				// 隐藏下拉框
				$(this).find('ul').stop().slideUp(200)
			})
	}
	// 异步请求获取数据，然后再渲染页面
	// 这是对ajax简写方式
	$.get('data/header.json', function (res) {
		// console.log(res)
		// 请求数据成功，将数据存储在模型中
		if (res && res.errno === 0) {
			// 将data存储
			model.add('header', res.data);
			// 存储成功了。我们就可以渲染页面了
			init();
		}
	})
	

})
