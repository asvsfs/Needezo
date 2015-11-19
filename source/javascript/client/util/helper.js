
export function formatDate(date){
	console.log(date)
	var month = date.getMonth();
	var date = date.getDate();
	var year = date.getYear();
	return (date+"/"+month+"/"+year);
}