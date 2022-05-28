import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config";
import { RESET } from "./ActionType";

export const upload = (state, dispatch, files, navigate, setProgress) => {
  const date = new Date();
  const now = date.getTime();
  const deleteRef = ref(
    storage,
    `blog/${state.edit ? state.data.imageName : ""}`
  );
  if (files) {
    const storageRef = ref(storage, `blog/${now}`);
    const uploadTask = uploadBytesResumable(storageRef, files);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log(`uploading ${progress} %`);
      },
      (error) => {
        console.log("Error Occured While Uploading");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          let data = {
            ...state.data,
            imageUrl: downloadUrl,
            imageName: now,
          };
          if (!state.edit) {
            addDoc(collection(db, "blog"), data)
              .then(() => {
                dispatch({ type: RESET });
                navigate("/list");
              })
              .catch(() => console.log("Error While Uploading."));
          } else {
            setDoc(doc(db, "blog", state.id), data)
              .then(() => {
                dispatch({ type: RESET });
                deleteObject(deleteRef)
                  .then(() => console.log("Deleted"))
                  .catch((err) => console.log(err));
                navigate("/list");
              })
              .catch(() => console.log("Error While Updating."));
          }
        });
      }
    );
  } else {
    if (!state.edit) {
      addDoc(collection(db, "blog"), {
        ...state.data,
        imageUrl: "",
        imageName: "",
      })
        .then(() => {
          dispatch({ type: RESET }); 
          navigate("/list")
        })
        .catch(() => console.log("Error While Uploading."));
    } else {
      setDoc(doc(db, "blog", state.id), {
        ...state.data,
        imageUrl: state.data.imageUrl,
        imageName: state.data.imageName,
      })
        .then(() => {
          dispatch({ type: RESET })
          navigate("/list")
        })
        .catch(() => console.log("Error While Updating."));
    }
  }
};
