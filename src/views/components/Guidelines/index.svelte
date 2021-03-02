<script>
  import { csvParse } from 'd3-dsv'
  import GuideLinePage from './GuidelinesGrid.svelte'

  const promise = fetch('/cetools.csv')
    .then((response) => response.text())
    .then((data) => {
      const lines = csvParse(data)
      const keys = Object.keys(lines[0])

      return lines.map((d, i) => {
        const nd = keys.reduce((acc, k) => ({ ...acc, [k]: d[k].replace(/\n|\r/g, '') }), {})
        return {
          ...nd,
          id: d.code,
        }
      })
    })
</script>

<div>
  {#if promise}
    {#await promise}
      <p class="text-6xl m-auto">Loading...</p>
    {:then data}
      <GuideLinePage {data} />
    {/await}
  {/if}
</div>
