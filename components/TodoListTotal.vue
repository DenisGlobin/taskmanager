<template>
    <tr>
        <td></td>
        <td>Всего затрачено времени</td>
        <td></td>
        <td>{{ getTotal() }}</td>
        <td></td>
      </tr>
</template>

<script>
export default {
	props: {
	    todos: {
	    	type: Array
	    }
	},
	data: function () {
		return {
		    totalElapsedTime: ''
		}
	},
	methods: {
		// Подсчитать суммарно затраченное время
		getTotal: function () {
		let seconds = 0
		let minutes = 0
		let hours = 0
		this.todos.forEach(function(item) {
			seconds += item.seconds
			if (seconds > 60) {
			    minutes++
			    seconds = seconds - 60
			}
			minutes += item.minutes
			if (minutes > 60) {
			    hours++
			    minutes = minutes - 60
			}
			hours += item.hours
		})
		this.totalElapsedTime = hours + ":" + minutes + ":" + seconds;
		return this.totalElapsedTime;
		}
	}
}
</script>