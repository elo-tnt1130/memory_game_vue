<template>
  <div class="card" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      <img
        :src="`/images/${value}.jpg`"
        :alt="value"
        class="img-fluid rounded"
      />
      <img
        src="/images/check-mark-svgrepo-com.svg"
        alt=""
        v-if="matched"
        class="checkmark w-25 me-1 mb-1"
      />
    </div>
    <div v-else class="card-face is-back">
      <img
        src="../../public/images/galaxy.jpg"
        alt="back of the card"
        class="img-fluid rounded"
      />
    </div>
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
      type: String,
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
/* .card {
  border: 5px solid #ccc;
} */

.card-face {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-face.is-back {
  background-image: url("/images/galaxy.jpg");
}

.checkmark {
  height: 1.5rem;
  position: absolute;
  right: 0;
  bottom: 0;
}

img {
  /* border-radius: 10px; */
  height: 125px;
  width: 185px;
}
</style>
