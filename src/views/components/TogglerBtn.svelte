<script>
  export let state = null
  export let firstValue = 'off'
  export let secValue = 'on'
  export let onClick = (d) => d
  export let className
</script>

<button
  on:click={onClick}
  class="mt-auto transition-all duration-300 flex relative border uppercase  font-bold rounded bg-indigo-50 p-1">
  <div class="p-1 mr-1 {state === firstValue ? 'bg-indigo-200' : 'bg-indigo-50'}">{firstValue}</div>
  <div class="p-1 {state === secValue ? 'bg-indigo-200' : 'bg-indigo-50'}">{secValue}</div>
</button>
