<script>
import TagManager from "../domains/tag-creator/tag-manager.svelte";
import Layout from "../domains/layout/layout.svelte";
import { createNewTag } from "../domains/tag-creator/TagModals";

</script>
<Layout>
  <button slot="header-right" on:click={()=>createNewTag()} class="header-button -mr-2">+ New</button>
  <button slot="header-left" on:click={()=>window.print()} class="header-button -mr-2">Print</button>
  <div class="px-4">
    <TagManager />
  </div>
</Layout>
