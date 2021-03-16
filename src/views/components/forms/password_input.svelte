<script>
  export let inputName = 'password'
  export let id = 'password'
  export let label = 'Contraseña'
  export let value = ''
  export let icon = 'lock'
  export let error = false
  export let isFocused = false
  export let errorMessage = ''
  export let helpText = ''
</script>

<div class="">
  <label class="block mb-2 text-indigo-500" for={id}>Password</label>
  <input
    bind:value
    on:input={() => (error = false)}
    type="password"
    name={inputName}
    {id}
    class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
    autofocus={isFocused}
    on:blur />
  <!-- <span class="helper-text" data-error={errorMessage}>{helpText}</span> -->
</div>
