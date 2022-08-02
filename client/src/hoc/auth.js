
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function(SpecificComponent, option, adminRoute = null){

    // null: page that anybody can enter
    // true: page that logged-in user can enter
    // flase: page that logged-in user cannot enter

    function AuthCheck(props){

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        const navigate  = useNavigate();

        useEffect(() => {
            dispatch(authenticate()).then(response => {
                console.log(response);
                // not logged in
                if(!response.payload.isAuth){
                    if(option){
                        navigate('/login');
                    }
                } else { // logged in         
                    // if not isAdmin but try to enter in admin page
                    if(adminRoute && !response.payload.isAdmin){ 
                        navigate('/'); 
                    } 
                    else { // here this is no need because the function is already set in Nav.js
                        if(option === false){ 
                            navigate('/'); 
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent {...props} user={user}/>
        )
    }

    return AuthCheck;
}