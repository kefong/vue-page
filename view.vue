<script>
export default {
	name: 'page-view',
	render: function(h){
		return h('div', 'vue-page lalalalalalla!')
	},
	props: {
		total: {
			type: Number,
			required: true
		},
		per_page: {
			type: Number,
			required: true
		},
		current_page: {
			type: Number,
			required: true
		},
		last_page: Number
	},
	data: function(){
		return {}
	},
	methods: {
	},
	computed: {
		lastPage: {
			get: function(){
				return (typeof(this.last_page) === 'undefined' || this.last_page === 0)?Math.ceil(this.total / this.per_page) : this.last_page;
			}
		}
	},
	created: function(){
		// 计算 last_page
		console.log(this.$el);
	}
}
</script>