import axios from "axios";
import Vue from "vue";
// import LocalStorage from "@/util/LocalStorage";
// import EnumData from "@/util/EnumData";

// const app_debug = process.env.VUE_APP_DEBUG;

// const setting = LocalStorage.get(EnumData.setting);

const headers ={
	"ContentType": "application/json",
	"Access-Control-Allow-Origin": "*",
}

// function baseUrl(url="") {
// 	if (app_debug){
// 		return `http://localhost:8080${url}`;
// 	}else{
// 		return `http://localhost:8787${url}`;
// 		// return `http://localhost:${setting.download_port}${url}`;
// 	}
// }


export function checkStatus() {
	return new Promise((resolve, reject)=>{
		axios.get("http://localhost:8787/info",{
			headers
		}).then(res=>{
			let {status} = res;
			if (status === 200){
				resolve(true);
			}else{
				reject(false);
			}
		});
	})
}

export function pushDownload(name,download={}) {
	return new Promise((resolve, reject)=>{
		axios.post("http://localhost:8787/push",{
			type:2,
			data: `${name}-${download.name},${download.url}`
		},{
			headers
		}).then(res=>{
			let {status,data} = res;
			if (status !== 200){
				Vue.$toast.error("连接失败，请启动下载器或者检查端口是否正确！");
				reject(false);
			}
			let {code,message} = data;
			if (code === 0){
				resolve(true);
			}else{
				Vue.$toast.error(message);
				reject(false);
			}
		})
	})
}



