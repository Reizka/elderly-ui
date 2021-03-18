<script>
  import { Functions } from '../../../config/firebase'
  export let code
  export let data
  export let onUpload
  let likert = data

  import { currentUser } from '../../../stores/current_user'
  const addComment = Functions.httpsCallable('addComment')

  const onChange = (e) => {
    onUpload(true)
    // console.log('e', e.target.value)
    addComment({ likert: e.target.value, email: $currentUser.email, code }).then(() =>
      setTimeout(() => onUpload(false), 200)
    )
  }
  //   const promise = getComment({ code }).then((d) => {
  //     console.log('likert', d)

  //     if (d.data && d.data.likert) likert = +d.data.likert
  //   })
</script>

<div class="flex mb-3">
  <div class="flex flex-col m-auto">
    <label class="inline-flex items-center mt-3 mr-1">
      <input
        type="radio"
        bind:group={data}
        class="form-radio h-5 w-5 text-gray-600"
        value={3}
        on:change={onChange} /><span class="ml-2 text-gray-700">Strongly agree</span>
    </label>

    <label class="inline-flex items-center mt-3 mr-1">
      <input
        type="radio"
        bind:group={data}
        class="form-radio h-5 w-5 text-red-600"
        value={2}
        on:change={onChange} /><span class="ml-2 text-gray-700">Agree</span>
    </label>

    <label class="inline-flex items-center mt-3 mr-1">
      <input
        type="radio"
        bind:group={data}
        class="form-radio h-5 w-5 text-orange-600"
        value={1}
        on:change={onChange} /><span class="ml-2 text-gray-700">Disagree</span>
    </label>

    <label class="inline-flex items-center mt-3">
      <input
        type="radio"
        bind:group={data}
        class="form-radio h-5 w-5 text-yellow-600"
        value={0}
        on:change={onChange} /><span class="ml-2 text-gray-700">Strongly disagree</span>
    </label>
  </div>
</div>
