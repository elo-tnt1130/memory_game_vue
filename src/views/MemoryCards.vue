<template>
  <div class="container-fluid my-3">
    <h1>Memory Cards Game</h1>

    <section class="game-board">
      <Card
        v-for="(card, index) in cardList"
        :key="`card-${index}`"
        :matched="card.matched"
        :value="card.value"
        :visible="card.visible"
        :position="card.position"
        @select-card="flipCard"
      />
    </section>
    <br />
    <h2>{{ userSelection }}</h2>
    <h2>{{ status }}</h2>

    <button @click="restartGame">Restart game</button>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import Card from "../components/Card";
import _ from "lodash";

export default {
  name: "memoryCards",
  components: {
    Card,
  },
  setup() {
    const userSelection = ref([]);
    const cardList = ref([]);
    const status = computed(() => {
      if (remainingPairs.value === 0) {
        return "Player wins!";
      } else {
        return `Remaining pairs: ${remainingPairs.value}`;
      }
    });

    // remainingPairs uses computed of card.vue with a callback function
    // en interne (transparent pour l'utilisateur)
    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(
        (card) => card.matched === false
      ).length;

      return remainingCards / 2;
    });

    // add a shuffle method
    const shuffleCards = () => {
      cardList.value = _.shuffle(cardList.value);
    };

    //to shuffle cards and track their position clicking on the button
    const restartGame = () => {
      shuffleCards();

      cardList.value = cardList.value.map((card, index) => {
        return {
          ...card,
          matched: false,
          position: index,
          visible: false,
        };
      });
    };

    //
    const cardItems = [1, 2, 3, 4, 5, 6, 7, 8];

    cardItems.forEach((item) => {
      // Push each item, in cardItems twice
      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
      });

      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
      });
    });

    cardList.value = cardList.value.map((card, index) => {
      return {
        ...card,
        position: index,
      };
    });

    // for (let i = 0; i < 16; i++) {
    //   cardList.value.push({
    //     // value: i,
    //     value: 8,
    //     visible: false,
    //     // visible: true,
    //     position: i,
    //     matched: false,
    //   });
    // };

    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true;
      if (userSelection.value[0]) {
        userSelection.value[1] = payload;
      } else {
        userSelection.value[0] = payload;
      }
    };

    watch(
      userSelection,
      (currentValue) => {
        console.log(currentValue);
        if (currentValue.length === 2) {
          const cardOne = currentValue[0];
          const cardTwo = currentValue[1];

          if (cardOne.faceValue === cardTwo.faceValue) {
            // status.value = "Matched !";
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
          } else {
            // status.value = "Mismatch !";
            // setTime to allow to see why it's false
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
            }, 2000);
          }

          userSelection.value.length = 0;
        }
      },
      { deep: true }
    );

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      shuffleCards,
      restartGame,
    };
  },
};
</script>

<style scoped>
#memoryCards {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1rem;
}

.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  justify-content: center;
}
</style>
