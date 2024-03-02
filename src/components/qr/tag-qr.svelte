<script lang="ts">
	import { EncryptionKey } from '../../domains/encryption/EncryptionStore';
  import { encodePayload, getTrackURL, SenderPayload } from "../../services/sender";
  import Qr from "./qr.svelte";

  export let payload: SenderPayload;
  export let size: string;
  let qrCodeURL: string;
  $: if (payload && $EncryptionKey) {
    qrCodeURL = getTrackURL(payload, $EncryptionKey)
  }
</script>

{#if qrCodeURL}
  <div class="qr-wrapper pt-2 px-2 pb-1 w-full flex flex-col items-center rounded-md bg-white overflow-hidden" {...$$restProps}>
    <Qr value={qrCodeURL} size={size} />
    <div class="qr-label text-xs font-bold text-center px-2 pb-1 mt-1 text-black line-clamp-1">{payload.note}</div>
  </div>
{/if}
