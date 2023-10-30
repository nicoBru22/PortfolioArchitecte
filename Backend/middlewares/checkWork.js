module.exports = (req, res, next) => {
	console.log("On rentre ici direct? ", req)
	try{
		console.log("On entre ici ????")
		const host = req.get('host');
		console.log("host", host)
		console.loog("on a un body", req.body)
		const title = req.body.title.trim() ?? undefined;
		console.log("le titre title :", title)
		const categoryId = parseInt(req.body.category) ?? undefined;
		console.log("la categorie categoryID : ", categoryId)
		const userId = req.auth.userId ?? undefined;
		console.log("le userID :", userId)
		const imageUrl = `${req.protocol}://${host}/images/${req.file.filename}` ?? undefined;
		console.log("l'imageURL :", imageUrl)
		console.log("le req.file :", req.file)
		console.log(title,categoryId,userId,imageUrl)
		if(title !== undefined &&
			title.length > 0 &&
			categoryId !== undefined &&
			categoryId > 0 &&
			userId !== undefined &&
			userId > 0 &&
			imageUrl !== undefined){
			req.work = {title, categoryId, userId, imageUrl}
			next()
		}else{
			return res.status(400).json({error: new Error("Bad Request")})
		}
	}catch(e){
		console.log("Dans le catch ???")
		return res.status(500).json({error: new Error("Something wrong occured")})
	}

}
