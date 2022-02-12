const folders = [
  {
    id: 5,
    name: 'Klasör 1',
    files: [
      { id: 17, name: 'profil.jpg' },
      { id: 18, name: 'manzara.jpg' },
    ],
  },
  {
    id: 6,
    name: 'Klasör 2',
    files: [
      { id: 21, name: 'foto.png' },
      { id: 22, name: 'dosya.xls' },
    ],
  },
  {
    id: 7,
    name: 'Klasör 3',
  },
]

const getFile = function (id) {
  const returnObj = {}
  returnObj.parent = folders.find((folder) => {
    if (!folder.files) return false
    let index
    const foundFile = folder.files.find((file,i) => {
      if (file.id === id){
        index = i
        return true
      }
    })
    if (foundFile) {
      returnObj.file = foundFile
      returnObj.fileIndex = index
      return true
    }
  }}
  if (!returnObj.file) throw "Source file not found"
  return returnObj
}

const getFolder = function (id) {
  let index
  const folder = folders.find((folder,i) => {
    if (folder.id === id){
      index = i
      return true
    }
  })
  if (!folder) throw "Folder not found"
  return {
    folder: folder,
    folderIndex: index,
  }
}

const move = function (fileId, targetFolderId) {
  const source = getFile(fileId)
  const target = getFolder(targetFolderId)
  if (source.parent.id === targetFolderId) throw "File is already in target directory"
  source.parent.files.splice(source.fileIndex, 1)
  target.folder.files ||= []
  target.folder.files.push({...source.file})
}

const copy = function (fileId, targetFolderId) {
  const source = getFile(fileId)
  const target = getFolder(targetFolderId)
  target.folder.files ||= []
  target.folder.files.push({...source.file})
}

const remove = function (fileId) {
  const source = getFile(fileId)
  source.parent.files.splice(source.fileIndex, 1)
}

const removeFolder = function (folderId) {
  const source = getFolder(folderId)
  folders.splice(source.folderIndex, 1)
}

const parentFolderOf = function(fileId){
    return getFile(fileId).parent.id
}
