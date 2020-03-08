<template>
	<Select ref="select" v-bind="$attrs" @on-change="handleChange" multiple>
		<tree-select-tree-item :selectedArray="value" :data="data" 
			@on-clear="handleClear" :load-data="loadData" :checkbox="checkbox" 
			@on-check="handleTreeCheck"></tree-select-tree-item>
	</Select>
</template>

<script>
import Emitter from 'iview/src/mixins/emitter';
import TreeSelectTreeItem from './sTree.vue';
export default {
	name: 'TreeSelect',
	mixins: [Emitter],
	components: {
		TreeSelectTreeItem
	},
	props: {
		value: {
			type: Array,
			default: () => []
		},
		data: {
			type: Array,
			default: () => []
		},
		loadData: Function,
		checkbox:{
			type:Boolean,
			default:true
		}
	},
	data() {
		return {
			isChangedByTree: true,
			isInit: true
		};
	},
	provide() {
		return {
			parent: this
		};
	},
	methods: {
		handleChange(selected) {
			if (!this.isChangedByTree) this.$emit('input', selected);
			this.isChangedByTree = false;
		},
		handleTreeCheck(selectedArray) {
			this.isChangedByTree = true;
			this.$emit('input', selectedArray.map(item => item.id));
		},
		handleClear() {
			this.$refs.select.reset();
		}
	}
};
</script>

<style lang="less">
.ivu-select-dropdown.ivu-select-multiple {
	padding: 0 6px;
}
</style>
