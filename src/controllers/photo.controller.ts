import { Request, Response } from 'express'
import Photo from '../models/Photo'
import path from 'path'
import fs from 'fs-extra'

export const createPhoto = async (req: Request, res: Response): Promise<Response> => {
    const { title, description } = req.body;

    if (req.file) {
        const newPhoto = {
            title: title,
            description: description,
            imagePath: req.file.path
        }
        const photo = new Photo(newPhoto)
        await photo.save();

        return res.json({
            message: 'Photo successfully saved!',
            photo
        })
    } else {
        return res.json({
            message: 'You must add an image!'
        })
    }

}

export const getPhotos = async (req: Request, res: Response): Promise<Response> => {
    const photos = await Photo.find()
    return res.json(photos)
}

export const getPhotoById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const photo = await Photo.findById(id)
        if (photo) {
            return res.json(photo)
        } else {
            return res.json({
                message: 'The image does not exist'
            })
        }
    } else {
        return res.json({
            message: 'Enter a valid id'
        })
    }
}

export const deletePhoto = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const photo = await Photo.findByIdAndDelete(id)

        if (photo) {
            let existPhoto = await fs.pathExists(path.resolve(photo.imagePath))
            if (existPhoto) {
                await fs.unlink(path.resolve(photo.imagePath))
                return res.json({
                    message: 'Photo has delete successfully'
                })
            } else {
                return res.json({
                    message: 'The image does not exist in the directory, the saved data will still be erased',
                    existPhoto
                })
            }
        } else {
            return res.json({
                message: 'The image does not exist'
            })
        }
    } else {
        return res.json({
            message: 'Enter a valid id'
        })
    }
}

export const updatePhoto = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { title, description } = req.body

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const updatedPhoto = await Photo.findByIdAndUpdate(id, {
            title,
            description
        }, { new: true })
        return res.json({
            message: 'successfully updated',
            updatedPhoto,
        })
    } else {
        return res.json({
            message: 'Enter a valid id'
        })
    }
}