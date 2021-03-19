<script>
  export let keys = []
  export let labels = []
  export let onChange = (d) => d

  const onClick = (i) => {
    const d = keys[i]
    const nks = keys.map((n) => {
      if (n.id === d.id) return { ...n, selected: !d.selected }
      return n
    })
    onChange(nks)
  }
</script>

<div style="">
  {#each labels as k, i}
    <label class="inline-flex items-center mt-3 mr-3">
      <input
        on:click={() => onClick(i)}
        type="checkbox"
        class="form-checkbox h-5 w-5 text-orange-600"
        checked={keys[i].selected} /><span class="mx-1 text-gray-700">{k}</span>
    </label>
  {/each}
</div>
