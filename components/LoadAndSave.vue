<template>
	<div id="load-and-save">
		<input type="text" id="todoTitles" name="todoTitles" list="titlesList" v-model="selectedTitle" v-on:input="$emit('load-list', $event.target.value)" placeholder="Загрузить список задач">
		<datalist id="titlesList">
  		<option 
  			v-for="title in titles"
  			v-bind:key="title"
  			v-bind:value="title"
  		>{{ title }}</option>
		</datalist>
		<button v-on:click="saveProject" class="btn btn-primary">Сохранить список</button>
		<button v-on:click="deleteProject" class="btn btn-danger">Удалить список</button>
    </div>
</template>

<script>
export default {
	props: {
	    name: {
	    	type: String,
	    	required: true
	    },
	    todos: {
    		type: Array
    	}
	},
	data: function () {
		return {
	    selectedTitle: '',
	    titles: []
		}
	},
	mounted: function () {
		// Подгрузить список сохранённых задач
		if (localStorage.length > 0) {
			for (let i = 0; i < localStorage.length; i++) {
				this.titles.push(localStorage.key(i))
			}
		}
	},
	methods: {
		// Сохранить текущий список задач
		saveProject: function () {
			const parsed = JSON.stringify(this.todos)
			localStorage.setItem(this.name, parsed)
      this.$notify('Список сохранён','success')
		},
		// Удалить текущий список задач
		deleteProject: function () {
      let vm = this
      vm.$confirm('Подтверждение удаления', 'Вы действительно хотите удалить этот список?', 
        function() {
          localStorage.removeItem(vm.name)
          document.location.reload(true)
          //Object.assign(vm.$data, vm.$options.data.call(vm))
          //vm.$notify('Список удалён','success')
        }, 
        function() { 
          vm.$notify('Действие отменено','error')
        }
      )
		}
	}
}
</script>