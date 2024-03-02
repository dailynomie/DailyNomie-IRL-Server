<script lang="ts">
	import { EncryptionKey } from '../domains/encryption/EncryptionStore';
  
  import { onMount } from "svelte";
  import Layout from "../domains/layout/layout.svelte";
  import {

    SenderPayload,
    sendToNomieAPI,
  } from "../services/sender";
  import { navigateTo } from "svelte-router-spa";
  import CardError from "../domains/track/card-error.svelte";
  import CardSending from "../domains/track/card-sending.svelte";
  import CardLocating from "../domains/track/card-locating.svelte";
  import { decryptObject } from "../services/encrypt";

  export let currentRoute;

  let payload: SenderPayload;
  let tracking: boolean = true;
  let success: boolean = false;
  let error: string | undefined = undefined;

  let currentView: string = "empty";

  let mounted: boolean = false;
  let initialized: boolean = false;

  $: if (!initialized && mounted && $EncryptionKey) {
    initalize();
  }

  const initalize = async () => {
    console.log({currentRoute});
    let trackStr = currentRoute.queryParams.k;
    if (trackStr && trackStr.length > 10) {
      try {
        console.log({ trackStr });
        payload = decryptObject(trackStr, $EncryptionKey);
        console.log("Payload", payload);
        if (payload.v) {
          doTrack();
        }
      } catch (e) {
        console.error(e);

        error = `Unable to decrypt your data. Is your Passcode Correct?`;
      }
    } else {
      error = `Sorry, this tag is no longer valid`;
    }
    initialized = true;
  };

  onMount(() => {
    mounted = true;
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
      navigateTo(`/done`);
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
