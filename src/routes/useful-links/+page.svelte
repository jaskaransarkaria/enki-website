<script context="module">
  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;

  import loyalty from "$lib/assets/useful_link_loyalty.png";
  import insta from "$lib/assets/useful_link_insta.png";
  import fb from "$lib/assets/useful_link_fb.png";
</script>

<div>
  <a href="https://app.loyalty.dog/l/ywUwKafuu" target="_blank" rel="noreferrer"
    ><img
      src={loyalty}
      alt="join our loyalty scheme, colourful blue and orange circle"
    /></a
  >
  <a
    href="https://www.instagram.com/enkionline/?hl=en"
    target="_blank"
    rel="noreferrer"
  >
    <img
      src={insta}
      alt="find our instagram profile here, colourful blue and orange circle"
    />
  </a>
  <a
    href="https://www.facebook.com/Enki-1665334930147391"
    target="_blank"
    rel="noreferrer"
  >
    <img
      src={fb}
      alt="find our facebook page here, colourful blue and orange circle"
    />
  </a>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  a {
    width: 80%;
  }

  img {
    max-width: 100%;
  }

  @media (min-width: 600px) {
    a {
      width: 50%;
    }
  }

  @media (min-width: 960px) {
    a {
      width: 40%;
    }
  }

  @media (min-width: 1280px) {
    a {
      width: 30%;
    }
    div {
      height: calc(100vh - 75px);
    }
  }

  @media (min-width: 1400px) {
    a {
      width: 20%;
    }
  }

  @media (min-width: 1600px) {
  }

  @media (min-width: 1920px) {
  }

  @media (min-width: 2200px) {
  }
</style>
