const app = {
    initClient: () => {
        if (document.querySelector('div.present .form select[name=type]').value.length > 0 &&
            document.querySelector('div.present .form input[name=name]').value.length > 0) {
            const data = {
                name: document.querySelector('div.present .form input[name=name]').value,
                type: document.querySelector('div.present .form select[name=type]').value
            }
            if (data.type == 'brodcasting') brodcasting.classList.toggle('hide')
            if (data.type == 'controller') controller.classList.toggle('hide')
            const s = document.createElement('script')
            if (data.type == 'brodcasting') s.src = 'brodcast.js'
            if (data.type == 'controller') s.src = 'controller.js'
            document.body.append(s)
            socket.emit('present', data);
        }
    },
    toggleHistory: () => {
        document.querySelector('div.controller .form a.toggle').classList.toggle('hide')
        document.querySelector('div.controller .form .historyText').classList.toggle('hide')
    },
    renderHistory: (data, local) => {
        const li = document.createElement('li')
        li.append(data)
        local.append(li)
        return li
    },
    sendText: (text) => {
        socket.emit('showText', text)
    }
}