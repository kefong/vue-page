<script>
export default {
	name: 'page-view',
	render: function(h){
		return h('div',this.$slots.default)
	},
	props: ['total','per_page','current_page','last_page'],
	data: function(){
		return {}
	},
	methods: {
	},
	created: function(){
		console.log('test');
	}
}
</script>