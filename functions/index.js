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