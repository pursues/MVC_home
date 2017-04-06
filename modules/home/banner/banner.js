// 定义视图，定义控制器
MVC
// 模型中保存一个变量，对应当前显示的图片的索引值 num
.addView('home.banner', function (model, template) {
	// 获取容器元素
	var dom = $('#app .banner');
	// 获取数据
	var data = model.get('home.banner');
	// 定义模板
	var tpl = [
		'<ul class="banner-img">{#bannerImg#}</ul>',
		'<ul class="banner-btn"><li class="pre"></li>{#bannerBtn#}<li class="next"></li></ul>',
		'<h1>{#title#}</h1>'
		// '<div class="divide-line"></div>'
	].join('');
	// 定义子模板
	var imgLiItem = '<li class="{#isChoose#}"><img src="modules/home/banner/{#src#}.jpg" alt="" /><p>{#intro#}</p></li>';
	var btnLiItem = '<li data-num={#num#} class="item {#isChoose#}"></li>';
	// 定义字符串
	var html = imgHtml = btnHtml = '';
	// 图片渲染的时候，我们就要将当前的值保存下来
	// 显示的是最后一张，所以我们要保存data.list.length - 1,保存在模型中
	// var num = data.list.length - 1
	// model.add('home.banner.num', num)
	model.add('home.banner.num', 0)
	// 格式化模板
	// 遍历list数据，格式化每一个成员
	data.list.forEach(function (obj, index) {
		// 格式化每一个成员模板
		imgHtml += template(imgLiItem, {
			// 默认选中第一张
			isChoose: index === 0 ? 'choose' : '',
			src: obj.src,
			intro: obj.intro
		})
		// 格式化按钮模板
		btnHtml += template(btnLiItem, {
			// isChoose: index === num ? 'choose' : '',
			isChoose: index === 0 ? 'choose' : '',
			num: index
		})
	});
	// 格式化tpl得到模块的视图
	var html = template(tpl, {
		bannerImg: imgHtml,
		bannerBtn: btnHtml,
		title: data.title
	})
	// 将字符串渲染到页面中
	dom.html(html);
	// 返回dom
	return dom;
})
.addCtrl('home.banner', function (model, view, observer) {
	// 定义容器元素
	var dom = null;
	// 现在去渲染还不一定有数据，需要等到消息广播的时候渲染
	// 注册消息
	observer.regist('homeComplete', function () {
		// 渲染视图
		dom = view.create('home.banner');
		// 绑定事件
		bindEvent();
	})
	// 显示对应的banner元素
 	function showBannerImg(num) {
 		// 获取当前图片对应的li元素。
 		dom.find('.banner-img li')
 		// 找到第num个li元素
 		.eq(num).addClass('choose')
 		// 显示
 		.fadeIn()
 		// 获取兄弟元素
 		.siblings().removeClass('choose')
 		// 隐藏
 		.fadeOut()
 		// 处理按钮，
 		// 获取所有按钮
 		dom.find('.banner-btn .item')
 		// 获取当前按钮
 		.eq(num)
 		// 添加choose类
 		.addClass('choose')
 		// 获取兄弟按钮
 		.siblings()
 		// 删除choose类
 		.removeClass('choose')
 		// 显示哪一张图片，就要将该图片对应的索引值存储
 		model.add('home.banner.num', num)
 	}
	// 绑定事件的方法
	function bindEvent () {
		// model.add('home.banner.num', 1)
		// 后于view.create方法执行，因此可以访问到容器元素
		dom
			// banner-btn里面的item元素。绑定click事件，点击的时候，显示相应的图片
			.delegate('.banner-btn .item', 'click', function () {
				// $(this).index() 这种方式要减一，因为前面多了一个pre按钮元素
				// console.log($(this).attr('data-num'))
				// console.log($(this).data('num'))
				// console.log($(this).data('num'))
				var num = $(this).data('num');
				// 显示这张图片
				showBannerImg(num);
			})
			// 前进按钮绑定事件
			.delegate('.banner-btn .pre', 'click', function () {
				// 获取缓存的模型数据值
				var num = model.get('home.banner.num');
				// 当点击前一张图片按钮的时候，显示前一张图片（如果是第一张了，我们不要做处理）
				// 如果是第一张，返回
				if (num <= 0) {
					return ;
				}
				num = num - 1
				// --num
				showBannerImg(num)
				// showBannerImg(--num)
			})
			// 后退按钮绑定事件
			.delegate('.banner-btn .next', 'click', function () {
				// 获取缓存的模型数据值
				var num = model.get('home.banner.num');
				// 最后一张图片索引值
				var total = model.get('home.banner.list').length - 1;
				// 当点击后一张图片按钮的时候，显示下一张图片（如果是最后一张了就不要处理了）
				// 如果是最后一张就返回
				if (num >= total) {
					return;
				}
				// num+1并显示
				// num = num + 1;

				// ++num;
				// showBannerImg(num)
				// 上面两步合并
				showBannerImg(++num)
			})
	}
	// 我们可以通过委托模式实现对按钮的事件绑定
	// 在这里我们能获取元素么？我们需要等待视图创建才能绑定事件
	// 交互写在控制器中
	// 当点击item按钮的时候，对应的图片
})
