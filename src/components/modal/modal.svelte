<script lang="ts">
import { fly } from "svelte/transition";
import { fade } from "svelte/transition"

  export let visible:boolean = false;

  let show: boolean = false;
  
  $: if(!show && visible) {
    setTimeout(()=>{
      show = true;
    },200)
  } else if(!visible && show) {
    setTimeout(()=>{
      show = false;
    },200)
  }
</script>

<div class="backdrop  {show ? 'show' : 'hide'} ">
  <section transition:fly="{{ y: 100, duration: 400 }}" class="{$$restProps.class || ''} modal" {...$$restProps}>
    <slot />
  </section>
</div>

<style lang="postcss" global>
  .backdrop {
    @apply absolute w-screen h-screen z-50 flex items-center justify-center;
    @apply transition-all duration-100;
    z-index:10000;
    @apply px-4;
    @apply bg-gray-200 dark:bg-gray-500 dark:bg-opacity-80 bg-opacity-20 backdrop-filter backdrop-blur-sm;
  }
  .backdrop.show {
    @apply opacity-100;
  }
  .backdrop.hide {
    @apply opacity-0;
    @apply pointer-events-none;
  }
  .backdrop .modal {
    @apply rounded-lg overflow-hidden; 
    @apply shadow-2xl;
  }
</style>