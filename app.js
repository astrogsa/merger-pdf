// importar bibliotecas e funções
const {app, shell, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const mergerPDF = require('pdf-merger-js');


// instanciar variaveis
var srcFiles = [];
var destFile = null;

// Criar JANELA
function createWindow(){
    var mainWindow = new BrowserWindow ({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.setMenu(null);

    mainWindow.loadFile('index.html');
    //mainWindow.openDevTools();
}
//Instanciar JANELA
app.whenReady().then(() => {
    createWindow();    
})

// Processo de Selecionar arquivos
ipcMain.handle('dialog:openFiles', handleFilesOpen);

// Processo de Mesclar arquivos
ipcMain.handle('dialog:mergerFiles', handleMergerFiles);

// Processo de Arquivo Gerado
ipcMain.on('dialog:openFile', handleOpenFile);

//Fechar processo no Windows
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


//    ---------- FUNÇÔES -----------

function handleOpenFile(){
    shell.openExternal(destFile + '.pdf');
    destFile = null;
}


async function handleFilesOpen(){
    srcFiles = [];

    const {canceled, filePaths} = await dialog.showOpenDialog({
        title : 'Selecione os PDFs',
        buttonLabel : 'OK',
        filters : [
          {
            name : 'PDFs',
            extensions : ['pdf']
          }
        ],
        properties : [
          'multiSelections',
          'openFile'
        ]
      });

    if(canceled){
        srcFiles = [];
        return
    }else{
        srcFiles = srcFiles.concat(filePaths);
        srcFiles.sort();
        var html = "";

        srcFiles.forEach(function(val){

            var fullPath = val.split(path.sep);
            html+= fullPath[fullPath.length - 1] + "<br>";
        });
        
        return html;
    }
}

async function handleMergerFiles(){
    const {canceled, filePath} = await dialog.showSaveDialog({
        title : 'Selecione um destino',
        buttonLabel : 'Salvar',
        filters : [
          {
            extensions : ['pdf']
          }
        ],
      });

    if(canceled){
        result = [];

        result.push('cancel');
        return result;
    }else{

        destFile = filePath;
        var result = [];
        
        var merger = new mergerPDF();

        if(srcFiles.length === 0){
            result.push('nofiles');
            
            return result;
        }else if(srcFiles.length < 2){
            result.push('onefile');
            return result;
        }else {

            for(const file of srcFiles) {
                await merger.add(file)
             }
             try {
                 await merger.save(destFile + '.pdf');
                 
                 result.push('success');
                 result.push(destFile);

                 return result;
             } catch (error) {
                 console.error(error.message);
             }  
        }
        
    }
}
