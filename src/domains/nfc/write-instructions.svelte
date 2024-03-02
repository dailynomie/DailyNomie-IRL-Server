<script lang="ts">

import { closeModal } from "../../components/modal/ModalStore";

</script>
<div class="write card px-5 pt-5 pb-3" style="max-width:300px;">
  <h1 class="font-extrabold text-xl leading-tight mb-4">Waiting for Chip...</h1>
  <p>Hold your NFC chip close to the back of your device. Depending on your phone it might be towards the top or the bottom.</p>
  <button on:click={()=>closeModal('nfc-writer')} class="header-button -ml-2 mt-4">Cancel</button>
</div>