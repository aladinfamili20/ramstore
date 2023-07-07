import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import '../Styles/Sub.css'
//  import Card from "../../card/Card";
// import Loader from "../../loader/Loader";
// import styles from "./AddProduct.module.scss";
import  "../Styles/AddPost.css";

 import { onAuthStateChanged } from "firebase/auth";
import { selectProducts } from "../redux/slice/productSlice";
import { useAuth } from "../auth/AuthContext";
import { auth, db, storage } from "../firebase/config";
  
 
const initialState = {
  name: "",
  imageURL: "",
  price: '',
  category: "",
  brand: "",
  desc: "",
  title: '',  
  style: '',
  medium: '',
  location: '',
  color: '',
  orientation: '',
  time: '',
  size: '',
  frame: '',
  material: '',
 };
 const Size = [
  {id: '1', name: 'Small'},
  {id: '2', name: 'Medium'},
  {id: '3', name: 'Large'}

]
const PlatinumUpload = () => {
  const { id } = useParams();
  const [image, setImage]=useState('')
  const [percent, setPercent] = useState(0);
  const [price, setPrice]=useState('')
  const [size, setSize]=useState('')
  const [desc, setDesc]=useState('')
  const [material, setMaterial] = useState('')
  const [displayName, setDisplayName] = useState(null)

  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
//   console.log(productEdit);
const [product, setProduct] = useState({
    ...initialState  
  }) 

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // get user's displayName

  const {user} = useAuth()
  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user){
        const uid = user.uid;
        setDisplayName(user.displayName)
      }
    })
  },[])

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  // Image Chanage 
  function handleChange(event) {
    setImage(event.target.files[0]);
    } 

  //  Upload image to Firebase

  const handleUpload = () => {
    // if (!file) 
  if (!image) 
  {
  alert("Please upload an image first!");}      
  const storageRef = ref(storage, `/kids/${image.name}`);      
  // progress can be paused and resumed. It also exposes progress updates.
  // Receives the storage reference and the file to upload.
  const uploadTask = uploadBytesResumable(storageRef, image);      
  uploadTask.on(
  "state_changed",
  (snapshot) => {
  const percent = Math.round(
  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  );      
  // update progress
  setPercent(percent);
  },
  (err) => console.log(err),
  () => {
  // download url
  getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  setImage(url);
//   console.log(url);
  });
  });
  };

  const File = ()=>{
    document.getElementById("fileuplaod").click();
    }
    const binaryData = []

    binaryData.push(image)
    const blob = new Blob(binaryData, {type: "image/png"})
    const url = URL.createObjectURL(blob)
    // console.log(url)

  const addProduct = (e) => {
    e.preventDefault();
    handleUpload();
    // console.log(product);
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "kids"), {
        name: product.name,
        image:image,
        price: Number(price),
        category: product.category,
        brand: product.brand,
        desc: desc,
        userID:user.uid,
        style: product.style,
        medium:product.medium,
        location:product.location,
        color: product.color,
        orientation:product.orientation,
        time: product.time,
        size: size,
        displayName:displayName,
         createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

    //   toast.success("Product uploaded successfully.");
      navigate("/profile");
    } catch (error) {
      setIsLoading(false);
    //   toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "kids", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
    //   toast.success("Product Edited Successfully");
      navigate("/kids");
    } catch (error) {
      setIsLoading(false);
    //   toast.error(error.message);
    }
  };

  
  return (
    <>
        <section>
            <div  className='postContainer'>            
            <div className='addPost'>
            <h1>
              {/* {detectForm(id, 'Add new Artwork', 'Edit Artwork')} */}
              Add kids clothes and accessories
              </h1>
               {/* <h2>
              Upload your beautiful Artwork, to be viewed by the world</h2> */}
            </div>
             <form 
            //  onSubmit={detectForm(id, addProduct, editProduct)}
             >

             <input type='file'className='custom-file-upload'  
            // onChange={(e)=>setImage(e.target.value)}
            onChange={handleChange}
             multiple accept='image/png, image/jpg'
            id='fileuplaod'/>
             <div className='addPost_container'>
              {
                image && (
                    <div className='artBox'
              onClick={File}
             >               
            <img src={window.URL.createObjectURL(blob)} alt='signupimg'  />
            {/* <img src={ArtworkImgThumb ? ArtworkImgThumb : image}alt='signupimg'  /> */}
            </div>
                 )
              }
            <div className='artInputs'>
            <form className="addpostForm">
            <input type="text"
              placeholder="Product name"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            className='title' />
             <div className='AddPostInpCon'>
              <div className='addPostInpCon1'>                
             {/* Medium */}                              
             <input type='number' placeholder='Price ' value={price} 
            onChange={(e)=>setPrice(e.target.value)} className='input'/>                     
            </div>
              <div className='addPostInpCon2'>               
            <select
              required name="size"
              value={product.size} 
              onChange={(e) => handleInputChange(e)} className='input'>
              <option value="" disabled>Select size</option>
              {Size.map((size) => {
                return (
                  <option key={size.id} value={size.name}>
                    {size.name}
                  </option>
                );
              })}
            </select>                        
            </div>
             </div>                                     
            {/* <textarea placeholder="Description"  onChange={(e)=>setDesc(e.target.value)} value={desc} className="desc" >
            </textarea> */}
            </form>
            <div className='Subsumbit'
            onClick={addProduct}>              
                <h2>
                  {/* {detectForm(id, 'Submit', 'Edit')}          */}
                  Submit
                </h2>
                <p> {percent} "% done"</p>
              </div>
            </div>
             
             </div>
             </form>
               
            </div>
             
        </section>
    </>
  );
};

export default PlatinumUpload;
