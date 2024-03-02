<script lang="ts">
	import { EncryptionKey } from '../encryption/EncryptionStore';
	
	import { writeNFC } from './../nfc/CanNFCStore';
  import { CanNFC } from "../nfc/CanNFCStore";
  import { getTrackURL } from "../../services/sender";
  import type { SenderPayload } from "../../services/sender";
  import { closeQR } from "./TagModals";
  import TagQr from "../../components/qr/tag-qr.svelte";
  import copy from "../../services/copy";
  import { showToast } from "../toast/ToastStore";

  export let payload: SenderPayload;

  const copyURL = () => {
    const trackUrl = getTrackURL(payload, $EncryptionKey);
    let copied = copy(trackUrl);
    if (copied) {
      showToast({ message: "Tracking URL copied" });
    }
  };

  const _writeToNFC = async ()=>{
    let wrote = await writeNFC(payload).catch(e=>{
      showToast({ message:`${e}`});
    })
    if(wrote) {
      showToast({ message: "🎉 Tracking URL written to NFC" });
    } else {
      showToast({ message: '😤 Could not write to NFC Tag'})
    }
  }
</script>

<header
  class="grid grid-cols-12 items-center py-2 px-4 shadow-md bg-white dark:bg-black dark:text-white"
>
  <button class="col-span-2 header-button" on:click={() => closeQR()}
    >Close</button
  >
  <h1 class="col-span-8 text-center font-bold">Tag</h1>
</header>
<main class=" rounded-b-lg bg-gray-100 pt-6 dark:bg-gray-800">
  {#if payload}
    
      <div class="pt-2 bg-white"><TagQr {payload} size="70%" /></div>
    
  {/if}
  <div class="px-4 py-1">
    <div class="list solo">
      <button class="list-item text-primary" on:click={() => copyURL()}
        >Copy Tracking URL</button
      >
      <button disabled={!$CanNFC}
        
        class="list-item flex justify-between text-primary"
        on:click={() => _writeToNFC()}>
        <span>Write to NFC</span>
        <span class="text-gray-500">{$CanNFC ? "" : "Not Supported"}</span>
        
        </button
      >
      <!-- disabled={!$CanNFC} -->
    </div>
  </div>
</main>
