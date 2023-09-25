// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, dialog } = require('electron')
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main')
const path = require('path')
require('dotenv').config(path.resolve(__dirname, ".env"))

//Versions
let electronVer;
let chromeVer;
let nodeVer;

// Setup the titlebar
setupTitlebar()

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1300,
		height: 700,
		frame: false,
		titleBarStyle: 'hidden',
		webPreferences: {
			sandbox: false,
			nodeIntegration: true,
			preload: path.join(__dirname, 'electron/preloader.js')
		}
	})

	const menu = Menu.buildFromTemplate(exampleMenuTemplate)
	Menu.setApplicationMenu(menu)

	// and load the index.html of the app.
	// mainWindow.loadFile('index.html')
	mainWindow.loadURL('http://localhost:4200')
	//mainWindow.loadFile(path.join(__dirname, 'empregest/index.html'))

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Attach listeners
	attachTitlebarToWindow(mainWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow()

	nodeVer = process.versions.node;
	electronVer = process.versions.electron;
	chromeVer = process.versions.chrome;

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Custom menu
const exampleMenuTemplate = [
	{
		label: 'Acerca de',
		submenu: [
			{
				label: 'Acerca de',
				accelerator: 'F12',
				click: () => {
					dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
						type: 'info',
						title: 'WorkHome®️ Desktop',
						message: 'Acerca de WorkHome®️ Desktop Edition',
						detail: `Electron version: ${electronVer}\nNode version: ${nodeVer}\nChrome version: ${chromeVer}\nAngular version: 16.2.6-local+sha.b0b004e3ff\n\nDesktop Version: ${process.env.npm_package_version}\n\nWorkHome®️ es un proyecto comunitario pero de código privado, consulte las redes de Aurora Studios Mexico S.A. de C.V. para mas información.`
					})
				}
			},
			{
				label: 'Salir',
				click: () => app.quit()
			}
		]
	},
	{
		label: '',
		submenu: [
			{
				label: 'Quit',
				click: () => app.quit()
			},
			{
				label: 'Radio1',
				type: 'radio',
				checked: true
			},
			{
				label: 'Radio2',
				type: 'radio'
			},
			{
				label: 'Check&box1',
				type: 'checkbox',
				checked: true,
				click: (item) => {
					console.log('item is checked? ' + item.checked)
				}
			},
			{ type: 'separator' },
			{
				label: 'Che&ckbox2',
				type: 'checkbox',
				checked: false,
				click: (item) => {
					console.log('item is checked? ' + item.checked)
				}
			}
		]
	},
	{
		label: '',
		submenu: [
			{
				label: 'Go to &Home using Native Image'
			},
			{
				label: 'Run using string',
				submenu: [
					{
						label: 'Submenu of run'
					},
					{
						label: 'Print',
					},
					{
						type: 'separator'
					},
					{
						label: 'Item 2 of submenu of run'
					}
				]
			}
		]
	}
]