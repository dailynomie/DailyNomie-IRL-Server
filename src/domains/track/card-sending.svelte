<script>
  import Spinner from "../../components/spinner/spinner.svelte";
</script>

<div class="status-card w-72 pt-8">
  <div class="art flex items-center justify-center">
    <svg id="Layer_1" class="animate-pulse" height="120" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><rect fill="#e57e25" height="305.613" rx="25.31" width="446"/><path d="m435.739 300.212a26.13 26.13 0 0 0 10.261-20.778v-253.255a26.179 26.179 0 0 0 -26.179-26.179h-253.313l268.692 300.014z" fill="#f29c1f"/><path d="m279.492 0h-253.313a26.179 26.179 0 0 0 -26.179 26.179v253.255a26.124 26.124 0 0 0 9.7 20.334l1.1.246z" fill="#f29c1f"/><path d="m419.821 0h-393.642a26.179 26.179 0 0 0 -26.179 26.179v10.063l188.916 130.177a60.068 60.068 0 0 0 68.168 0l188.916-130.177v-10.063a26.179 26.179 0 0 0 -26.179-26.179z" fill="#f0c419"/><path d="m116.126 512a8 8 0 0 1 -5.157-14.119l110.588-91.916a8 8 0 1 1 10.306 12.235l-110.587 91.919a7.97 7.97 0 0 1 -5.15 1.881z" fill="#ff5364"/><path d="m209.927 494.588a8 8 0 0 1 -5.275-14.018l27.222-24.87a8 8 0 1 1 10.543 12.035l-27.217 24.87a7.967 7.967 0 0 1 -5.273 1.983z" fill="#35acef"/><path d="m239.598 336.348 50.471 120.895 92.207-138.322 129.63-123.515z" fill="#285680"/><path d="m511.906 194.516-266.03 155.177-78.277-20.307z" fill="#7ed0fc"/><path d="m418.218 297.138-128.149 160.105 15.123-91.701z" fill="#35acef"/><path d="m511.906 195.406c.073-.227.169-.4 0-.232l-206.714 170.368 128.054 34.858z" fill="#7ed0fc"/></svg>
  </div>

  <div class="flex items-center space-x-2 justify-center p-4">
    <Spinner size={25} class="p-2" />
    <div class="pr-4 text-base text-semibold">Sending to Nomie...</div>
  </div>
</div>

