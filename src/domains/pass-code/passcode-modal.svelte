<script lang="ts">
  import { CanNFC } from "../nfc/CanNFCStore";
  import { getTrackURL } from "../../services/sender";
  import type { SenderPayload } from "../../services/sender";
  import TagQr from "../../components/qr/tag-qr.svelte";
  import copy from "../../services/copy";
  import { showToast } from "../toast/ToastStore";
import { setEncryptionKey } from "../encryption/EncryptionStore";
import { closeModal } from "../../components/modal/ModalStore";

  let key:undefined|string = undefined;

  let isValid: boolean = false;

  $: if(key) {
    isValid = key.length === 6 ? true : false;
  }

  const saveKey = ()=>{
    if(key.length == 6) {
      setEncryptionKey(key);
      showToast({message:'🔐 Key set'})
      closeModal('passcode');
    } else {
      showToast({message:'Try again'})
    }
  }

</script>

<header
  class="grid grid-cols-12 items-center py-2 px-4 shadow-md bg-white dark:bg-black dark:text-white"
>
  <!-- <button class="col-span-2 text-blue-500" on:click={() => {}}
    >Close</button
  > -->
  <h1 class="col-span-12 text-center font-bold">Passcode</h1>
</header>
<main class="p-4 bg-gray-100 dark:bg-gray-800">
  <p class="max-w-xs mx-auto text-center text-sm text-gray-500">
    <strong>Enter a Passcode</strong>, this is used to encrypt and decrypt your QR and NFC Codes.
  </p>
  <form class="list solo" on:submit={(evt)=>{
    evt.stopPropagation();
    evt.preventDefault();
    saveKey();
  }}>
    <input bind:value={key} autofocus
      type="tel" inputmode="numeric" required 
      maxlength="6" minlength="6" style="letter-spacing: 1.2rem" placeholder="••••••" 
      class="font-mono key-input {isValid ? 'valid' : 'invalid'}"/>
    <hr />
    
    <button 
      type="submit"
      class="text-center disabled:opacity-30 text-lg py-3 text-primary-500 w-full" 
      disabled={!isValid}>
      Save Passcode →
    </button>
  </form>
</main>

<style lang="postcss">
  .key-input {
    @apply w-full text-center px-4 py-1 text-4xl;
    @apply rounded-t-lg;
    @apply dark:bg-black dark:text-white;
  }

  .key-input:focus {
    @apply outline-none;
    @apply ring ring-primary-500;
  }
  .key-input.valid,
  .key-input.valid:focus {
    @apply ring ring-green-500;
  }
  .key-input.invalid,
  .key-input.invalid:focus {
    @apply ring ring-red-500;
  }
</style>