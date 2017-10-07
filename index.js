import view from './view'
var Page = {
		
}
Page.install = function(Vue, options){
	// 注册组件
	Vue.component('page-view', view);
}
export default Page;