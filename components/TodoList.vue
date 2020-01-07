<template>
	<div>
		<div>
			<!-- Компонент заголовка списка задач -->
			<TodoTitle
				v-model="title"
				placeholder="Чем бы себя занять"
				@keydown.enter="editTitle"
			/>
			<br>
			<!-- Таблица со списком задач -->
			<table class="table">
				<thead class="thead-light">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Задача</th>
						<th scope="col">Запустить/Остановить</th>
						<th scope="col">Затрачено</th>
					  	<th scope="col">Удалить</th>
					</tr>
				</thead>
				<tbody>
					<!-- Компонент перечня задач -->
					<TodoListItem
				        v-for="(todo, index) in todos"
				        v-bind:key="todo.id"
				        v-bind:id="index"
				        v-bind:task="todo.task"
				        v-bind:elapsed="todo.elapsed"
				        v-bind:active="isActive(index)"
				        v-on:remove="todos.splice(index, 1)"
				        v-on:start="startTimer"
				        v-on:pause="pauseTimer"
				        v-bind:class="{ 'table-active': isActive(index) }"
		          	/>
		          	<!-- Компонент подсчитывающий общее затраченное время -->
		          	<TodoListTotal
						v-bind:todos="todos"
		          	/>
				</tbody>
			</table>
			<!-- Компонет для добавления новой задачи -->
			<AddNewTodoListItem
				v-model="newTodoText"
				placeholder="Новая задача"
				@keydown.enter="addTodo"
			/>
		</div>
		<br><hr>
		<!-- Кнопки для сохранения и загрузки списка задач -->
		<LoadAndSave
			v-bind:name="title"
			v-bind:todos="todos"
			v-on:load-list="loadProject"
		/>
	</div>
</template>

<script>
import TodoTitle from './TodoTitle.vue'
import TodoListItem from './TodoListItem.vue'
import AddNewTodoListItem from './AddNewTodoListItem.vue'
import TodoListTotal from './TodoListTotal.vue'
import LoadAndSave from './LoadAndSave.vue'

export default {
	components: {
		TodoTitle,
		AddNewTodoListItem,
		TodoListItem,
		TodoListTotal,
		LoadAndSave
	},
	data () {
		return {
			title: 'Дефолтное название',
			newTodoText: '',
		    todos: [],
		    nextTodoId: 1,
		    interval: null,
		    totalElapsedTime: 0,
		    activeId: null
		}
	},
	methods: {
		// Добавление новой задачи
		addTodo: function () {
			const trimmedText = this.newTodoText.trim()
			if (trimmedText) {
				this.todos.push({
					id: this.nextTodoId++,
					task: trimmedText,
					elapsed: '',
	        		hours: 0,
	        		minutes: 0,
	        		seconds: 0
				})
				this.newTodoText = ''
			}
		},
		// Редактирование текста заголовка
		editTitle: function () {
			const trimmedTitle = this.title.trim()
			if (trimmedText) {
				this.title = trimmedTitle
			}
		},
		// Запустить таймер для задачи
	    startTimer: function (id) {
	      if (this.interval != null) {
	        this.pauseTimer(id)
	      }
	      this.interval = setInterval(() => {
	        this.todos[id].seconds++
	        if ((this.todos[id].seconds > 0) && (this.todos[id].seconds % 60 == 0)) {
	          this.todos[id].minutes++
	          this.todos[id].seconds = 0
	        }
	        if ((this.todos[id].minutes > 0) && (this.todos[id].minutes % 60 == 0)) {
	          this.todos[id].hours++
	          this.todos[id].minutes = 0
	        }
	        this.todos[id].elapsed = this.todos[id].hours + ":" + this.todos[id].minutes + ":" + this.todos[id].seconds
	        this.activeId = id
	      }, 1000)
	    },
	    // Остановить таймер
	    pauseTimer: function (id) {
	      clearInterval(this.interval)
	      this.activeId = null
	    },
	    // Проверить запущен ли таймер на данной задаче
	    isActive: function (id) {
	      if (this.activeId === id) {
	        return true
	      }
	      return false
	    },
	    // Загрузить сохранённый список задач
	    loadProject: function (selectedTitle) {
			if (localStorage.getItem(selectedTitle)) {
				try {
					this.todos = JSON.parse(localStorage.getItem(selectedTitle))
					this.title = selectedTitle
				} catch(e) {
					localStorage.removeItem(selectedTitle);
				}
			}
		},
	}
}
</script>