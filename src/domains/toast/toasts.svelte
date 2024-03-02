<script lang="ts">
  import { ToastStore } from './ToastStore'
  import { fly } from 'svelte/transition'

  import Toast from './toast.svelte'
</script>

<div in:fly={{ y: 100 }} out:fly={{ y: 100 }} class="toasts">
  {#each $ToastStore as toast, index (index)}
    <Toast {toast} />
  {/each}
</div>

<style global lang="postcss">
  .toasts {
    @apply pointer-events-none;
    @apply p-10;
    @apply flex flex-col space-y-2;
    @apply items-center justify-end;
    @apply fixed;
    @apply bottom-20 left-0 right-0;
    @apply h-60;
    @apply transition-all duration-200;
    z-index: 12000;
  }
  .toasts .toast-wrapper {
    @apply transition-all duration-200;
    @apply relative;
    @apply bg-primary-500 text-white ;
    @apply ring-2 ring-gray-500 ring-opacity-10;
    @apply px-4 py-2 pr-2 pb-3;
    @apply rounded-lg;
    @apply shadow-2xl;
    @apply pointer-events-auto;
    @apply w-72;
  }
  .toasts .toast {
    @apply flex items-center space-x-4;
  }
</style>
