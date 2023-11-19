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

  const eachEmployee = Object.values(allData)[0];

  const EachEmployeeCheckin = Object.values(eachEmployee)[0];

  var key = JSON.stringify(EachEmployeeCheckin.EmployeeIdEntered);
  objectData = {[key]: eachEmployee};
  try {
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

      return 'UPDATED';
    } else {
      documentRef
        .set(objectData)
        .then(() => {
          console.log('uploaded');
          if (Object.values(allData)[0].CheckIn) {
            uploadImageStorage(
              Object.values(allData)[0].CheckIn.ImageUrl,
              adminId,
              Object.values(allData)[0].CheckIn,
            );
          }
          return 'UPDATED';
        })
        .catch(() => {
          console.log('cant upload');
        });
    }
    return 'UPDATED';
  } catch {
    console.log('unable to upload');
    return 'UNABLE TO UPLOAD';
  }
};

export const uploadImageStorage = async (ImageUrl, adminId, Data) => {
  if (ImageUrl) {
    var filenameWithPrefix = ImageUrl.split('/').pop();

    const reference = storage().ref(
      `${adminId}/${Data.Date}/${filenameWithPrefix}`,
    );
    console.log('Pushed image');
    await reference.putFile(ImageUrl);
  }
};
