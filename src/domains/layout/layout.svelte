<script lang="ts">
  import { EncryptionKey } from "../encryption/EncryptionStore";
  import { deleteEncryptionKey } from "../encryption/EncryptionStore";

  export let title: string | undefined = undefined;
</script>

<header
  class="sticky print-hide top-0 w-full h-14 px-4 items-center bg-white dark:bg-black flex items-center dark:text-white z-50"
>
  <div
    class="wrapper max-w-screen-xl items-center w-full mx-auto grid grid-cols-12"
  >
    <div class="col-span-2"><slot name="header-left" /></div>
    {#if title}
      <h1 class="col-span-8 text-center line-clamp-1 font-bold">
        {title}
      </h1>
    {:else}
      <div class="col-span-8 flex items-center justify-center">
        <img
          class="block"
          src="/DN-header.png" 
          style="height:28px"
          alt="logo"
        />
      </div>
    {/if}
    <div class="col-span-2 flex items-center justify-end">
      <slot name="header-right" />
    </div>
  </div>
</header>
<main
  class="dark:bg-black dark:text-white z-0"
  style="min-height:calc(100vh - 200px)"
>
  <slot />
</main>
<footer class="px-4 py-6">
  {#if $EncryptionKey}
    <div class="flex print-hide  items-center w-full justify-center mb-4">
      <div
        class="pill green"
      >
        <span>Passcode Unlocked</span>
        <button
          class="underline font-bold"
          on:click={() => {
            deleteEncryptionKey();
          }}>Lock</button
        >
      </div>
    </div>
  {/if}
  <div class=" print-hide disclaimer mx-auto max-w-md text-center text-xs">
    <p class="dark:text-white">
      <strong>Disclaimer</strong>
      Your passcode is used to encrypt your API key and Note inside of a QR Code.
      While it is more secure, it's best to not share this QR Code with
      anyone.
    </p>
    <p class="mt-2 text-gray-600 dark:text-gray-400">
      - {new Date().getFullYear()} -
      <a
        class="text-primary-500 underline"
        href="https://www.dailynomie.com"
        title="Daily Nomie">DailyNomie</a
      >
    </p>
  </div>
</footer>
