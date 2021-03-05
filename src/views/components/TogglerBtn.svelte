<script>
  export let state = null
  export let firstValue = 'off'
  export let secValue = 'on'
  export let onClick = (d) => d
</script>

<button on:click={onClick} class="transition-all duration-300 flex relative border uppercase  bg-blue-50 p-1">
  <div class="p-1 mr-1 {state === firstValue ? 'bg-blue-200' : 'bg-blue-50'}">{firstValue}</div>
  <div class="p-1 {state === secValue ? 'bg-blue-200' : 'bg-blue-50'}">{secValue}</div>
</button>
