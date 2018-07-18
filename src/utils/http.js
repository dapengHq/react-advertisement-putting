import {getCookie} from './cookie'
let querystring = {
    stringify(obj){
       let queryS='';
       for(let i=0;i<Object.keys(obj).length;i++){
         queryS += Object.keys(obj)[i]+"="+Object.values(obj)[i]+"&";
       }
       return queryS.slice(0,-1)
    },
    parse(str) {
        let o = {}
        let arr = str.split('&');
        for(let i=0;i<arr.length;i++){
            let news = arr[i].split("=");
            o[news[0]] = news[1]
        }
        return o;
    }
}
let domain = 'http://localhost:8888'
export default {
    get(url,params){
        let n = querystring.stringify(params)
        if(url.indexOf("?")>-1){
            url =url + "&" + n
        }else{
            url =url + "?" + n
        }
        // querystring.parse("a=1&b=2&c=88")
        return new Promise((resolve,reject)=>{
            fetch(domain+url,{
                headers:{
                    "Content-Type": "application/json",
                    "Token": getCookie('token')
                }
            })
            .then(res=>res.json())
            .then(res=>{
                resolve(res)
            })
        })
    },
    post(url,params) {
        return new Promise((resolve,reject)=>{
            fetch(domain+url, {
                method:"post",
                headers: {
                    "Content-Type": "application/json",
                    "Token":getCookie('token')
                },
                body:JSON.stringify(params)
            })
            .then(res=>res.json())
            .then(res=>{
                resolve(res)
            })
        })
    }
}

