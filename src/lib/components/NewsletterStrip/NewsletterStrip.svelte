<script lang="ts">
  import { MAILCHIMP_SUBSCRIBE_URL } from "#lib/constants.js";

  interface Props {
    title: string;
    text: string;
  }

  let { title, text }: Props = $props();

  let email = $state("");
  let signedUp = $state(false);

  const onsubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("EMAIL", email);
    await fetch(MAILCHIMP_SUBSCRIBE_URL, {
      method: "post",
      body: formData,
      mode: "no-cors",
    });
    signedUp = true;
  };
</script>

<section class="newsletter" aria-labelledby="newsletter-title">
  <h2 id="newsletter-title">{title}</h2>
  <p>{text}</p>
  {#if signedUp}
    <p class="form-success" role="status">
      Thanks, you're on the list. Look out for our next newsletter.
    </p>
  {:else}
    <form {onsubmit}>
      <div class="field">
        <label for="newsletter-email">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          name="EMAIL"
          placeholder="you@example.com"
          autocomplete="email"
          required
          bind:value={email}
        />
      </div>
      <!-- real people should not fill this in - do not remove, it stops bot signups -->
      <div class="honeypot" aria-hidden="true">
        <input
          type="text"
          name="b_e1b4cd47e0fcd668196954f5e_8e91d212c7"
          tabindex="-1"
          value=""
        />
      </div>
      <button class="btn" type="submit">Sign up</button>
    </form>
  {/if}
</section>

<style>
  .newsletter {
    max-width: 34rem;
    margin: 4.5rem auto 0;
    text-align: center;
  }

  form {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: center;
    gap: 0.6rem;
    text-align: left;
  }

  .field {
    flex: 1 1 16rem;
  }

  .honeypot {
    position: absolute;
    left: -5000px;
  }
</style>
