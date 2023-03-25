const fs = require('fs');
const path = require('path');


exports.deleteAvatar = async (req, res) => {

	await fs.unlink("public/uploads/avatars/" + req.body.avatar, (data, err) => {
		if (err) throw err;

		return (data || err);

	});
}


exports.one = async (req, res) => {
	res.sendFile(`avatars/${req.params.avatar}`, {
		root: 'public/uploads'
	})
}


/* function deleteLastAvatar(name) {
	fs.unlink("public/uploads/images/" + name, (data, err) => {
		if (err) throw err;
	});
} */