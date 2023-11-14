import firestore from '@react-native-firebase/firestore';
import {
  DATA_UPLOADED_TO_FIREBASE,
  DATA_NOT_UPLOADED_TO_FIREBASE,
} from '../Constants/FirebaseConstants';
import storage from '@react-native-firebase/storage';

//Upload the data to firebase
export const uploadDataFireBase = async (allData, adminId, stringDocument) => {
  console.log('here this is in firebase');
  console.log('in firebase');
  console.log(Object.values(allData)[0].CheckIn);
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
    if (Object.values(allData)[0].CheckIn) {
      uploadImageStorage(
        Object.values(allData)[0].CheckIn.ImageUrl,
        adminId,
        Object.values(allData)[0].CheckIn,
      );
    }
    if (Object.values(allData)[0].CheckOut) {
      uploadImageStorage(
        Object.values(allData)[0].CheckOut.ImageUrl,
        adminId,
        Object.values(allData)[0].CheckIn,
      );
    }
    console.log('already tehre');
  } else {
    documentRef
      .set(objectData)
      .then(() => {
        uploadImageStorage();
        console.log('uploaded');
      })
      .catch(() => {
        console.log('cant upload');
      });
  }
};

export const uploadImageStorage = async (ImageUrl, adminId, Data) => {
  console.log(ImageUrl);
  if (ImageUrl) {
    var filenameWithPrefix = ImageUrl.split('/').pop();

    const reference = storage().ref(
      `${adminId}/${Data.Date}/${filenameWithPrefix}`,
    );
    await reference.putFile(ImageUrl);
  }
};
