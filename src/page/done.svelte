<script lang="ts">
  import { navigateTo } from "svelte-router-spa";
  import Layout from "../domains/layout/layout.svelte";

  import CardDone from "../domains/track/card-done.svelte";
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
    <CardDone />
  </div>
</Layout>
