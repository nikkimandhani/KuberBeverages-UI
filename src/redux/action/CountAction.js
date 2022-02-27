import {GET_AVAILABLE_STOCK, GET_COUNT, GET_PAYMENT_METRICS} from '../constant/ActionType';
import axios from '../../axios';
import {INTERNAL_ERROR_MESSAGE} from "../../common/Utils";

export function getMetrics(receivedDate){
    return function(dispatch) {
        return axios.get('/kuberbeverages/metrics/v1', { params: { receivedDate: receivedDate } }).then(response=>{
            dispatch({ type: GET_COUNT, payload: response.data });
        }).catch(error=>{
            if(error.response){
                throw error.response.data;
            }else{
                throw INTERNAL_ERROR_MESSAGE
            }
        })
      };
}

export function getPaymentMetrics(receivedDate){
    return function(dispatch) {
        return axios.get('/kuberbeverages/paymentmetrics/v1', { params: { receivedDate: receivedDate } }).then(response=>{
            dispatch({ type: GET_PAYMENT_METRICS, payload: response.data });
        }).catch(error=>{
            if(error.response){
                throw error.response.data;
            }else{
                throw INTERNAL_ERROR_MESSAGE
            }
        })

    };
}

export function getAvailableStock(){
    return function(dispatch) {
        return axios.get('/kuberbeverages/metrics/v1/availablestock').then(response=>{
            dispatch({ type: GET_AVAILABLE_STOCK, payload: response.data });
        }).catch(error=>{
            if(error.response){
                throw error.response.data;
            }else{
                throw INTERNAL_ERROR_MESSAGE
            }
        })

    };
}