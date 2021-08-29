import { Router } from 'express'
import { createPhoto, getPhotos, getPhotoById, deletePhoto, updatePhoto } from '../controllers/photo.controller';
import multer from '../libs/multer'

const router = Router()

router.route('/photos')
    .post(multer.single('image'), createPhoto)
    .get(getPhotos)

router.route('/photo/:id')
    .get(getPhotoById)
    .delete(deletePhoto)
    .put(updatePhoto)

export default router;