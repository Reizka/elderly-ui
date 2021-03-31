<script>
  export let data = []
  export let comments = []
  export let extended = false
  export let guidelines
  export let commentsByCode

  import GuidelinesGrid from './GuidelinesGrid.svelte'
  import FilterMenu from './FilterMenu.svelte'
  // const getComment = Functions.httpsCallable('getComment')

  // onMount(()=> {
  //   getComment();

  // })

  const keys0 = ['code', 'CHECK', 'GUIDELINE', 'c_HEUMLE', 'c_SW', 'c_WCAG', 'c_D4ALL', 'auth_note'] //Object.keys(data[0])
  const keys1 = ['code', 'CHECK', 'GUIDELINE', 'auth_note'] //Object.keys(data[0])
  const filterKeysArray = [
    'touchscreenspecific',
    'webspecific',
    'general',
    'multimodal',
    'supplementarydevice/tool',
    'text',
    'font',
    'graphics(icons&images)',
    'screendesign(appearance)',
    'color',
    'customization',
    'navigation',
    'errors',
    'feedback',
    'specialneeds',
    'datainput',
    'element-content',
    'element-interaction',
    'element-size',
    'element-placing',
  ]
  const filterKeysLabels = [
    'touchscreen specific',
    'web specific',
    'general',
    'multimodal',
    'supplementary device/tool',
    'text',
    'font',
    'graphics (icons & images)',
    'screen design (appearance)',
    'color',
    'customization',
    'navigation',
    'errors',
    'feedback',
    'special needs',
    'data input',
    'element-content',
    'element-interaction',
    'element-size',
    'element-placing',
  ]
  let filterKeys = filterKeysArray.map((k) => ({ id: k, selected: false }))
  let filteredData = []
  $: {
    // console.log('filterKeys', filterKeys)

    filteredData = data.filter((d) => {
      return filterKeys.filter((d) => d.selected).every((k) => d[k.id])
    })
    console.log('filterKeys', filterKeys)
    console.log('filteredData', filteredData)
    console.log('data', data)
  }
</script>

<div class="relative" style={extended ? '' : 'max-width: 1000px'}>
  <FilterMenu keys={filterKeys} labels={filterKeysLabels} onChange={(ks) => (filterKeys = ks)} />
  <GuidelinesGrid
    {comments}
    {commentsByCode}
    {guidelines}
    data={filteredData}
    keys={extended ? keys0 : keys1}
    className="mt-2 {!extended && 'w-1/2'}" />
</div>
