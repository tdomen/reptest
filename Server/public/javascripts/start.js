// var hostURL = 'https://13.115.41.122:3000';
// var hostURL = 'https://172.20.11.172:3000';
var hostURL = 'https://192.168.100.32:3000';
var endpoint = 'https://192.168.100.32:3000/regist/limit';  // リクエスト先URL

function setLimit(){
// var limitid = document.forms.id_form1.id_tname.value;
var year = document.forms.id_form1.year.value;
// alert(year);
var month = document.forms.id_form1.mon.value;
// alert(month);
var day = document.forms.id_form1.day.value;
// alert(day);
var hour = document.forms.id_form1.hour.value;
// alert(hour);
var minute = document.forms.id_form1.min.value;
// alert(minute);

var array={limitid:'',year:'',month:'',day:'',hour:'',minute:''};
// alert("a1");
array.limitid=1;
array.year=year;
array.month=month;
array.day=day;
array.hour=hour;
array.minute=minute;

data=JSON.stringify(array);

send(data);
// alert(data);

var xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.onreadystatechange = function()
{
    var READYSTATE_COMPLETED = 4;
    var HTTP_STATUS_OK = 200;

    if( this.readyState == READYSTATE_COMPLETED
     && this.status == HTTP_STATUS_OK )
    {
        // レスポンスの表示
        alert( this.responseText );
    }
}

xmlHttpRequest.open( 'POST', endpoint );

// サーバに対して解析方法を指定する
xmlHttpRequest.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );


// // データをリクエスト ボディに含めて送信する
// xmlHttpRequest.send( EncodeHTMLForm( data ) );
// function send(data){
//   var url = endpoint;
//   var request = new XMLHttpRequest();
//
//   request.onreadystatechange = function () {
//     if (request.readyState != 4) {
//       // リクエスト中
//       alert("posting")
//     } else if (request.status != 200) {
//       // 失敗
//       alert("failed")
//     } else {
//       // 送信成功
//       alert("success")
//     }
//   };
//   request.setRequestHeader('Content-Type', 'application/json');
//   request.open('POST', url);
//   request.send(JSON.stringify(data));
// }

}
