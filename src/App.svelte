<script lang="ts">
	import { ModalStore } from './components/modal/ModalStore';
  import { QrModalStore, showEditor } from "./domains/tag-creator/TagModals";
  import { EditorModalStore } from "./domains/tag-creator/TagModals";
  import Modal from "./components/modal/modal.svelte";

  import TagEditor from "./domains/tag-creator/tag-editor.svelte";
  import TailwindCss from "./TailwindCSS.svelte";
  import { Router } from "svelte-router-spa";
  import { routes } from "./routes";
  import TagQrcodeModal from "./domains/tag-creator/tag-qrcode-modal.svelte";
import Toasts from "./domains/toast/toasts.svelte";
import { onMount } from 'svelte';
import { EncryptionKey, initEncryption } from './domains/encryption/EncryptionStore';
import { EncryptedStorage } from './domains/encryption/encryptedLocalStorage';
import type { SenderPayload } from './services/sender';

  let view = "create";

  let payloadFromIframe: SenderPayload;

  $: if($EncryptionKey) {
    EncryptedStorage.init($EncryptionKey).catch(e=>{}).then(()=>{
      if(payloadFromIframe) {
        setTimeout(()=>{
          showEditor(payloadFromIframe)
        },300);
      }
    });
  }

  const messageCaptured = (_payload)=>{
    let payload = {
      key: _payload.key, 
      note: _payload.note, 
      geo: false,
      v: 'n6'
    };
    
    if(payload.key && payload.note && $EncryptionKey) {
      showEditor(payload);
    } else {
      payloadFromIframe = payload;
    }
  }

  onMount(()=>{
    initEncryption();

    window.addEventListener('message', (evt)=>{
      let payload = evt.data;
      messageCaptured(payload)
    })

  })

 

</script>

<TailwindCss />

{#each $ModalStore as modal}
<Modal visible={true}>
  <svelte:component this={modal.component} {...modal.props || {}} />
</Modal>
{/each}

<!-- <Modal visible={$EditorModalStore ? true : false}>
  <TagEditor payload={$EditorModalStore} />
</Modal>

<Modal visible={$QrModalStore ? true : false}>
  <TagQrcodeModal payload={$QrModalStore} />
</Modal> -->



<Toasts />
{#if $EncryptionKey}
<Router {routes} />
{:else}
  
{/if}

<style global lang="postcss">
  .filler {
    @apply flex-grow flex-shrink max-w-full min-w-0 max-h-full min-h-0;
  }
  body {
    @apply bg-white dark:bg-black;
  }

  @media print {
    body {
      /* -webkit-print-color-adjust: exact; */
    }
    .print-hide {
      display:none;
    }
  }

  button {
    @apply transition-all duration-100;
  }
  button:active {
    @apply scale-90;
  }

  .header-button {
    @apply py-2 px-2;
    @apply rounded-md;
    @apply text-primary-500 dark:text-primary-400;
    @apply whitespace-nowrap;
  }
  .flex-center {
    @apply text-center flex items-center justify-center;
  }

  .card {
    @apply bg-white;
    @apply rounded-lg;
    @apply shadow-lg;
    @apply overflow-hidden;
  }

  .text-primary {
    @apply text-primary-500 dark:text-primary-400;
  }

  .pill {
    @apply flex items-center space-x-2 rounded-full py-1 px-4  font-medium;
  }
  .pill.green {
    @apply bg-green-500 bg-opacity-80 text-white;
    @apply dark:text-black dark:bg-opacity-100;
  }

  .status-card {
    @apply z-10;
  }

</style>
