import apiCrud from '../../Doctor/src/apicrud';
const apiurl="http://52.200.251.222:8158/api/v1/";
const apiservice={
	// getstudentDetails:async function(userid){
	// 	var response=await apiCrud.getData(apiurl+"getstudent/");
	// 	return response;
	// },
	// poststudentInfromation:async function(obj){
	// 	var response=await apiCrud.postData(apiurl+"poststudent",obj)
	// 	return response;
	// },
	// addDoctotService:async function(){
	// 	var response=await apiCrud.postData(apiurl+"add_doctor_device",{name:"adfaf",adfa:""})
	// 	return response;
	// },

	getsizeMaster:async function(){
		var response=await apiCrud.getData(apiurl+"get_mas_size_master",{id: "",size: ""});
		return response;
	}
	
}
export default apiservice;