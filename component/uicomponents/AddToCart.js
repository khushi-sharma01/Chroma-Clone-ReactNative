import { View,Text,Image,Dimensions } from "react-native";
import { serverURL } from "../../services/FetchNodeServices";
import MyButton from "./MyButton";
import { useDispatch } from "react-redux";
var {width,height}=Dimensions.get('window');


export default function AddToCart(props){
    const productFromRedux = props.products
    var productDetails = Object.values(productFromRedux)

    var dispatch = useDispatch()

    const removeProduct=(item)=>{
        dispatch({type:'REMOVE_PRODUCT',payload:[item?.productdetailsid,item]})
        props.setPageRefresh(!props.pageRefresh)
        // console.log("REMOVE PRODUCT: ",item)
    }

   

    const CartBox = () =>{
        return productDetails?.map((item,i)=>{
        return(
        <View key={i} style={{alignItems:'center',justifyContent:'center',marginBottom:15}}>
             <View style={{justifyContent:'space-between',flexDirection:'row',width:width*0.92,height:height*0.26,borderWidth:2,borderColor:'gray',borderRadius:15}}>
                <View style={{marginLeft:8,alignItems:'center',justifyContent:'center'}}>
                    <Image style={{width:90,height:90}} source={{uri: `${serverURL}/images/${item.productpicture}`}} />
                </View>
                <View style={{flexDirection:'column',width:'68%',marginRight:2}}>
                <View style={{marginTop:18}}>
                    <Text style={{color:'#000',fontSize:16,fontWeight:'600'}}>{item.productname}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{marginTop:2}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'600',textDecorationLine:'line-through',opacity:0.6}}>&#8377;{item.price}</Text>
                </View>
                <View style={{marginLeft:5,marginTop:2}}>
                    <Text style={{color:'#000',fontSize:17,fontWeight:'600'}}>&#8377;{item.offerprice}</Text>
                </View>
                
                </View>
                <Text style={{color:'gray',fontSize:13}}>(Incl. all Taxes)</Text>
                <View style={{marginTop:4}}>
                    <Text style={{color:'#000',fontSize:12}}>Express delivery by today | &#8377;99</Text>
                    <Text style={{color:'#000',fontSize:12}}>Standard delivery by 2 July 2024 | Free</Text> 
                </View>
                <View style={{flexDirection:'row',marginTop:4}}> 
                    <MyButton msg={'Move to Wishlist'} w={0.3} h={0.05} fs={12} bg="#000" brdCol="#fff" />
                    <MyButton onPress={()=>removeProduct(item)} msg={'Remove'} w={0.3} h={0.05} fs={12} bg="#000" brdCol="#fff" />
                </View>
                </View>
        
             </View>

        </View>
        )})
    }

    return(
    <View>
        {CartBox()}
    </View>)
}