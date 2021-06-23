const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const firestore = admin.firestore()
firestore.settings({ timestampsInSnapshots: true })

exports.createUser = functions.region('europe-west1').https.onCall(async (data, context) => {
  const Users = firestore.collection('users')

  if (!context.auth && !context.auth.uid) {
    throw new functions.https.HttpsError('unauthenticated')
  }
  const userId = context.auth.uid
  const { email } = data;

  // await admin.auth().setCustomUserClaims(userId, { role: 'admin' })

  return Users.doc(email).set({ userId, email, createdAt: new Date() }).then(doc => {
    return 'ok'
  })
})
exports.addComment = functions.region('europe-west1').https.onCall(async (data, context) => {
  const Users = firestore.collection('users')

  if (!context.auth && !context.auth.uid) {
    throw new functions.https.HttpsError('unauthenticated')
  }
  // const email = context.auth.email
  const { code, email } = data;
  console.log('code', code, email, context.auth);
  console.log('context', context.auth);

  // await admin.auth().setCustomUserClaims(userId, { role: 'admin' })

  return Users.doc(email).collection('comments').doc(code).set(data, { merge: true }).then(doc => {
    return 'ok'
  })
})

exports.updateGuideline = functions.region('europe-west1').https.onCall(async (data, context) => {
  const GuideLines = firestore.collection('guidelines')

  if (!context.auth && !context.auth.uid) {
    throw new functions.https.HttpsError('unauthenticated')
  }
  // const email = context.auth.email
  const { code } = data;

  // await admin.auth().setCustomUserClaims(userId, { role: 'admin' })

  return GuideLines.doc(code).set(data, { merge: true }).then(doc => {
    return 'ok'
  })
})

exports.getAllGuidelines = functions.region('europe-west1').https.onCall(async (_, context) => {

 /* if (!context.auth && !context.auth.uid) {
    console.log('error', context);
    throw new functions.https.HttpsError('unauthenticated')
  }*/

  var docRef = firestore.collection("guidelines")

  return docRef.get().then((snap) => {
    return snap.docs.map(d => d.data())

  }).catch((error) => {
    console.log("Error getting all documents:", error);
  });
})

exports.getComment = functions.region('europe-west1').https.onCall(async (data, context) => {

  if (!context.auth && !context.auth.uid) {
    console.log('error', context);
    throw new functions.https.HttpsError('unauthenticated')
  }
  // const email = context.auth.email
  const { code, email } = data;
  console.log('context.auth', context.auth.email, 'code', code)

  var docRef = firestore.collection("users").doc(email).collection('comments').doc(`${code}`)

  return docRef.get().then((doc) => {
    if (doc.exists) {
      // console.log('doc', doc.data());
      return doc.data();
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
      return null;
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
})

exports.getAllComments = functions.region('europe-west1').https.onCall(async (data, context) => {

  if (!context.auth && !context.auth.uid) {
    console.log('error', context);
    throw new functions.https.HttpsError('unauthenticated')
  }
  // const email = context.auth.email
  const { email } = data;

  var docRef = firestore.collection("users").doc(email).collection('comments')

  return docRef.get().then((snap) => {
    return snap.docs.map(d => d.data())

  }).catch((error) => {
    console.log("Error getting all documents:", error);
  });
})

exports.getAUC = functions.region('europe-west1').https.onCall(async (data, context) => {

  if (!context.auth && !context.auth.uid) {
    console.log('error', context);
    throw new functions.https.HttpsError('unauthenticated')
  }
  const email = context.auth.email

  var docRef = firestore.collection("users")

  return docRef.get().then((snap) => {
    return Promise.all(snap.docs.map(d => {
      const data = d.data()
      return docRef.doc(data.email).collection('comments').get().then(snap => snap.docs.map(s => s.data())).then(comments => ({ email: data.email, comments }))
    }))

  }).catch((error) => {
    console.log("Error getting all documents:", error);
  });
})

exports.getUser = functions.region('europe-west1').https.onCall(async (data, context) => {

  if (!context.auth && !context.auth.uid) {
    throw new functions.https.HttpsError('unauthenticated')
  }
  const { email } = data;
  var docRef = firestore.collection("users").doc(email);

  return docRef.get().then((doc) => {
    if (doc.exists) {
      return doc.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
})

exports.getAllCommentsLandingPage = functions.region('europe-west1').https.onCall(async (data, context) => {

  console.log("hello");
  //var docRef = firestore.collection("users").doc("renny.lindberg@gmail.com").collection('comments')
  const s = "blah blah blah";
  /*const s = docRef.get().then((snap) => {
    return snap.docs.map(d => 
      {
        console.log(d.data())
       return d.data()
      })

  }).catch((error) => {
    console.log("Error getting all documents:", error);
  });*/

  return context.send(s);
})