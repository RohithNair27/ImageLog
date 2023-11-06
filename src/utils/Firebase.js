import firestore from '@react-native-firebase/firestore';
import {
  DATA_UPLOADED_TO_FIREBASE,
  DATA_NOT_UPLOADED_TO_FIREBASE,
} from '../Constants/FirebaseConstants';

//firebase collection Data

//Upload the data to firebase
export const uploadDataFireBase = async allData => {
  console.log(allData);
  const stringCollection = JSON.stringify(
    allData.checkIn.Date +
      '-' +
      allData.checkIn.month +
      '-' +
      allData.checkIn.year,
  );
  console.log(stringCollection);
  const stringDocument = JSON.stringify(allData.checkIn.EmployeeIdEntered);
  if (Object.keys(allData).length === 1) {
    console.log('entered');

    const ref = firestore().collection(stringCollection);
    const documentRef = ref.doc(stringDocument);
    documentRef
      .set(allData)
      .then(() => {
        console.log('uploaded');
      })
      .catch(() => {
        console.log('cant upload');
      });
  } else {
    const ref = firestore().collection(stringCollection);
    const documentRef = ref.doc(stringDocument);
    const documentSnapshot = await documentRef.get();
    if (documentSnapshot.exists) {
      await documentRef.update(allData);
      console.log(' re uploaded');
    }
  }

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
