import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { REMOVE } from '../redux/actions/action';

const Header = () => {

    const [price, setprice] = useState(0);
    console.log('price', price)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const getData = useSelector((state) => state.cartreducer.carts)
    console.log('getData', getData)

    const Deletedata = (id) => {
        dispatch(REMOVE(id));
    }

    const Total = () => {
        let price = 0;
        getData.map((value, key) => {
            price = value.price * value.qnty + price;
        });
        setprice(price);
    }
    useEffect(() => {
        Total();
    }, [Total]);

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-3">Add to Cart</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>
                    </Nav>
                    <Badge badgeContent={getData.length} color="primary"
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
                    </Badge>

                </Container>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >

                    {
                        getData.length ?
                            <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Restaurant Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData.map((e) => {
                                                return (
                                                    <><tr>
                                                        <td>
                                                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                                <img src={e.imgdata} style={{ width: "5rem" }} />
                                                            </NavLink>
                                                        </td>
                                                        <td>
                                                            <p>{e.rname}</p>
                                                            <p>Price : ₹ {e.price}</p>
                                                            <p>Quantity : {e.qnty}</p>
                                                            <p style={{ color: "red", fontSize: 20, cursor: 'pointer' }}>
                                                                <i class="fa-solid fa-trash smalltrash" onClick={() => Deletedata(e.id)}></i>
                                                            </p>
                                                        </td>
                                                        <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }}>
                                                            <i class="fa-solid fa-trash largetrash" onClick={() => Deletedata(e.id)}></i>
                                                        </td>
                                                    </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <p className='text-center'>Total : ₹ {price}</p>
                                    </tbody>
                                </Table>
                            </div>
                            :
                            <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 20, position: "relative" }}>
                                <i className='fas fa-close smallclose' style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }} onClick={handleClose}></i>
                                <p style={{ fontsize: 22 }}>Your Cart Is Empty</p>
                                <img src='./cart.gif' alt='cart img' className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                            </div>
                    }


                </Menu>
            </Navbar>
        </>
    )
}
export default Header;