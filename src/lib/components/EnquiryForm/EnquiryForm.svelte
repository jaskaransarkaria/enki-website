<script lang="ts">
  import type { Snippet } from "svelte";
  import { PUBLIC_SERVER_URL } from "$app/env/public";

  interface Props {
    /** Address the enquiry is sent to. */
    to: string;
    /** Email subject line. */
    subject: string;
    /** Optional line added to the end of the email body. */
    footer?: string;
    submitLabel?: string;
    /** Number of columns on wider screens. */
    columns?: number;
    children: Snippet;
  }

  let {
    to,
    subject,
    footer,
    submitLabel = "Send enquiry",
    columns = 3,
    children,
  }: Props = $props();

  let sent = $state(false);
  let sending = $state(false);
  let error = $state("");

  const onsubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    const fd = new FormData(form);
    fd.append("to", to);
    fd.append("subject", subject);
    if (footer) fd.append("footer", footer);

    sending = true;
    error = "";
    sent = false;
    try {
      const res = await fetch(`${PUBLIC_SERVER_URL}/api/enquiry`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      sent = true;
    } catch (e) {
      error =
        e instanceof Error
          ? e.message
          : "Could not send your enquiry. Please email us directly.";
    } finally {
      sending = false;
    }
  };
</script>

<form {onsubmit}>
  <div class="form-grid" style:--cols={columns}>
    {@render children()}
  </div>
  <div class="form-actions">
    <button class="btn" type="submit" disabled={sending}>
      {#if sending}
        Sending…
      {:else}
        {submitLabel}
      {/if}
    </button>
    {#if sent}
      <p class="form-success" role="status">
        Thank you — your enquiry has been sent. We'll get back to you soon.
      </p>
    {:else if error}
      <p class="form-error" role="alert">
        {error}
        {#if to}
          You can also email us at <a href={`mailto:${to}`}>{to}</a>.
        {/if}
      </p>
    {/if}
  </div>
</form>

<style>
  .form-success {
    color: var(--enki-mint, #2e8b57);
    margin-top: 0.75rem;
    font-size: 0.95rem;
  }

  .form-error {
    color: #c00;
    margin-top: 0.75rem;
    font-size: 0.95rem;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
