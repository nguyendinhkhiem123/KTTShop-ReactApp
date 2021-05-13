import React, { useEffect, useState } from 'react';
import './asset/base.css';
import './asset/base';
import {Link, useHistory} from 'react-router-dom'
import * as action from '../../Action/Product/index';
import axios from 'axios';
import * as actionType from '../../Const/Product/index';
import { useDispatch } from 'react-redux';
import *  as ActionLoading from '../../Action/Loading/index';
function AddProduct(props) {
    const [option , setOption] = useState([])
    const token = JSON.parse(localStorage.getItem("token"));
    const history = useHistory();
    const dispatch = useDispatch(); 
    const [image , setImage] = useState({   // Lưu ảnh hiện thị
        image1 : '',
        image2 : '',
        image3 : ''
    })
    const [ form , setForm ] = useState({
        Id : 0,
        ProGroupId : 1,
        Name :'',
        Price : '',
        Discount : 0,
        Size : 'S',
        Color : '',
        Image1 : '',
        Image2 : '',
        Image3 : '',
        Description :'',
        Information : '',
        Stock : 1,
        Advertisments : null,
        CartItems : null,
        OderItems : null,
        ProductGroup : null



    })
    useEffect(()=>{
        if(token.RoleId === 1){
            history.replace("/")
        }
        else{
            dispatch(ActionLoading.displayLoading());
            setTimeout(() => {
                dispatch(ActionLoading.hiddenLoading());
            }, 300);
            axios.get('http://jewelrystoreservice.somee.com/api/allProductGroups')
                    .then(res =>{
                        setOption(res.data);
                    })
        }
    },[])
    
    const onChange = (e) =>{
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setForm({
            ...form,
            [name] : value
        })
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        var Product = {

            ProGroupId: parseInt(form.ProGroupId,10),
            Name : form.Name,
            Price : parseFloat(form.Price) ,
            Discount : parseFloat(form.Discount),
            Size : form.Size,
            Color : form.Color,
            Image1 : form.Image1,
            Image2 : form.Image2,
            Image3 : form.Image3,
            Description :form.Description,
            Information : form.Information,
            Stock :  parseInt(form.Stock,10),
            Advertisments : [],
            CartItems : [],
            OderItems : [],
            ProductGroup : null
        }
        console.log(Product);
        dispatch(ActionLoading.displayLoading());
        setTimeout(() => {
            dispatch(ActionLoading.hiddenLoading());
        }, 800);
        axios.post("http://jewelrystoreservice.somee.com/api/newProduct",Product
            ,{
                headers:{
                    "Content-type": "application/json",
                    "Accept": "application/json" 
                }
            }
        )
        .then(res =>{
                alert("Thêm sản phẩm thành công !");
            })
            .catch(err =>{
                console.log(err)
            })
    }
    const toBase64 = (file) =>{
        return new Promise((resolve , reject) =>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    const onChangeFile = async (e)=>{
        const formData = new FormData();
        const resFile = await toBase64(e.target.files[0]); // chuyển base 64
        formData.append("file",resFile);   
        formData.append("upload_preset","jy6ujik2");
        dispatch(ActionLoading.displayLoading());
        // setTimeout(() => {
        //     dispatch(ActionLoading.hiddenLoading());
        // }, 500);
        // axios.post("https://api.cloudinary.com/v1_1/dw59ze6aa/image/upload", formData)
        //     .then(res =>{
        //         console.log(res);
        //         setImage({
        //             ...image ,
        //             image1 : res.data.url
        //         })
        //        
        //     })
        //     .catch(err=>{
        //         console.log(err);
        //     })
        const res = await axios.post("https://api.cloudinary.com/v1_1/dw59ze6aa/image/upload", formData);
        setImage({
            ...image ,
            image1 : res.data.url
        })
        const finalResFile =  resFile.slice(23,resFile.length);
        setForm({
            ...form ,
            Image1 : finalResFile
        })
        dispatch(ActionLoading.hiddenLoading());
       
    }
    const onChangeFile2 = async (e)=>{
        const formData = new FormData();
        const resFile = await toBase64(e.target.files[0]); // chuyển base 64
        formData.append("file",resFile);   
        formData.append("upload_preset","jy6ujik2");
        dispatch(ActionLoading.displayLoading());
        // setTimeout(() => {
        //     dispatch(ActionLoading.hiddenLoading());
        // }, 500);
        // axios.post("https://api.cloudinary.com/v1_1/dw59ze6aa/image/upload", formData)
        //     .then(res =>{
        //         console.log(res);
        //         setImage({
        //             ...image ,
        //             image1 : res.data.url
        //         })
        //        
        //     })
        //     .catch(err=>{
        //         console.log(err);
        //     })
        const res = await axios.post("https://api.cloudinary.com/v1_1/dw59ze6aa/image/upload", formData);
        setImage({
            ...image ,
            image2 : res.data.url
        })
        const finalResFile =  resFile.slice(23,resFile.length);
        setForm({
            ...form ,
            Image2 : finalResFile
        })
        dispatch(ActionLoading.hiddenLoading());
       
    }
    const onChangeFile3 =async (e)=>{
        const formData = new FormData();
        const resFile = await toBase64(e.target.files[0]); // chuyển base 64
        formData.append("file",resFile);   
        formData.append("upload_preset","jy6ujik2");
        dispatch(ActionLoading.displayLoading());
        // setTimeout(() => {
        //     dispatch(ActionLoading.hiddenLoading());
        // }, 500);
        // axios.post("https://api.cloudinary.com/v1_1/dw59ze6aa/image/upload", formData)
        //     .then(res =>{
        //         console.log(res);
        //         setImage({
        //             ...image ,
        //             image1 : res.data.url
        //         })
        //        
        //     })
        //     .catch(err=>{
        //         console.log(err);
        //     })
        const res = await axios.post("https://api.cloudinary.com/v1_1/dw59ze6aa/image/upload", formData);
        setImage({
            ...image ,
            image3 : res.data.url
        })
        const finalResFile =  resFile.slice(23,resFile.length);
        setForm({
            ...form ,
            Image3 : finalResFile
        })
        dispatch(ActionLoading.hiddenLoading());
       
    }
   
    var ele = option.map(value =>{
        return (
            <option value={value.Id}>{value.Name}</option>
        )
    })
    console.log(form)
    return (    
            <div className="modal_footer">
                <div className="modal__overlay">
                </div>
                <div className="modal__body">
                    <div className="modal__inner">
                        <form className="form" onSubmit={onSubmit}>
                            <div className="modal__signin-heading">
                                    <h3  className="heading__signin">Thêm sản phẩm</h3>
                                    {/* <Link to="/signin" className="heading__signup">Thêm sản phẩm</Link> */}
                            </div>
                            <div className="modal__signin-body">
                                <div className="modal__signin-form">
                                    <i className="modal__signin-form__warnning">(*) : Tên sản phẩm </i>
                                    <input type="text" name="Name" value={form.Name} onChange={onChange} placeholder="Tên sản phẩm" className="form-control" required/>
                                </div>
                                <div className="modal__signin-form">
                                   <i className="modal__signin-form__warnning">(*) : Giá sản phẩm </i>
                                    <input type="number" name="Price" value={form.Price} min="1" onChange={onChange} step = '0.5' placeholder="Giá sản phẩm" className="form-control" required/>
                                </div>
                                <div className="modal__signin-form">
                                   <i className="modal__signin-form__warnning">(*) : Số lượng sản phẩm </i>
                                    <input type="number" name="Stock" value={form.Stock} min="1" onChange={onChange} placeholder="Số lượng sản phẩm" className="form-control" required/>
                                </div>
                                <div className="modal__signin-form">
                                    <i className="modal__signin-form__warnning">(*) : Giảm giá </i>
                                    <input type="number" name="Discount" value={form.Discount} onChange={onChange} min="0" max="1" step="0.1"  placeholder="Giảm giá" className="form-control" required/>
                                </div>

                                <div className="modal__signin-form">
                                    <i className="modal__signin-form__warnning">(*) : Kích thước</i>
                                    <select name="Size" onChange={onChange} value={form.Size} placeholder="Kích thước" className="form-control" required>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option vlaue="L">L</option>
                                    </select>
                                </div>
                                <div className="modal__signin-form">
                                    <i className="modal__signin-form__warnning">(*) : Loại</i>
                                    <select name="ProGroupId" onChange={onChange} value={form.ProGroupId} placeholder="Kích thước" className="form-control" required>
                                            {ele}
                                    </select>
                                </div>
                                <div className="modal__signin-form">
                                     <i className="modal__signin-form__warnning">(*) : Màu sắc</i>
                                    <input type="text" name="Color" onChange={onChange} value={form.Color} placeholder="Màu sắc" className="form-control" required />
                                </div>
                                <div className="modal__signin-form">
                                    <i className="modal__signin-form__warnning">(*): Hình ảnh 1</i>
                                    <div>
                                        <img id="img" src={image.image1}style={{marginTop : "10px",
                                            marginBottom : "10px",
                                         
                                            }}
                                        ></img>
                                    </div>
                                   
                                    <input id="Image1"type="file" name="Image1" onChange={onChangeFile} placeholder="Chọn ảnh" className="form-control"  accept="image/*" required />
                                </div>
                                <div className="modal__signin-form">
                                    <i className="modal__signin-form__warnning">(*): Hình ảnh 2</i>
                                    <div>
                                        <img id="img" src={image.image2}style={{marginTop : "10px",
                                            marginBottom : "10px",
                                         
                                            }}
                                        ></img>
                                    </div>
                                   
                                    <input id="Image2"type="file" name="Image2" onChange={onChangeFile2} placeholder="Chọn ảnh" className="form-control"  accept="image/*" required />
                                </div>
                                <div className="modal__signin-form">
                                    <i className="modal__signin-form__warnning">(*): Hình ảnh 3</i>
                                    <div>
                                        <img id="img" src={image.image3}style={{marginTop : "10px",
                                            marginBottom : "10px",
                                         
                                            }}
                                        ></img>
                                    </div>
                                   
                                    <input id="Image3"type="file" name="Image3" onChange={onChangeFile3} placeholder="Chọn ảnh" className="form-control"  accept="image/*" required />
                                </div>
                                {/* <div className="modal__signin-form">
                                    <i className="modal__signin-form__warnning">(*) : Kích thước</i>
                                    <select name="Display" onChange={onChange} value={form.Display}placeholder="Kích thước" className="form-control" required>
                                            <option value={true}>Hiện</option>
                                            <option value={false}>Ẩn</option>
                            
                                    </select>
                                </div> */}
                                <div className="modal-sigin-form" style={{marginTop : "20px"}}>
                                    <i className="modal__signin-form__warnning">(*) : Thông tin thêm</i>
                                    <input name="Information" onChange={onChange}  value={form.Information} className="form-control" placeholder="Viết thông tin thêm....."  />
                                </div>
                                <div className="modal-sigin-form" style={{marginTop : "20px"}}>
                                    <i className="modal__signin-form__warnning">(*) : Mô tả</i>
                                    <textarea name="Description" onChange={onChange} value={form.Description}   cols={30} rows={5} className="form-control" placeholder="Viết ghi chú của bạn ....." defaultValue={""}  required/>
                                </div>
                             
                                <div className="modal__signin-form">
                                    <i className="modal__signin-form__warnning">(*) : Không được bỏ trống</i>
                                </div>
                            </div>
                            <div className="action">
                                <button type="submit" className="button  btn-ok">Xác nhận</button>
                                <Link to="/admin" className="button btn-back">Trở lại</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
}

export default AddProduct;