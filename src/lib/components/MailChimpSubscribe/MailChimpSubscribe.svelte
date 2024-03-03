<script lang="ts">
  export let onSignupFn = (email) => {};

  let mcEmailInput = "";
  let mcForm: HTMLFormElement;
</script>

<!-- Begin Mailchimp Signup Form -->

<div id="mc_embed_signup">
  <form
    action="https://enkionline.us7.list-manage.com/subscribe/post?u=e1b4cd47e0fcd668196954f5e&amp;id=8e91d212c7"
    method="post"
    id="mc-embedded-subscribe-form"
    name="mc-embedded-subscribe-form"
    class="validate"
    novalidate
    bind:this={mcForm}
    on:submit={async () => {
      onSignupFn(mcEmailInput);
      mcForm.submit();
      setTimeout(() => {
        window.open(
          "https://enkionline.us7.list-manage.com/subscribe/post?u=e1b4cd47e0fcd668196954f5e&amp;id=8e91d212c7",
          "_blank"
        );
      }, 800);
    }}
  >
    <div id="mc_embed_signup_scroll">
      <input
        type="email"
        name="EMAIL"
        class="email"
        id="mce-EMAIL"
        placeholder="email address"
        required
        bind:value={mcEmailInput}
      />
      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
      <div style="position: absolute; left: -5000px;" aria-hidden="true">
        <input
          type="text"
          name="b_e1b4cd47e0fcd668196954f5e_8e91d212c7"
          tabindex="-1"
          value=""
        />
      </div>
      <div class="clear foot">
        <input
          type="submit"
          value="Subscribe"
          name="subscribe"
          id="mc-embedded-subscribe"
          class="button"
        />
      </div>
    </div>
  </form>
</div>

<!--End mc_embed_signup-->
<style>
  #mc_embed_signup {
    background: #fff;
    clear: left;
    font: 14px Helvetica, Arial, sans-serif;
    width: 100%;
  }
</style>
