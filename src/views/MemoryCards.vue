<template>
  <div class="container-fluid my-3" id="memory-game">
    <h1 class="mb-3 text-warning">Memory Cards Game</h1>

    <section class="mb-2 text-muted">
      <p>
        A card matching game powered by Vue.js 3
        <br />
        <span class="text-danger">
          Click on "start the game" to begin to play !
        </span>
      </p>
    </section>

    <!-- transform the section in transition group and add a tag to allow animation for shuffle cards -->
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
    <h2 class="text-info">{{ status }}</h2>

    <button
      v-if="newPlayer"
      @click="startGame"
      class="mt-3 btn btn-outline-warning px-4 py-3 restart"
    >
      Start game
    </button>

    <button
      v-else
      @click="restartGame"
      class="mt-3 btn btn-outline-info px-4 py-3 restart"
    >
      Restart game
    </button>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import Card from "../components/Card";
import _ from "lodash";
import { launchConfetti } from "../utilities/confetti";

export default {
  name: "memoryCards",
  components: {
    Card,
  },

  setup() {
    const userSelection = ref([]);
    const cardList = ref([]);
    const newPlayer = ref(true);

    const startGame = () => {
      newPlayer.value = false;
      restartGame();
    };

    // pour savoir où en est le jeu
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

    //the images in the hidden side of cards
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

    //to flip cards (only once)
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

    //if the player ends the game, launch confetti
    watch(remainingPairs, (currentValue) => {
      if (currentValue === 0) {
        launchConfetti();
      }
    });

    //to know if it's a matching pair or not
    watch(
      userSelection,
      (currentValue) => {
        console.log(currentValue);
        // if the array counts 2 elements
        if (currentValue.length === 2) {
          const cardOne = currentValue[0];
          const cardTwo = currentValue[1];

          //it compares them and gives the result
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

    //to expose the const
    return {
      startGame,
      newPlayer,
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

p,
.restart {
  font-size: 1.25rem;
}

.shuffle-cards {
  transition: transform 0.8s ease-in;
}
</style>
