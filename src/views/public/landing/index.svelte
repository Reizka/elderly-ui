<script>
  import { Navigate } from 'svelte-router-spa'
  import { Functions, Firestore } from '../../../config/firebase'
  import { guidelineCodes } from '../../../dataHandling/filter'
  //import { sample } from '../../../dataHandling/histogram'
  console.log('fuck this shite')

  let feedbackIndex = 0
  let isLoading = true
  let mergedComments = []
  const getCommentByEmail = async (email) => {
    return await Firestore.collection('users')
      .doc(email)
      .collection('comments')
      .get()
      .then((sub) => {
        if (sub.docs != null) {
          let count = 0
          const oneSet = sub.docs.map((d) => {
            //console.log(count +" ",d.data());
            return d.data()
          })
          return oneSet
        }
      })
  }

  const getAllComments = async () => {
    const stuff = await Firestore.collection('users')
      .get()
      .then((snap) => {
        const comments = snap.docs.map((doc) => {
          return getCommentByEmail(doc.data().email)
        })
        return Promise.all(comments)
      })
    //console.log("STUFF", stuff);
    mergedComments = await guidelineCodes(stuff)
    isLoading = false
  }

  getAllComments()
</script>

<main class="flex mt-10">
  <div class="m-auto">
    <h3 class="text-5xl mx-auto">Elderly UI</h3>
    <div class="">
      <span class="underline">
        <Navigate to="signup">Create your account!</Navigate>
      </span>
      <p>
        Already have an account?
        <span class="underline">
          <Navigate class="" to="login">Log in</Navigate>
        </span>
      </p>
    </div>
    <div>
      <h2>Stats</h2>
      <div>
        <p>Participants</p>
        <p>{1}</p>
      </div>
      <div>
        <p>Total comments</p>
        {#if isLoading}
          <h1 class="m-20 p-10 border border-black border-10 rounded text-xl">Loading...</h1>
        {:else}
          <div class="flex flex-row">
            <button
              type="button"
              on:click={() => {
                if (feedbackIndex > 0) {
                  feedbackIndex--
                }
              }}
              class="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
            >
              BACK
            </button>
            <button
              type="button"
              on:click={() => {
                if (feedbackIndex < mergedComments.length - 1) {
                  feedbackIndex++
                }
              }}
              class="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
            >
              NEXT
            </button>
          </div>
          <h2>Guideline {feedbackIndex + 1} out of {mergedComments.length-1}</h2>
          <div>
            <p>code:{mergedComments[feedbackIndex].fb.code}</p>
            <h3>Importance scale</h3>
            <p>very important: {mergedComments[feedbackIndex].fb.strongPositive}</p>
            <p>important: {mergedComments[feedbackIndex].fb.positive}</p>
            <p>not important: {mergedComments[feedbackIndex].fb.negative}</p>
            <p>not important at all: {mergedComments[feedbackIndex].fb.strongNegative}</p>
            <h3>Original Guideline</h3>
            {#if mergedComments[feedbackIndex].gl.CHECK !== null}
              <p>Check statement: {mergedComments[feedbackIndex].gl.CHECK}}</p>
            {:else}
              <h3>no comments given</h3>
            {/if}
            {#if mergedComments[feedbackIndex].gl.GUIDELINE !== null}
              <p>Guideline statement: {mergedComments[feedbackIndex].gl.GUIDELINE}}</p>
            {:else}
              <h3>no comments given</h3>
            {/if}
            <h3>Feedback given on check statement</h3>
            {#each mergedComments[feedbackIndex].fb.c_check as mc, i}
              <li>
                {i + 1}: {mc}
              </li>
            {/each}
            <h3>Feedback given on guideline statement</h3>
            {#each mergedComments[feedbackIndex].fb.c_guideline as mc, i}
              <li>
                {i + 1}: {mc}
              </li>
            {/each}
            <h3>Edited Guideline</h3>
            {#if mergedComments[feedbackIndex].egl}
              <p>Check statement: {mergedComments[feedbackIndex].egl.CHECK}}</p>
              <p>Guidelien statement: {mergedComments[feedbackIndex].egl.GUIDELINE}}</p>
            {:else}
              <h3>no edits done</h3>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</main>
