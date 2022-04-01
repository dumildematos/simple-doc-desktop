const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    openDialog() {
      ipcRenderer.send('open-file-dialog');
    },
    on(channel, func) {
      const validChannels = ['ipc-example','opened-file'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example', 'open-file-dialog'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
    send(channel, func) {
      const validChannels = [
        'ipc-example',
        'message-sender',
        'open-file-dialog',
      ];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.send(channel, (event, ...args) => func(...args));
      }
    },
  },
});
