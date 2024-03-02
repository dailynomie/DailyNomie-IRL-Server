<script lang="ts">
	import { InvalidKey, openPasscodeModal } from './../encryption/EncryptionStore';
  import { EncryptionKey } from "./../encryption/EncryptionStore";
  import { liveQuery } from "dexie";
  import { run } from "svelte/internal";
  import Modal from "../../components/modal/modal.svelte";
  import Qr from "../../components/qr/qr.svelte";
  import TagQr from "../../components/qr/tag-qr.svelte";
  import { db } from "../../services/database";
  import { decryptObject } from "../../services/encrypt";
  import { encodePayload, SenderPayload } from "../../services/sender";
  import TagEditor from "./tag-editor.svelte";
  import TagQrcodeModal from "./tag-qrcode-modal.svelte";
  import { createNewTag, showEditor, showQR } from "./TagModals";

  let myTags = liveQuery(() => db.tags.toArray());

  const run = async (payload: SenderPayload): Promise<any> => {
    const str = encodePayload(payload);
    console.log({ running: payload, str });
  };

  let printingTag: SenderPayload;

  function printTag(tag: SenderPayload) {
    printingTag = tag;
  }

  $: if($EncryptionKey) {
    $InvalidKey = false;
  }

  $: decryptedTags = ($myTags || [])
    .map((encTag) => {
      try {
        return {
          ...decryptObject(encTag.enc, $EncryptionKey),
          ...{ id: encTag.id },
        };
      } catch (e) {
        $InvalidKey = true;
      }
      return undefined;
    })
    .filter((t) => t);
</script>

{#if printingTag}
  <div
    class="bg-white fixed top-0 right-0 left-0 bottom-0 flex flex-col items-center justify-center"
  >
    <TagQr size="300" payload={printingTag} />
    <button class="header-button" on:click={() => window.print()}>Print</button>
  </div>
{/if}

{#if $InvalidKey}
  <div class="mt-4 flex items-center space-x-4 error bg-red-500 text-white py-2 px-4 rounded-md">
    <span>Invalid Key</span>
    <div class="filler" />
    <button disabled class="opacity-60" on:click={()=>{
      
    }}>Restart</button>
    <button on:click={()=>{
      openPasscodeModal()
    }}>Retry</button>
  </div>
{/if}

<ul class="gap-4 grid grid-cols-12 mt-4">
  {#if $myTags}
    {#each decryptedTags as tag}
      <div
        id={`tag-${tag.id}`}
        class="tag card"
      >
        <TagQr payload={tag} size="100%" />

        <div
          class="bg-gray-200 print-hide dark:bg-gray-600 rounded-lg flex items-center mt-2 justify-evenly w-full  text-sm"
        >
          <button
            class="py-1 w-full"
            on:click={() => {
              showEditor(tag);
            }}>Edit</button
          >
          <button
            class="py-1 w-full"
            on:click={() => {
              showQR(tag);
            }}>Use</button
          >
          <!-- <button
            class="py-1"
            on:click={() => {
              printTag(tag);
            }}>Print</button
          > -->
        </div>
      </div>
    {/each}
  {/if}
</ul>
{#if $myTags && !$myTags.length}
  <div
    class="p-2 relative max-w-screen-md mx-auto dark:text-white text-center w-full mt-10"
  >
    <h2 class="text-lg font-bold leading-tight mb-2">No QR Tags found</h2>
    <p class="text-base text-gray-500">
      Create QR Codes to automatically track data to Nomie. One by
      your Coffee Maker for example.
    </p>
    <button class="header-button" on:click={() => createNewTag()}>Create</button
    >
  </div>
{/if}

<!-- <div class="my-6 flex items-center justify-center print-hide">
  <button
    class="underline text-primary-500 dark:text-primary-400"
    on:click={() => createNewTag()}>+ Create IRL Code</button
  >
</div> -->
<style lang="postcss" global>
  @media print {
    .tag {
      border: dotted 1px rgba(0, 0, 0, 0.5);
      @apply shadow-none;
      page-break-before: always;
      @apply col-span-3;
    }
    .tag .qr-label {
      font-size: 1.2rem;
    }
  }


  .tag {
    @apply flex items-center justify-center;
    @apply p-2 relative dark:text-white col-span-6  lg:col-span-4 xl:col-span-3  flex-col bg-white dark:bg-gray-800 rounded-lg py-2;

  }

  .list {
    @apply mb-6;
    @apply rounded-md;
  }
  .list.solo {
    @apply bg-white dark:bg-black;
    @apply shadow-lg;
    @apply rounded-lg;
    @apply my-4;
  }
  .list .list-item {
    @apply flex items-center;
    @apply overflow-hidden;
    @apply py-4 px-4;
    @apply relative;
    @apply w-full;
  }
  .list .list-item.disabled,
  .list .list-item[disabled] {
    @apply opacity-50;
  }

  .list .list-item:after {
    @apply absolute;
    @apply bottom-0 left-4 right-0;
    @apply border-b border-gray-500 border-opacity-30;
    content: "";
  }
  .list .list-item:last-child:after {
    @apply hidden;
  }
  .list-item:active:after {
    content: "";
    @apply absolute top-0 left-0 right-0 bottom-0;
    @apply bg-primary-500 bg-opacity-20;
  }
</style>
