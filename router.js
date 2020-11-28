var express = require('express');
var router = express.Router();
const url = require('url');
const HandyStorage = require('handy-storage');

const storage = new HandyStorage({
   beautify: true
});

storage.connect('./information.json');
//Import Controllers Here
const UsuarioController = require('./controller/UsuarioController');
const CampeaoController = require('./controller/CampeaoController');
const PartidaController = require('./controller/PartidaController');
const ForumController = require('./controller/ForumController');
const MensagemController = require('./controller/MensagemController');

router.get('/', function (req, res) {

   let localizado = req.query.localizado;
   let id = req.query.id;
   let alertTitle = "";
   let alertMessage = "";

   if (localizado == 'true') {
      localizado = true;
      alertTitle = "Yeei!";
      alertMessage = "Usuário encontrado, Deseja prosseguir?";

      storage.setState({
         searched: true,
         id
      })

   }
   else if (localizado == 'false') {
      localizado = false;
      alertTitle = "Erro !";
      alertMessage = "Usuário não encontrado,Tente Novamente";
      storage.setState({
         searched: false,
         id: null
      })
   }

   res.render('Summoner/home', { localizado, alertTitle, alertMessage, id });
})

router.get('/champion/data', async function (req, res) {
   return res.json(await CampeaoController.store());
})

router.post('/invocador/status', async function (req, res) {

   const user = await UsuarioController.store({ nomeInvocador: req.body.fname });
   let localizado = (user) ? true : false;
   let id = (user) ? user.id : 0;

   res.redirect(url.format({
      pathname: "/",
      query: { localizado, id }
   }));

})

router.get('/invocador/data/:id', async function (req, res) {

   let sessionData = {
      connected: storage.state.searched,
      id: storage.state.id ? storage.state.id : null,
   };

   const id = req.params.id;
   const user = await UsuarioController.getUser(id);
   const Partidas = await PartidaController.store(user);
   await PartidaController.adicionaLocal(Partidas, sessionData.id);

   res.render('Dashboard/dashboard', { Partidas, sessionData });
})

router.get('/partida/data/:id', async function (req, res) {
   const Players = await PartidaController.Detalhes(req.params.id);
   return res.json(Players);
})

router.get('/champion/analise', async function (req, res) {
   const sessionData = {
      connected: storage.state.searched,
      id: storage.state.id ? storage.state.id : null,
   };

   const Campeoes = await CampeaoController.getAll();
   let Usuario = await UsuarioController.getUserByParametros(sessionData.id);
   const UserDetails = (typeof Usuario != 'undefined') ? await UsuarioController.getUserDetails(Usuario.id) : false;

  if(UserDetails) {
      Usuario.detalhes = UserDetails;
  }
  else {
      Usuario = {};
      Usuario.detalhes = {};
  }

   res.render('Champion/analytics', { Campeoes, sessionData, Usuario});
})

router.get('/campeao/by_id/:key', async function (req, res) {
   const Campeao = await CampeaoController.getChampionById(req.params.key);
   const Details = await CampeaoController.getRiotById(Campeao.id);

   if (Details) {
      Campeao.blurb = Object.values(Details)[0].lore;
      Campeao.dataValues.skins = Object.values(Details)[0].skins;
   }

   return res.json(Campeao);
})

router.get('/rank/summoner/:key', async function (req, res) {
   let sessionData = { connected: storage.state.searched, id: storage.state.id ? storage.state.id : null };
   let Usuario = await UsuarioController.getUserByParametros(sessionData.id);
   let Details = await UsuarioController.getLiga(Usuario);

   res.render('Dashboard/dashRank', { Details, sessionData });
})

router.get('/forum', async function(req, res) {
   res.render('Authenticator/login', {success:undefined, id:false});
})

router.get('/autenticacao/registrar', async function(req, res) {
   res.render('Authenticator/registrar', {sucess:undefined, id:false});
})

router.post('/forum/conectar', async function(req, res) {
   
   const userName = req.body.username;
   const password = req.body.userpassword;

   const User = await UsuarioController.getUserBySummonerName(userName);
   let success;
   let id;

   if(User && (User.password == password)) {
      success = true;
      id = User.id;

      storage.setState({
         forum: true,
         id
      })
   }
   else{
      success = false;
      id = false;
   }
      
   res.render('Authenticator/login', {success, id});
})

router.post('/forum/registrar', async function(req, res) {
   
   const userName = req.body.username;
   const userPassword = req.body.userpassword;
   const passwordCheck = req.body.checkpassword;
   let sucess = false;
   let id;

   if(userPassword == passwordCheck)
   {
      const Usuario = await UsuarioController.addForum({userName,userPassword});

      if(Usuario) {
         sucess = true;
         id = Usuario.id;

         storage.setState({
            forum: true,
            id
         })
      }
   }
   else {
      sucess = 'A senha e a contrasenha não coincidem';
   }

   
   res.render('Authenticator/registrar', {sucess, id});
})


router.get('/forum/data/:id', async function(req, res) {
   const id = req.params.id;
   let sessionData = { connected: storage.state.searched, id: storage.state.id ? storage.state.id : null };
   let allTopics = await ForumController.getAll();


   let User = await UsuarioController.getUser(id);
   if(User.forum == 'N')
   {
      res.render('Authenticator/login', {success:undefined, id:false});
   }
   else {
      res.render('Forum/home', {sessionData, allTopics, User});
   }
})

router.post('/forum/topico/criar', async function(req, res) {
   const title = req.body.title;
   const categoria = req.body.categoria;
   const conteudo = req.body.conteudo;

   let sessionData = { connected: storage.state.searched, id: storage.state.id ? storage.state.id : null };

   const Topico = await ForumController.store({title, categoria, id: sessionData.id, conteudo});

   return res.json(Topico);
})

router.get('/forum/topico/:id', async function(req,res) {
   let id = req.params.id;
   let teste = await ForumController.getId(id);
   return res.json(teste);
})

router.post('/forum/topico/responder', async function(req,res) {
   let mensagem = req.body.conteudo;
   let topicoId = req.body.topicoId;
   let sessionData = { connected: storage.state.searched, id: storage.state.id ? storage.state.id : null };

   const Mensagem = await MensagemController.store({mensagem, topicoId, id:sessionData.id});

   return res.json(Mensagem);
})

router.get('/forum/topico/mensagens/:identificador', async function(req, res) {
   const id = req.params.identificador;

   const ListMessages = await MensagemController.getAllByTopicId(id);
   return res.json(ListMessages);
})
module.exports = router;