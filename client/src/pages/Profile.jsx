import {useSelector} from 'react-redux'
import { useRef, useState,useEffect} from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase'
import { updateUserstart,updateUserSuccess,upadateUserFailure} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
export default function Profile() {
  const fileRef =useRef(null);
  const {currentUser,loading,error}=useSelector(state=>state.user)
  const [file,setFile]=useState(undefined);
  const [filePrec ,setFilePrec] = useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const[fromData,setFromData]=useState({});
  const[updateSuccess,setUpdateSuccess]=useState(false);
  const dispatch=useDispatch();
  
  //firebase storage
      // allow read;
      // allow write: if 
      // request.resource.size<2*1024*1024 &&
      // request.resource.contentType.matches('image/.8')
   useEffect(()=>{
      if(file){
        handleFileUpload(file);
      }
   },[file]);
    const handleFileUpload=(file)=>{
    const storage=getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
     
    const uploadTask = uploadBytesResumable(storageRef,file)
     
    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePrec(Math.round(progress));
      },  
    (error)=>{
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
       ((downloadURL)=> setFromData({...fromData,avatar:downloadURL})
       );  
    }
    );
   };
   const handleClick = (e) => {
    setFromData({ ...fromData, [e.target.id]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        dispatch(updateUserstart());
        const res = await fetch(`/api/user/update/${currentUser._id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fromData),  
        });
        const data = await res.json();
        if (data.success === false) {
            dispatch(upadateUserFailure(data.message));  
            return;
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
    } catch (error) {
        dispatch(upadateUserFailure(error.message));
    }
};

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center py-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={fromData.avatar || currentUser.avatar} alt="profile" 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
         <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePrec > 0 && filePrec < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePrec}%`}</span>
          ) : filePrec === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type='text' placeholder='username' onChange={handleClick} 
          defaultValue={currentUser.username}
          id='username' className='border p-3 rounded-lg ' />
        <input type='text' placeholder='email' onChange={handleClick}
          defaultValue={currentUser.email}
          id='email' className='border p-3 rounded-lg '/>
        <input type='password' placeholder='password' onChange={handleClick}
          id='password' className='border p-3 rounded-lg '/>
          <button disabled={loading}className='rounded-lg bg-slate-600 p-3 text-white uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'loading...' : 'Update'}
          </button>

      </form>
      <div className='flex justify-between mt-5'>
          <span className='text-red-700 cursor-pointer'>Delet account</span>
          <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-500 mt-5'>{error? error:''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated successfully':''}</p>
    </div>
  )
}
