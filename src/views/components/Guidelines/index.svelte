<script>
  import { csvParse } from 'd3-dsv'
  export let extended = false
  import GuideLinePage from './GuidelinesPage.svelte'

  const promise = fetch('/cetools.csv')
    .then((response) => response.text())
    .then((data) => {
      const lines = csvParse(data)
      // const keys = Object.keys(lines[0])

      const getBool = (d) => {
        if (d === 'y') return true
        if (d === 'n') return false
        return d
      }
      return lines.map((d, i) => {
        const nd = Object.keys(d).reduce(
          (acc, k) => ({ ...acc, [k.replace(/\n|\↵|\s| /g, '')]: d[k].replace(/\n|\↵|\r?\n|\r/g, '') }),
          {}
        )
        const newNd = Object.keys(nd).reduce((acc, k) => ({ ...acc, [k]: getBool(nd[k]) }), {})
        return {
          ...newNd,
          id: d.code,
        }
      })
    })
</script>

{#if promise}
  {#await promise}
    <p class="text-6xl m-auto">Loading...</p>
  {:then data}
    <GuideLinePage {data} {extended} />
  {/await}
{/if}
