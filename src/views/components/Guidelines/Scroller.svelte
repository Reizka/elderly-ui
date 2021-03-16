<script>
  let cont = null
  let scrollable = false
  import { onMount } from 'svelte'
  import { ChevronsDown } from 'tabler-icons-svelte'
  const scroll = () => {
    console.log('cont ')
    const child = cont.children ? cont.children[0] : null
    child.scrollBy(0, 100)
    console.log('scroll', isScrollable(child))
  }
  const isScrollable = function (ele) {
    // Compare the height to see if the element has scrollable content
    const hasScrollableContent = ele.scrollHeight > ele.clientHeight

    // It's not enough because the element's `overflow-y` style can be set as
    // * `hidden`
    // * `hidden !important`
    // In those cases, the scrollbar isn't shown
    const overflowYStyle = window.getComputedStyle(ele).overflowY
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1

    return hasScrollableContent && !isOverflowHidden
  }
  onMount(() => {
    const child = cont.children ? cont.children[0] : null
    scrollable = isScrollable(child)
  })
</script>

<span class="p-0" bind:this={cont}>
  <slot />
</span>
{#if scrollable}
  <div role="button" on:click={() => scroll()} class="flex justify-center border-t-2">
    <button>
      <ChevronsDown /></button>
  </div>
{/if}
