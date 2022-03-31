import backendApi from "@/api/backendApi";
import store from './../store';

export default function(){
    backendApi.interceptors.request.use(function(config) {
        store.commit('setLoading', true);
        return config;
    }, function(err) {
        return Promise.reject(err);
    });

    backendApi.interceptors.response.use(function (response) {
        store.commit('setLoading', false);
        return response;
    }, function (error) {
        return Promise.reject(error);
    });
}