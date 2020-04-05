<template>
	<tr>
        <th scope="row">{{ id + 1 }}</th>
        <td>{{ task }}</td>
        <td align="center">
        	<button class="btn btn-outline-secondary" v-if="active" v-on:click="$emit('pause', id)">
        		<span class="glyphicon glyphicon-pause" aria-hidden="true"></span>
        	</button>
        	<button class="btn btn-outline-secondary" v-else v-on:click="$emit('start', id)">
        		<span class="glyphicon glyphicon-play" aria-hidden="true"></span>
        	</button>
        </td>
        <td align="center">{{ elapsed }}</td>
        <td>
        	<button class="btn btn-primary" data-toggle="modal" v-on:click="$emit('edit', id, task)">
        		<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
        	</button>
        </td>
        <td>
        	<button class="btn btn-danger" v-on:click="$emit('remove')">
				<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
        	</button>
        </td>
  	</tr>
</template>

<script>
	export default {
		props: {
			id: {
				type: Number
			},
			task: {
				type: String,
				required: true
			},
			elapsed: {
				type: String,
				default: '0:0:0'
			},
			active: {
				type: Boolean
			}
		}
	}
</script>