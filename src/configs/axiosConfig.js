import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'Content-Type':'application/json',
    },
    withCredentials: true
});

axiosConfig.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        if(error.response.status===401) {
            // let newAccessToken = await axiosConfig.post("/api/refresh-token");
    
            // const config = error.config;
            // config.headers['x-access-token'] = newAccessToken.accessToken;

            // return new Promise((resolve, reject) => {
            //     axiosConfig.request(config)
            //         .then(res => resolve(res))
            //         .catch(e => reject(e))
            // })
        }
    }
)

// const useAxiosConfig = () => {

//     const dispatch = useDispatch();
//     const navigation = useNavigate();

//     useEffect(() => {
//         const responseInterceptor = axiosConfig.interceptors.response.use(
//             (response) => {
//                 return response.data;
//             },
//             async (error) => {
//                 if(error.response.status===401) {
//                     // let newAccessToken = await axiosConfig.post("/api/refresh-token");
            
//                     // const config = error.config;
//                     // config.headers['x-access-token'] = newAccessToken.accessToken;
        
//                     // return new Promise((resolve, reject) => {
//                     //     axiosConfig.request(config)
//                     //         .then(res => resolve(res))
//                     //         .catch(e => reject(e))
//                     // })
//                     dispatch(logout());
//                     navigation("/login");
//                 }
//             }
//         )
        
//         return () => {
//             axiosConfig.interceptors.response.eject(responseInterceptor);
//         }
//     }, [dispatch, navigation])
    
//     return axiosConfig;
// }



export default axiosConfig;
