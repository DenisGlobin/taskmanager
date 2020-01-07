<template>
	<div>
		<label for="new-todo"><strong>Добавить задачу</strong></label>
		<input
			id="new-todo"
			type="text"
			class="input"
			:value="value"
			v-on="listeners"
		>
	</div>
</template>

<script>
export default {
	props: {
	    value: {
	    	type: String,
	    	default: '',
	    }
	},
	computed: {
	    listeners () {
			var vm = this
			// `Object.assign` объединяет объекты вместе, чтобы получить новый объект
			return Object.assign({},
			// Мы добавляем все слушатели из родителя
			this.$listeners,
			// Затем мы можем добавить собственные слушатели или
			// перезаписать поведение некоторых существующих.
			{
			  // Это обеспечит, что будет работать v-model на компоненте
				input: function (event) {
					vm.$emit('input', event.target.value)
				}
			})
	    }
	}
}
</script>

<style>

.input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid $vue-blue;
}
</style>