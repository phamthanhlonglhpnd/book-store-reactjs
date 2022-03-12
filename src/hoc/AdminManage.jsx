import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../reduxtoolkit/slice/userSlice';
import { ACTIONS } from '../utils/constant';

const AdminManage = ( Component, getDataAPI ) => {

    const [data, setData] = useState([]);
    const [isLoadings, setIsLoading] = useState(true);
    const [action, setAction] = useState(ACTIONS.CREATE);
    
    const navigation = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            let response = await getDataAPI();
            if(response.errCode===0) {
                setIsLoading(false);
                setData(response.data);
            } else {
                setData([]);
                setIsLoading(true);
                dispatch(logout());
                navigation("/login");
            }
        }
        getData();
    }, [getDataAPI, dispatch, navigation])

    const handleSubmit = async () => {
        if(action===ACTIONS.CREATE) {

        }
        if(action===ACTIONS.UPDATE) {
            
        }
    }

  return (
    <Component
        data={data}
    >

    </Component>
  )
}

export default AdminManage