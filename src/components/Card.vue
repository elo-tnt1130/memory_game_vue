<template>
  <div class="card" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      {{ value }} - {{ matched }}
    </div>
    <div v-else class="card-face is-back">Back</div>
  </div>
</template>

<script>
export default {
  props: {
    // avec la fonction setup et le selectCard
    matched: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    const selectCard = () => {
      context.emit("select-card", {
        position: props.position,
        faceValue: props.value,
      });
    };
    return { selectCard };
  },
};
</script>

<style scoped>
.card {
  border: 5px solid #ccc;
}

.card-face {
  width: 100%;
  height: 100%;
  position: relative;
}

.card-face.is-front {
  background-color: aquamarine;
  color: #999;
}
.card-face.is-back {
  background-color: aqua;
  color: #999;
}
</style>
