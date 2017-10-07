<template>
	<div class="page-view">
		<div class="page-view-left">
			<ul>
				<li>共{{ total }}条数据</li>
				<li>每页显示{{ per_page }}条数据</li>
				<li>共{{ lastPage }}页</li>
			</ul>
		</div>
		<div class="page-view-right">
			<ul>
				<li><router-link :to="{ name: route_name, params: { page: 1 }}">First</router-link></li>
				<li><router-link :to="{ name: route_name, params: { page: prev }}">Prev</router-link></li>
				<li v-for="item in groupList" :class="{'active': current == item.val}">
					<router-link :to="{ name: route_name, params: { page: item.val }}">{{ item.text }}</router-link>
				</li>
				<li><router-link :to="{ name: route_name, params: { page: next }}">Next</router-link></li>
				<li><router-link :to="{ name: route_name, params: { page: lastPage }}">Last</router-link></li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	name: 'page-view',
	data: function(){
		return {
			current: this.current_page,
			route_name: this.$route.name
		}
	},
	props: {
		total: {
			type: Number,
			required: true
		},
		per_page: {
			type: Number,
			required: true,
			default: 10
		},
		current_page: {
			type: Number,
			required: true,
			default: 1
		},
		last_page: {
			type: Number,
			default: 0
		},
		page_group: {
			type: Number,
			default: 5,
			coerce: function(n){
				n = n > 0? n : 5;
				return n % 2 === 1?n:n+1;//保证是奇数
			}
		}
	},
	methods: {
		updateRoute: function(){
			this.current = parseInt(this.$route.params.page);
			this.route_name = this.$route.name;
			//console.log(this.route_name);
		}
	},
	computed: {
		lastPage: {
			get: function(){
				return (typeof(this.last_page) === 'undefined' || this.last_page === 0)?Math.ceil(this.total / this.per_page) : this.last_page;
			}
		},
		prev: function(){
			return this.current > 1? this.current - 1 : 1;
		},
		next: function(){
			return this.current >= this.lastPage? this.lastPage : this.current + 1;
		},
		groupList: function(){
			//this.updateRoute();
			
			var len = this.lastPage , temp = [], list = [], count = Math.floor(this.page_group / 2) ,center = this.current;
            if( len <= this.page_group ){
                while(len--){ temp.push({text:this.lastPage-len,val:this.lastPage-len});};
                return temp;
            }
            while(len--){ temp.push(this.lastPage - len);};
            var idx = temp.indexOf(center);                
            (idx < count) && ( center = center + count - idx); 
            (this.current > this.lastPage - count) && ( center = this.lastPage - count);
            temp = temp.splice(center - count -1, this.page_group);                
            do {
                var t = temp.shift();
                list.push({
                    text: t,
                    val: t
                });
            }while(temp.length);
            
            if( this.lastPage > this.page_group ){
                (this.current > count + 1) && list.unshift({ text:'...',val: list[0].val - 1 });
                (this.current < this.lastPage - count) && list.push({ text:'...',val: list[list.length - 1].val + 1 });
            }
            //console.log(list);
            return list;
		}
	},
	created: function(){
		this.updateRoute();
	},
	watch: {
		'$route' (to, from){
			this.updateRoute();
		}
	}
}
</script>
<style>
.page-view {
	line-height: 1.2em;
	font-size: 1em;
}
.page-view .page-view-left {
	float: left;
}
.page-view .page-view-right {
	float: right;
}
.page-view ul, .page-view ul li, .page-view ul li a {
	float: left;
	display: block;
}
.page-view ul li a, .page-view .page-view-left ul li {
	padding: 0.3em 0.5em 0.3em 0.5em;
	background-color: #f3f3f3;
	margin-left: 0.1em;
	margin-right: 0.1em;
	color: #333;
	text-decoration: none;
	border: 1px solid #ccc;
}
.page-view ul li a:hover {
	background-color: #3BB4F2;
	border: 1px solid #3BB4F2;
}
.page-view ul li.active a {
	background-color: #3BB4F2;
	color: #fff;
	border: 1px solid #3BB4F2;
}
</style>