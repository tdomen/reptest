// ejsファイルのheaderの先頭に以下の記述を追加
// <script src="/javascripts/staticIP.js">

// 他のJSファイル内での使い方
// const url = getHostUrl('/nameOfEndpoint/...');
// (特にimport等をする必要はなし)

function getHostUlr(endpoint){
    const ip = '192.168.128.102';
    const hostUrl = 'https://' + ip + ':3000' + endpoint;

    return hostUrl;
};
