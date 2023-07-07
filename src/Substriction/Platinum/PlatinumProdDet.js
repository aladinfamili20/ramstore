import React, { useContext, useEffect, useState } from 'react'
import {  Link, useParams } from 'react-router-dom' 
 import { doc, getDoc } from 'firebase/firestore'
import '../../components/product/productDetails/ProductDetails.css'
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../redux/slice/cartSlice";
import '../../Styles/signup.css'
import useFetchCollection from '../../customHooks/useFetchCollection';
import useFetchDocument from '../../customHooks/useFetchDocument';
 const PlatinumProdDet =()=>{ 
const {id} = useParams()
const [product, setProduct] = useState(null);
const dispatch = useDispatch();
const cartItems = useSelector(selectCartItems);
const { document } = useFetchDocument("kids", id);
const { data } = useFetchCollection("reviews");
const filteredReviews = data.filter((review) => review.productID === id);

const cart = cartItems.find((cart) => cart.id === id);
const isCartAdded = cartItems.findIndex((cart) => {
  return cart.id === id;
});

useEffect(() => {
  setProduct(document);
}, [document]);

const addToCart = (product) => {
  dispatch(ADD_TO_CART(product));
  dispatch(CALCULATE_TOTAL_QUANTITY());
};

const decreaseCart = (product) => {
  dispatch(DECREASE_CART(product));
  dispatch(CALCULATE_TOTAL_QUANTITY());
};

  return (
    <main>
<section>
<div className='upContainer'>
<div className='upContent'>
<div className='upImg'>
<img src={product?.image} alt="imagedetail" />
</div>
<div className='upInfo'>
<div className='imageInfo'>
<div className='imageInfoView'>    
 <h1>{product?.displayName}</h1>
<h2>{product?.name}</h2>
<h2>{product?.size}</h2>
<h2>Medium: {product?.medium}</h2>
<h2>Frame: {product?.frame}</h2>
<h3 className='price'>{`$${product?.price}`}</h3>
<h4>SKU: {id} </h4>
 
<div className='count'>
                  {isCartAdded < 0 ? null : (
<>
  <button
    className="countbtn"
    onClick={() => decreaseCart(product)}
  >
    -
  </button>
  <p>
    <b>{cart.cartQuantity}</b>
  </p>
  <button
    className="countbtn"
    onClick={() => addToCart(product)}
  >
    +
  </button>
</>
 )}
                </div>

<a>
 <button className='btn'
  onClick={() => addToCart(product)}
 >Add to Cart</button>
 </a>
 
<div>
<p>
   {product?.desc}
   </p> 
</div>
 </div>  
</div>
</div>
</div>
{/* <div className='hr'><hr></hr>  </div> */}
       
</div>
</section>
</main>
  )

}

export default PlatinumProdDet