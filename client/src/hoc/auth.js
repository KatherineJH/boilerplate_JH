
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function(SpecificComponent, option, adminRoute = null){

    // null: 아무나 출입이 가능한 페이지
    // true: 로그인 한 유저만 출입이 가능한 페이지
    // flase: 로그인 한 유저는 출입이 불가능한 페이지

    function AuthCheck(props){

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        const navigate  = useNavigate();

        useEffect(() => {
            dispatch(authenticate()).then(response => {
                console.log(response);

                // 로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        navigate('/login');
                    }
                } else { // 로그인 한 상태         
                    // isAdmin이 아닌데 adminRoute에 들어가려고 함
                    if(adminRoute && !response.payload.isAdmin){ 
                        navigate('/'); // 랜딩페이지로 보내버림
                    } 
                    // 그 외 나머지 중에서 
                    else {
                        // option -> false(로그인 한 유저는 출입이 불가능한 페이지)
                        if(option === false){
                            navigate('/'); // 랜딩페이지로 보내버림
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