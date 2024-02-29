require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.static('public'));
const handlebars = require("express-handlebars");
const moment = require("moment");
const Post = require("./models/Post");

//Config
// Configura o moment para o locale brasileiro
moment.locale("pt-br");

//Template Engine
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      formatDate: function (date) {
        return moment(date).format("dddd, DD/MM/YYYY HH:mm");
      },
    },
  })
);
app.set("view engine", "handlebars");

//Middleware de análise de corpo do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rotas
app.get("/", function (req, res) {
  Post.findAll({ order: [["id", "DESC"]] }).then(function (posts) {
    res.render("home", { postagens: posts });
  });
});

app.get("/postagem", function (req, res) {
  res.render("formulario");
});

app.post("/add", function (req, res) {
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
  }).then(function () {
      res.redirect("/");
    }).catch(function (erro) {
      res.send("Houve um erro: " + erro);
    });
});

app.get("/deletar/:id", function (req, res) {
  Post.destroy({ where: { id: req.params.id } })
    .then(function () {
      res.render("deletar");
      // res.send("Postagem deletada com sucesso!");
    })
    .catch(function (erro) {
      res.send("Esta postagem não existe.");
    });
});

//Porta do servidor
app.listen(8082, function () {
  console.log("Servidor rodando.");
});
