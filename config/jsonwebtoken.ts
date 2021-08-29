import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.get("authorization")

    if (token) {
        token = token.slice(7);
        verify(token, "qwe1234", (error, decoded) => {
            if (error) {
                res.status(401).json({
                    success: false,
                    message: "Invalid token"
                })
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({
            success: false,
            message: "No es un usuario autorizado"
        })
    }
}