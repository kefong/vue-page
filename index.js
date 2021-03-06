import view from './view'
var Page = {
		
}
Page.install = function(Vue, options){
	// 注册组件
	Vue.component('page-view', view);
	//注入
	Vue.mixin({
		watch: {
			'$route':function(to, from){
				this.refresh();
			}
		},
		methods: {
			refresh: function(){
				if(typeof(this.fill) === 'function'){
					this.fill();
				}
			}
		}
	});
}
export default Page;