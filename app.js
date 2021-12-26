const express = require('express');
const { sequelize, User, Post } = require('./models');
const user = require('./models/user');
const app = express();
app.use(express.json());

app.get("/users", async function(req, res) {
    try {
        const users = await User.findAll();
        return res.json(users)
    } catch (err) {
        return res.status(500).json(err);
    }
})

app.get("/posts", async function(req, res) {
    try {
        const posts = await Post.findAll({ include: [{ model: User, as: 'user' }] });
        return res.json(posts)
    } catch (err) {
        return res.status(500).json(err);
    }
})

app.get("/users/:uuid", async function(req, res) {
    const uuid = req.params.uuid;
    try {
        const users = await User.findOne({
            where: { uuid: uuid },
            include: 'posts'
        });
        return res.json(users)
    } catch (err) {
        return res.status(500).json(err);
    }
})
app.delete("/users/:uuid", async function(req, res) {
    const uuid = req.params.uuid;
    try {
        const users = await User.findOne({
            where: { uuid: uuid }
        });
        users.destroy();
        return res.json({ message: 'user deleted' })
    } catch (err) {
        return res.status(500).json(err);
    }
})
app.put("/users/:uuid", async function(req, res) {
    const uuid = req.params.uuid;
    const { email, name } = req.body
    try {
        const users = await User.findOne({
            where: { uuid: uuid }
        });
        user.name = name;
        users.email = email;
        await users.save();
        return res.json({ message: 'user deleted' })
    } catch (err) {
        return res.status(500).json(err);
    }
})
app.post('/users', async function(req, res) {
    const { email, name } = req.body
    try {
        const user = await User.create({ email: email, name: name })
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
})

app.post('/posts', async function(req, res) {
    const { userUUID, body } = req.body
    try {
        const user = await User.findOne({ where: { uuid: userUUID } })
        const post = await Post.create({ body: body, userId: user.id })
        return res.json(post);
    } catch (err) {
        return res.status(500).json(err);
    }
})
app.listen({ port: 5000 }, async() => {
    console.log("Server Up...");
    //await sequelize.sync({ force: true });
    await sequelize.authenticate();
    console.log(" Database sync...");
})