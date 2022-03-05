<script lang="ts">
  import { goto } from '@roxi/routify';
</script>

<div class="container">
  <h1>Classes</h1>
  <div class="class-pics">
    <button class="class-button">
      <h2>Beginner's Classes</h2>
      <img
        src="https://enki.imgix.net/group.png?auto=format,compress"
        alt="group of people showing the backs of their hands and pointing at the rings they made during the class"
        on:click={$goto('./beginners')}
      />
    </button>
    <button class="class-button">
      <h2>Make each other's Wedding Rings</h2>
      <img
        src="https://enki.imgix.net/wedding.png?auto=format,compress"
        alt="somebody adjusting an engagement ring on someone's hand"
        on:click={$goto('./wedding-rings')}
      />
    </button>
    <div />
  </div>
</div>

<style>
  h1,
  h2 {
    text-align: center;
    font-family: 'WelcomeHome3 Regular';
  }

  .container {
    display: flex;
    min-height: 100vh;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    padding-top: 5%;
  }

  .class-pics {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 10%;
    justify-content: space-around;
    margin-bottom: 10%;
  }

  .class-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: none;
    background: none;
  }

  .class-button:hover {
    cursor: pointer;
  }

  .class-button > img {
    width: 100%;
    padding: 5px;
  }

  @media (min-width: 1280px) {
    .class-pics {
      flex-direction: row;
      width: 70%;
      margin-bottom: 2%;
    }
  }
</style>
