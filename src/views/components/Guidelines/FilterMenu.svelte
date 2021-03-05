<script>
  export let keys = []
  export let onChange = (d) => d
  const onClick = (d) => {
    const nks = keys.map((n) => {
      if (n.id === d.id) return { ...n, selected: !d.selected }
      return n
    })
    onChange(nks)
  }
</script>

<div>
  {#each keys as k (k.id)}
    <label class="inline-flex items-center mt-3">
      <input
        on:click={() => onClick(k)}
        type="checkbox"
        class="form-checkbox h-5 w-5 text-orange-600"
        checked={k.selected} /><span class="mx-2 text-gray-700">{k.id}</span>
    </label>
  {/each}
</div>
