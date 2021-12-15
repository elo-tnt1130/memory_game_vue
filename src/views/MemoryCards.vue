<template>
  <div class="container-fluid my-3" id="memory-game">
    <h1 class="mb-3">Memory Cards Game</h1>

    <!-- transform the section in transition gropu and add a tag to allow animation for suffle cards -->
    <transition-group tag="section" name="shuffle-cards" class="game-board">
      <!-- unique key needed to allow to shuffle cards -->
      <Card
        v-for="card in cardList"
        :key="`${card.value}-${card.variant}`"
        :matched="card.matched"
        :value="card.value"
        :visible="card.visible"
        :position="card.position"
        @select-card="flipCard"
      />
    </transition-group>
    <br />
    <!-- <h2>{{ userSelection }}</h2> -->
    <h2>{{ status }}</h2>

    <button @click="restartGame" class="btn btn-outline-info">
      Restart game
    </button>
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
    const cardItems = [
      // "nature",
      "african-desert",
      "camping",
      "nature2",
      "winter",
      "northern-lights",
      // "spring-field",
      "iced-lake",
      "sunset-lake",
      "usa-desert",
    ];

    cardItems.forEach((item) => {
      // Push each item, in cardItems twice
      cardList.value.push({
        value: item,
        // add variant to create a unique key for suffle cards
        variant: 1,
        visible: false,
        position: null,
        matched: false,
      });

      cardList.value.push({
        value: item,
        variant: 2,
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
        // avoid that a user could select twice the same card
        if (
          userSelection.value[0].position === payload.position &&
          userSelection.value[0].faceValue === payload.faceValue
        ) {
          return;
        } else {
          userSelection.value[1] = payload;
        }
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
  height: 100vh;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 180px);
  grid-template-rows: repeat(4, 120px);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  justify-content: center;
}

.shuffle-cards {
  transition: transform 0.8s ease-in;
}
</style>
