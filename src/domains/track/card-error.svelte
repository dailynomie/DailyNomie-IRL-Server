<script lang="ts">
import { openPasscodeModal } from "../encryption/EncryptionStore";


  
	export let message:string = "Please check your configuration";
</script>

<div class="status-card w-72 pt-8">
  <div class="art flex items-center justify-center">
    <svg
      id="Capa_1"
      enable-background="new 0 0 512 512"
      height="120"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        d="m355.825 512h-199.65c-3.979 0-7.794-1.58-10.606-4.394l-141.175-141.174c-2.814-2.813-4.394-6.628-4.394-10.607v-199.65c0-3.979 1.58-7.794 4.394-10.606l141.174-141.175c2.813-2.814 6.628-4.394 10.607-4.394h199.65c3.979 0 7.794 1.58 10.606 4.394l141.175 141.175c2.813 2.813 4.394 6.628 4.394 10.606v199.65c0 3.979-1.58 7.794-4.394 10.606l-141.174 141.175c-2.813 2.814-6.628 4.394-10.607 4.394z"
        fill="#ff674f"
      /><path
        d="m355.825 512c3.979 0 7.794-1.58 10.606-4.394l141.175-141.175c2.813-2.813 4.394-6.628 4.394-10.606v-199.65c0-3.979-1.58-7.794-4.394-10.606l-141.174-141.175c-2.813-2.814-6.628-4.394-10.607-4.394h-99.825v512z"
        fill="#f2472c"
      /><path
        d="m285.432 317.453h-58.864c-5.899 0-10.754-4.643-11.017-10.536l-9.529-213.551c-.56-12.554 9.467-23.038 22.033-23.038h55.889c12.566 0 22.593 10.484 22.033 23.038l-9.529 213.551c-.263 5.893-5.117 10.536-11.016 10.536z"
        fill="#fff"
      /><path
        d="m256 441.672c-22.079 0-39.978-17.899-39.978-39.978 0-22.079 17.899-39.978 39.978-39.978 22.079 0 39.978 17.899 39.978 39.978 0 22.079-17.899 39.978-39.978 39.978z"
        fill="#fff"
      /><g fill="#ffedcd"
        ><path
          d="m256.005 361.716v79.956c22.077-.003 39.974-17.9 39.974-39.978v-.001c-.001-22.077-17.897-39.974-39.974-39.977z"
        /><path
          d="m283.944 70.328h-27.94v247.125h29.427c5.899 0 10.754-4.642 11.017-10.536l9.529-213.551c.561-12.554-9.466-23.038-22.033-23.038z"
        /></g
      ></svg
    >
  </div>

  <div class="text-center p-4">
    <div class="pr-4 text-base text-semibold">Sorry, an error occured.</div>
		<div class="text-gray-500 leading-tight text-base font-normal">{message}</div>
    {#if `${message}`.search('decrypt')>-1}
    <button on:click={()=>{
      openPasscodeModal();
    }} class="text-gray-500 leading-tight text-base font-normal text-primary-500 mt-4">Update Passcode</button>
    {/if}
  </div>
</div>
