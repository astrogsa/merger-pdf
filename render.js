// Button Click - Selecionar arquivos
const btnSelect = document.getElementById('src-files');
const fileNames = document.getElementById('files-area');
// Button Click - Mesclar arquivos
const btnMerger = document.getElementById('merger-files');
//Visualização da listagem quando VAZIO
const pTemporary = document.getElementById('ptemporary');
//Visualização da tela de Loading
const areaLoading = document.getElementById('loading-area');


btnSelect.addEventListener('click', async () => {
    const filePath = await window.electronAPI.selectFiles();
    
    if(filePath === undefined || null || false){
      fileNames.innerHTML = "<p id='ptemporary'>Aguardando PDFs ...</p>"
    }else {
      fileNames.innerHTML = `<p id="src-file-names">${filePath}</p><br><br></br>`
    }
    
})

btnMerger.addEventListener('click', async () => {
  try {
    areaLoading.removeAttribute('style');
    const result = await window.electronAPI.mergerFiles();
    console.log(result);
    areaLoading.setAttribute('style',"display: none;");

    if(result[0] === 'success'){
      console.log('Sucesso, o pdf foi criado');
      
      Swal.fire({
        title: 'Sucesso!',
        showCloseButton: true,
        width: 400,
        text: 'O seu pdf foi criado',
        icon: 'success',
        confirmButtonText: 'Abrir',
        confirmButtonColor: '#736CC7',
      }).then((result) => {
        if (result.isConfirmed) {
          window.electronAPI.openFile();
        }
      })

    }else if(result[0] === 'nofiles'){
      console.log('Não foi selecionado nenhum pdf para mesclar!');
      Swal.fire({
        title: 'Aviso!',
        width: 400,
        text: 'Primeiro selecione os Arquivos PDFs que deseja mesclar',
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#736CC7',
      })

    }else if(result[0] === 'onefile'){
      console.log('foi selecionado apenas 1 pdf para mesclar!');
      Swal.fire({
        title: 'Aviso!',
        text: 'Selecione mais de um arquivo para Mesclar',
        icon: 'info',
        width: 400,
        confirmButtonText: 'OK',
        confirmButtonColor: '#736CC7',
      })
    }else if(result[0] === 'cancel') {
       false 
    }

  } catch (error) {
    Swal.fire({
      title: 'Erro!',
      text: 'Não foi possivel Mesclar, revise os arquivos e tente novamente',
      icon: 'error',
      width: 400,
      confirmButtonText: 'OK',
      confirmButtonColor: '#f53c3c',
    })
  }
})