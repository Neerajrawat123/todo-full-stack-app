export const asyncHandler = (reqHandler: any) => {
    return (req: any, res: any, next: any) => {
        Promise.resolve(reqHandler(req, res, next)).catch(err => next(err))
    }
}

