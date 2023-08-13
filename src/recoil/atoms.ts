import { atom } from 'recoil';

const FilesPicked  = atom<File[]>({
  key: 'filesToUpload',
  default: []
})

const UploadPercentages = atom<number[]>({
  key: 'percentages',
  default: []
})

export { UploadPercentages, FilesPicked } 