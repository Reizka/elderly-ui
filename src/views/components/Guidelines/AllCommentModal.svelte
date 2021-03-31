<script>
  export let visible = false
  export let code
  export let comments = []
  export let onClick

  import Dialog from '@fouita/dialog'
  $: cleanedComments = comments.filter((d) => !!d.email)
</script>

<Dialog inverted color="indigo" rounded="sm" bind:visible title="Comment: {code}" closable={false}>
  <div class="w-96 list-inside h-96 m-2 flex flex-col">
    {#if cleanedComments.length === 0}
      <p class="text-xl">No Comments</p>
    {/if}
    <ul class="flex-grow overflow-y-auto">
      {#each cleanedComments as c}
        <li class="">
          <div>
            <div class="font-bold">{c.email}</div>
            <ul class="ml-4">
              <li>Guideline: {c.GUIDELINE}</li>
              <li>Check: {c.CHECK}</li>
              <li>Likert: {c.likert}</li>
            </ul>
          </div>
        </li>
      {/each}
    </ul>
    <button
      class="mt-auto mb-2 p-1 bg-indigo-100 text-indigo-900 font-bold w-full"
      on:click={() => {
        onClick()
      }}>Close</button>
  </div>
</Dialog>
