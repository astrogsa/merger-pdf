const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('electronAPI',{
  selectFiles: () => ipcRenderer.invoke('dialog:openFiles'),

  mergerFiles: () => ipcRenderer.invoke('dialog:mergerFiles'),

  openFile: () => ipcRenderer.send('dialog:openFile'),

})
