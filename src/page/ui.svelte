<script lang="ts">
  import { navigateTo } from "svelte-router-spa";
  import { onMount } from "svelte";
  import Layout from "../domains/layout/layout.svelte";
  import CardLocating from "../domains/track/card-locating.svelte";
import CardSending from "../domains/track/card-sending.svelte";
import CardDone from "../domains/track/card-done.svelte";
import CardError from "../domains/track/card-error.svelte";
  onMount(() => {});
</script>

<Layout title="Success">
  <button
    slot="header-left"
    on:click={() => navigateTo("/")}
    class="header-button">← Home</button
  >
  <div
    class="h-screen -mt-14 w-screen flex flex-col items-center justify-center dark:text-white font-bold text-lg"
  >
  <CardLocating />
  <CardSending />
  <CardDone />
  <CardError />
    
  </div>
</Layout>
