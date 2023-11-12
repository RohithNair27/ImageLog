import firestore from '@react-native-firebase/firestore';
import {
  DATA_UPLOADED_TO_FIREBASE,
  DATA_NOT_UPLOADED_TO_FIREBASE,
} from '../Constants/FirebaseConstants';

//Upload the data to firebase
export const uploadDataFireBase = async (allData, adminId, stringDocument) => {
  console.log('here this is in firebase');
  console.log('in firebase');
  //   console.log(allData);
  const stringCollection = JSON.stringify(adminId);

  const ref = firestore().collection(stringCollection);
  const documentRef = ref.doc(stringDocument);
  const documentSnapshot = await documentRef.get();
  let objectData = '';

  console.log('checkIn');
  // console.log(allData);
  const eachEmployee = Object.values(allData)[0];
  // console.log(eachEmployee);
  const EachEmployeeCheckin = Object.values(eachEmployee)[0];
  console.log(EachEmployeeCheckin);
  var key = JSON.stringify(EachEmployeeCheckin.EmployeeIdEntered);
  objectData = {[key]: eachEmployee};

  if (documentSnapshot.exists) {
    await documentRef.update(objectData);
    console.log('already tehre');
  } else {
    documentRef
      .set(objectData)
      .then(() => {
        console.log('uploaded');
      })
      .catch(() => {
        console.log('cant upload');
      });
  }

  //   } else {
  //     const ref = firestore().collection(stringCollection);
  //     const documentRef = ref.doc(stringDocument);
  //     const documentSnapshot = await documentRef.get();
  //     if (documentSnapshot.exists) {
  //       await documentRef.update(allData);
  //       console.log(' re uploaded');
  //     }
  //   }

  // const stringDocument = JSON.stringify(allData[0].checkIn.EmployeeIdEntered);
  // const ref = firestore().collection(stringCollection);
  // const employeeRef = ref.doc(stringDocument);
  // console.log(allData);
  // employeeRef
  //   .set({
  //     logData: allData,
  //   })
  //   .then(() => {
  //     return DATA_UPLOADED_TO_FIREBASE;
  //   })
  //   .catch(() => {
  //     return DATA_NOT_UPLOADED_TO_FIREBASE;
  //   });
  // allData.map(element => {
  //   employeeRef
  //     .set(element)
  //     .then(() => {
  //       return 'Data added to Firestore successfully';
  //     })
  //     .catch(error => {
  //       return 'Error adding data to Firestore: ';
  //     });
  // });
};
