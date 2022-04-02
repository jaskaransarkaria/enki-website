<script context="module">
  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<script lang="ts">
  import { fade } from "svelte/transition";
</script>

<svelte:head>
  <meta property="og:url" content="https://enkionline.com/about" />
</svelte:head>

<div class="container">
  <div class="shop-pics">
    <img
      in:fade={{ duration: 600 }}
      src="https://enki.imgix.net/left_enki.jpg?auto=format,compress&q=1"
      alt="a rectangular wooden display inside the shop"
    />
    <img
      in:fade={{ duration: 600 }}
      class="center-image"
      src="https://enki.imgix.net/about_shop_1.jpg?auto=format,compress&q=1"
      alt="the shop front and it's window display"
    />
    <img
      in:fade={{ duration: 600 }}
      src="https://enki.imgix.net/right_enki.png?auto=format,compress&q=1"
      alt="a wooden jeweller's work bench inside the shop"
    />
  </div>
  <p class="about-shop">
    Enki is a unique gift shop and fully functioning jewellers workshop. We
    repair all types of jewellery onsite and also teach group and private
    jewellery classes. The Kings Heath store shows the work of many independent
    crafts people who have become almost invisible on the high street today.
    From baby clothes to pottery, jewellery to cushions, we have just the gift
    you're looking for. <br /><br />We also sell beautiful and unique cards and
    wrapping paper to make your present that bit more special.
  </p>
  <h2>Meet the team</h2>
  <div class="employee-cards">
    <div class="card">
      <img
        in:fade={{ duration: 600 }}
        src="https://enki.imgix.net/faith.png?auto=format,compress"
        alt="shop owner faith"
      />
      <p>
        Faith started Enki in 2017 in a small shop round the corner from the
        current location. She is a jeweller with over ten years of experience
        who specialises in repairing antique jewellery. She also loves to read
        and cook. She has a dog called Dodi who sometimes joins her at work! You
        can find her at Enki from Tuesday to Friday.
      </p>
    </div>
    <div class="card">
      <img
        in:fade={{ duration: 600 }}
        src="https://enki.imgix.net/dora.png?auto=format,compress"
        alt="shop owner faith"
      />
      <p>
        Dora joined Enki in 2018 and has been learning jewellery making ever
        since, she’s always been a crafter and can do amazing things with beads!
        She comes from Germany but has been in Brum for the last six years. You
        can find her at Enki Wednesday to Saturday and every other Sunday.
      </p>
    </div>
    <div class="card">
      <img
        in:fade={{ duration: 600 }}
        src="https://enki.imgix.net/ash.png?auto=format,compress"
        alt="shop owner faith"
      />
      <p>
        Ash Joined Enki in 2021, he’s a web developer who dabbles in photography
        among other things!
      </p>
    </div>
  </div>
</div>

<style>
  h2 {
    text-align: center;
    font-family: "WelcomeHome3 Regular";
  }

  .container {
    display: flex;
    min-height: 100vh;
    width: 100vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .shop-pics {
    display: flex;
    flex-direction: row;
    height: 10%;
    width: 70%;
    align-self: center;
    justify-content: center;
  }

  .shop-pics > * {
    width: 30%;
    padding: 5px;
  }

  .center-image {
    width: 60%;
  }

  .about-shop {
    width: 90%;
  }

  p {
    align-self: center;
    text-align: center;
    font-family: "Caviar Dreams";
  }

  .employee-cards {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 30px;
  }

  .card {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card > p {
    justify-content: flex-start;
    vertical-align: top;
  }

  .card > img {
    height: 60%;
    width: 70%;
  }

  @media (min-width: 960px) {
    .employee-cards {
      width: 70%;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    }
  }
</style>
