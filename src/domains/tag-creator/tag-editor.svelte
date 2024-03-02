<script lang="ts">
	import { EncryptionKey } from './../encryption/EncryptionStore';
	
	import { EncryptedStorage } from './../encryption/encryptedLocalStorage';
  import { onMount } from "svelte";
  import { closeModal } from "../../components/modal/ModalStore";

  import Toggle from "../../components/toggle/toggle.svelte";
  import { db } from "../../services/database";
  import {
    isValidPayload,
    SenderPayload,
    sendToNomieAPI,
  } from "../../services/sender";
  import { showToast } from "../toast/ToastStore";
  import { closeEditor } from "./TagModals";
import { encryptObject } from '../../services/encrypt';

  export let payload: SenderPayload = {
    key: "",
    note: "",
    geo: true,
    v: "dn6",
    server: "https://api.dailynomie.com/log"
  };

  const versions = [
    //{ id: "n5", name: "Nomie 5" },
    //{ id: "n6", name: "Nomie 6" },
    { id: "dn6", name: "Daily Nomie 6" },
  ];

  onMount(()=>{
    if(!payload.id) {
      payload.v = $EncryptedStorage.version || 'dn6';
      payload.key = $EncryptedStorage.key || ""
      payload.geo = $EncryptedStorage.geo || false;
      payload.server = $EncryptedStorage.server || "https://api.dailynomie.com/log";
    }
  })

  const placeholder = `Example: #coffee(236ml) +home`;

  let canSave: boolean = false;
  let canTest: boolean = false;
  let testedSuccessfully: boolean = false;

  const save = async () => {
    if (payload.id) {
      await db.tags.update(payload.id, {
        enc: encryptObject(payload, $EncryptionKey)
      });
      showToast({ message: "Updated" });
    } else {
      const id = await db.tags.add({
        enc: encryptObject(payload, $EncryptionKey)
      });
      showToast({ message: "Created" });
      closeEditor();
    }
  };

  const copyUrl = () => {};

  const test = async () => {
    try {
      let saved = await sendToNomieAPI(payload, () => {}).catch((e) => {
        throw e;
      });
      if (saved) {
        canSave = true;
      } else {
        canSave = false;
      }
    } catch (e) {
      alert(e);
      canSave = false;
    }
  };

  $: {
    if (isValidPayload(payload)) {
      canTest = true;
      canSave = true;
      if (testedSuccessfully) {
        canSave = true;
      } else {
        // canSave = false;÷
      }
    } else {
      canTest = false;
      // canSave = false;
    }
  }

  const deleteTag = async () => {
    let confirmed = confirm("Delete this Tag?");
    if (confirmed) {
      await db.tags.delete(payload.id);
      closeEditor();
    }
  };

  // $:if (payload.key) {
  //   $EncryptedStorage.key = payload.key;
  // }
  // $:if (payload.v) {
  //   console.log('Payloadv', payload.v);
  //   $EncryptedStorage.version = payload.v;
  // }
</script>

{#if payload}
  <header
    class="grid grid-cols-12 items-center py-2 px-4 shadow-md bg-white dark:bg-black dark:text-white"
  >
    <button class="col-span-2 header-button" on:click={() => closeEditor()}
      >Close</button
    >
    <h1 class="col-span-8 text-center font-bold">Editor</h1>
    <!-- <button class="col-span-2 text-blue-500" on:click={() => copyUrl()}
    >Copy</button
  > -->
  </header>

  <div
    class="tag-editor space-y-4 max-w-md mr-auto p-4 rounded-b--md bg-gray-100 dark:bg-gray-800"
    {...$$restProps}
  >
    <fieldset>
      <label class="dark:text-white" for="note">Note</label>
      <textarea
        class="dark:bg-black dark:text-white w-full p-4 rounded-md"
        name="note"
        {placeholder}
        bind:value={payload.note}
        aria-label="Note to push to Nomie"
      />
    </fieldset>

    <fieldset>
      <label class="dark:text-white" for="note">Nomie API Key</label>
      <input
        type="text"
        bind:value={payload.key}
        class="dark:bg-black dark:text-white w-full px-4 py-2 rounded-md"
        on:input={(evt)=>{
          $EncryptedStorage.key = evt.target.value
        }}
        name="note"
      />
    </fieldset>

    <fieldset class="inline">
      <label class="dark:text-white" for="use-location"
        >Record Geo Location</label
      >
      <div class="flex-grow flex-shrink" />
      <Toggle title="Geo Location" on:change={(evt)=>{
        $EncryptedStorage.geo = evt.detail;
      }} bind:value={payload.geo} />
    </fieldset>

    <fieldset>
      <label class="dark:text-white" for="note">Custom API Server</label>
      <label class="dark:text-white" for="note">(Leave blanc for DailyNomie Server)</label>
      
      <input
        type="text"
        bind:value={payload.server}
        class="dark:bg-black dark:text-white w-full px-4 py-2 rounded-md"
        name="server"
      />
    </fieldset>

    <fieldset class="inline">
      <label class="dark:text-white" for="use-location"
        >Which Nomie Version</label
      >
      <div class="flex-grow flex-shrink" />
      <select 
        on:change={(evt)=>{
          $EncryptedStorage.version = evt.target.value;
        }}
        class="dark:bg-black dark:text-white" bind:value={payload.v}>
        {#each versions as v}
          <option value={v.id}>{v.name}</option>
        {/each}
      </select>
    </fieldset>
    <hr class="dark:border-gray-700" />
    <fieldset class="flex flex-row items-center justify-between">
      <!-- <button
        on:click={() => test()}
        class="dark:text-white"
        disabled={!canTest}>Test</button
      > -->
      {#if payload.id}
        <button on:click={() => deleteTag()} class="text-red-500">Delete</button
        >
      {/if}
      <button
        on:click={() => save()}
        class="text-white bg-primary-500"
        disabled={!canSave}>Save</button
      >
    </fieldset>
  </div>
{/if}

<style lang="postcss" global>
  fieldset {
    @apply flex flex-col w-full;
  }
  fieldset.inline {
    @apply flex flex-row items-center;
  }
  fieldset label {
    @apply text-sm;
    @apply mb-2;
  }
  fieldset.inline label {
    @apply mb-0;
  }
  fieldset input:focus,
  fieldset textarea:focus,
  fieldset select:focus {
    @apply outline-none;
    @apply ring-2 ring-blue-400;
  }
  fieldset select {
    @apply appearance-none;
    @apply px-3 py-1 rounded-lg;
  }

  fieldset button {
    @apply px-4 py-2;

    @apply rounded-md;
  }
  fieldset button:disabled {
    @apply opacity-40;
  }
</style>
