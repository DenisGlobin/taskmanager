<template>
	<tr>
        <th scope="row">{{ id + 1 }}</th>
        <td>{{ task }}</td>
        <td>
        	<button v-if="active" v-on:click="$emit('pause', id)">Пауза</button>
        	<button v-else v-on:click="$emit('start', id)">Старт</button>
        </td>
        <td>{{ elapsed }}</td>
        <td>
        	<button v-on:click="$emit('remove')">Удалить</button>
        </td>
  	</tr>
</template>

<script>
	export default {
		props: ['id', 'task', 'elapsed', 'active']
	}
</script>