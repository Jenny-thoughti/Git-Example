// TODO: @jenny complete this file
const UserController = {
    getAllUsers: (req, res) => {
        return res.status(200).send({
            count: 5,
            rows: [{}, {}],
        });
    },
};

module.exports = UserController;
