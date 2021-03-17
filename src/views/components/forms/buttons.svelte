<script>
  export let cancelText = 'Cancel'
  export let cancelButton = true
  export let submitText = 'Submit'
  export let isLoading = false
  import { createEventDispatcher } from 'svelte'
  import App from '../../../App.svelte'
  import Loading from '../loading.svelte'

  const dispatch = createEventDispatcher()

  const cancelAction = (event) => {
    event.preventDefault()
    dispatch('cancel')
  }
</script>

<style>
  .form-buttons {
    display: flex;
    justify-content: flex-end;
  }
  .cancel {
    margin-right: 1em;
  }
</style>

<div class="field form-buttons">
  {#if cancelButton}
    <button
      type="button"
      on:click={cancelAction}
      class="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded">{cancelText}</button>
  {/if}
  <button
    type="submit"
    class="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded">{#if isLoading}
      Loading...
    {:else}{submitText}{/if}
  </button>
</div>
