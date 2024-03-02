<script lang="ts">
  import { onMount } from "svelte";
  import Layout from "../domains/layout/layout.svelte";
  import {
    decodePayload,
    SenderPayload,
    sendToNomieAPI,
  } from "../services/sender";
  import { navigateTo } from "svelte-router-spa";
  import CardError from "../domains/track/card-error.svelte";
  import CardSending from "../domains/track/card-sending.svelte";
  import CardLocating from "../domains/track/card-locating.svelte";

  export let currentRoute;

  let payload: SenderPayload;
  let tracking: boolean = true;
  let success: boolean = false;
  let error: string | undefined = undefined;

  let currentView: string = "empty";

  onMount(() => {
    let key = currentRoute.namedParams.id;
    if (key && key.length > 10) {
      try {
        payload = decodePayload(key);
        if (payload.v) {
          doTrack();
        }
      } catch (e) {
        error = `Sorry, this tag is no longer valid`;
      }
    } else {
      error = `Sorry, this tag is no longer valid`;
    }
  });

  const doTrack = async () => {
    tracking = true;
    success = false;
    const post = await sendToNomieAPI(payload, (change) => {
      currentView = change;
    }).catch((e) => {
      error = `${e}`;
      currentView = "error";
    });
    if (post) {
      navigateTo(`/done/${currentRoute.namedParams.id}`);
    }
  };
</script>

<Layout title="Sending...">
  <div
    class="h-screen px-10 text-center -mt-14 w-screen flex flex-col items-center justify-center dark:text-white font-bold text-lg"
  >
    {#if !error}
      {#if tracking}
        {#if currentView == "locating"}
          <CardLocating />
        {:else if currentView == "sending"}
          <CardSending />
        {/if}
      {/if}
    {:else}
      <CardError message={error} />
      <button
        class="underline text-primary-500 mt-4 text-center"
        on:click={() => {
          window.location.href = "/";
        }}>Home</button
      >
    {/if}
  </div>
</Layout>
