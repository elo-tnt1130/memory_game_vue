<template>
  <div class="card" :class="flippedStyles" @click="selectCard">
    <!-- delete the v-if which recreate the div each time  -->
    <div class="card-face is-front">
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
    <div class="card-face is-back">
      <img
        src="../../public/images/galaxy.jpg"
        alt="back of the card"
        class="img-fluid rounded"
      />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

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
    // add a flipping animation
    const flippedStyles = computed(() => {
      if (props.visible) {
        return "is-flipped";
      } else {
        return "";
      }
    });

    const selectCard = () => {
      context.emit("select-card", {
        position: props.position,
        faceValue: props.value,
      });
    };
    return { selectCard, flippedStyles };
  },
};
</script>

<style scoped>
.card {
  position: relative;
  /* set the time of transition */
  transition: 0.5s transform ease-in;
  /* to keep a 3D effect on the rotation */
  transform-style: preserve-3d;
}
.card.is-flipped {
  /* rotate the card on the vertical axis */
  transform: rotateY(180deg);
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  /* hide a face */
  backface-visibility: hidden;
}
.card-face.is-front {
  transform: rotateY(180deg);
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
