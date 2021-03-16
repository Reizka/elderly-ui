<script>
  export let inputName = 'email'
  export let id = 'email'
  export let label = 'E-Mail'
  export let value = ''
  export let icon = 'email'
  export let error = false
  export let isFocused = false
  export let errorMessage = 'Please enter a valid email'
</script>

<div class="">
  <label class="block mb-2 text-indigo-500" for={id}>{label}</label>
  <input
    class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
    bind:value
    on:input={() => (error = false)}
    type="email"
    name={inputName}
    {id}
    class:invalid={error}
    autofocus={isFocused}
    on:blur />
  <span class="helper-text" data-error={errorMessage} />
</div>
