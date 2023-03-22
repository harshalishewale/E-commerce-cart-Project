import React, { useEffect, useState } from "react";
import './style.css'
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD, REMOVE, REMOVEONE } from '../redux/actions/action';
const CardDetails = () => {
    const [filterdata, setfilterdata] = useState([]);
    // console.log('filterdata',filterdata)
    const { id } = useParams();
    console.log('id', id);
    const history = useNavigate();
    const getData = useSelector((state) => state.cartreducer.carts)
    // console.log('getData', getData)

    const dispatch = useDispatch();
    const compare = () => {
        let comparedata = getData.filter((e) => {
            return e.id == id;
        })
        // console.log('comparedata', comparedata)
        setfilterdata(comparedata);
    }
    useEffect(() => {
        compare()
    }, [id])

    const send = (e) => {
        // console.log('e',e)
        dispatch(ADD(e));
    }

    const Deletedata = (id) => {
        dispatch(REMOVE(id));
        history("/");
    }

    const Removeone = (item) => {
        dispatch(REMOVEONE(item))
    }
    return (
        <>
            <div className="containter mt-2">
                <h2 className="text-center">Items Details Page</h2>

                <section className="container mt-3">
                    <div className="itemsdetails">
                        {
                            filterdata.map((value) => {
                                return (
                                    <>
                                        <div className="items_img">
                                            <img src={value.imgdata} alt='' />
                                        </div>
                                        <div className="details">
                                            <Table>
                                                <tr>
                                                    <td>
                                                        <p><strong>Restaurant</strong> : {value.rname}</p>
                                                        <p><strong>Price</strong> : ₹ {value.price}</p>
                                                        <p><strong>Dishes</strong> : {value.address}</p>
                                                        <p><strong>Total</strong> : ₹ {value.price * value.qnty}</p>
                                                        <div className="mt-5 d-flex justify-content-between align-items-center" style={{ width: 100, cursor: 'pointer', background: '#ddd', color: '#111' }}>
                                                            <span style={{fontSize:24}} onClick={value.qnty <=1 ? ()=>Deletedata(value.id) : ()=>Removeone(value)}>-</span>
                                                            <span style={{ fontsize: 24 }}>{value.qnty}</span>
                                                            <span style={{ fontsize: 24 }} onClick={() => send(value)}>+</span>

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p><strong>Rating : </strong><span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{value.rating} ★</span></p>
                                                        <p><strong>Order Review : </strong><span>{value.somedata}</span></p>
                                                        <p><strong>Remove : </strong><span><i class="fa-solid fa-trash" style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => Deletedata(value.id)}></i></span></p>
                                                    </td>
                                                </tr>
                                            </Table>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </section>
            </div>
        </>
    )
}
export default CardDetails;