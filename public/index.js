var socket = io();

const screen = document.querySelector('div.brodcasting .screen')
const brodcasting = document.querySelector('div.brodcasting')
const controller = document.querySelector('div.controller')
const ulTextHistory = document.querySelector('div.controller .form ul#textList')

socket.on('received', (data) => {
    let server = data;
    document.querySelector('div.present').className = 'hide'
});
socket.on('newConnection', (data) => {
    console.log(data)
    nativeToast({
        message: `Connected`,
        type: 'success '
    })
});
socket.on('disconnect', () => {
    nativeToast({
        message: `Disconnect`,
        type: 'warning'
    })
});

document.querySelectorAll('div.controller a.toggle').forEach(element => element.addEventListener('click', app.toggleHistory))
document.querySelector('div.present .form button').addEventListener('click', app.initClient)