const { CustomTitlebar, TitlebarColor } = require('custom-electron-titlebar')
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
	ipcRenderer: ipcRenderer,
})

window.addEventListener('DOMContentLoaded', () => {
	new CustomTitlebar({
		backgroundColor: TitlebarColor.fromHex('#ADD8E6')
	})
})