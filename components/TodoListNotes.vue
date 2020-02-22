<template>
  <div class="form-group">
    <label for="todoNotesTextarea"><strong>Примечания</strong></label>
    <textarea class="form-control" id="todoNotesTextarea" rows="6" v-model="notes"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    notes: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      message: ''
    }
  },
  updated: function () {
    this.$emit('add-notes', this.notes)
  }
}
</script>