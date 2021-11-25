# GROUPOMANIA

## Introduction

Groupomania est un projet d'étude visant à apprendre à créer un réseau social complet et sécurisé. Créé avec le framework React pour le front, EXPRESS pour l'API, et SQL pour la base de données. Ce réseau social est rapide, simple et efficace.

Je m'appelle [Alexandre LEMAS](https://www.linkedin.com/in/alexandre-lemas), étudiant chez Openclassrooms, et voici mon projet N°7.

👇 Je vous invite à tester mon projet en suivant les instructions ci-dessous. 👇

## 💡 Comment télécharger et faire fonctionner Groupomania ? 💡

### 1 - Télécharger ⬇

Je vous invite à appuyer sur le bouton vert nommé "Code" en haut à droite de cette page, puis cliquez sur "Download ZIP".
Une fois ça fait, dézippez le projet, et placez le quelque part sur votre ordinateur.

### 2 - Installer les packages 🛠

Attention, pour pouvoir installer les packages, il faut avoir Node et NPM sur votre ordinateur. Si ce n'est pas déjà fait, je vous invite à suivre ce lien => https://nodejs.org/fr/download/

Je vous invite à ouvrir un terminal dans le dossier du projet, puis à exécuter les commandes suivantes, une par une :

`cd backend`

`mkdir images`

`npm install`

`cd ../`

`cd groupomania`

`npm install`

Une fois ces commandes effectuées, deux dossiers "node_modules" ont été créé, un au niveau de l'API, puis un autre au niveau du front.

### 3 - Importer la base de données 💾

Attention, pour pouvoir importer la base de données, il faut avoir installé l'environnement MySQL Workbench. Si ce n'est pas déjà fait, je vous invite à suivre ce lien => https://www.mysql.com/fr/products/workbench/

Ici, je vais vous montrer comment importer la base de données via MySQL Workbench, il y a d'autres manières de faire, mais celle-ci est la plus simple à comprendre pour tous.

#### 3.1 - Créer une base de données

Ouvrez mySQL Workbench, puis connectez vous.

À gauche de votre écran, il y a un menu 'Navigator' et un section 'Schemas'. Faites y un clique droit puis 'Create Schema...'.

Dans la fenêtre qui vient d'apparaître, il y a un champ 'Name', complétez le avec 'groupomania', puis cliquez sur 'Apply'.

Si tout, c'est bien passé, un nouveau schéma nommé 'groupomania' est apparu dans le menu 'Navigator' section 'Schemas'.

#### 3.2 - Importer la base de données

Cliquez sur 'Server' puis 'Data Import' dans le menu en haut.

Sélectionnez 'Import from Self-Contained File' puis mettez la route vers le fichier 'groupomania23_11_21.sql' situé à la racine du projet.

Sélectionnez 'groupomania' au niveau de 'Default Target Schema'.

Cliquez sur 'Import Progress' puis 'Start import'.

Faite un clique droit puis 'Refresh All' sur la base de données 'groupomania'. Dans la section 'Tables' trois table sont normalement apparu. Il y a 'comments', 'posts', et 'users'.

Et voilà, la base de données est prête à être utilisé !

### 3 - Ajouter les variables d'environnement 🔗

Pour des raisons de sécurité, certaines données ne sont pas codés en dur. À la place, des chemins vers des variables d'environnement y sont placés. Ces fameuses variables d'environnement sont stockées dans un fichier ".env" que seul moi [Alexandre LEMAS](https://www.linkedin.com/in/alexandre-lemas) possède.

Si vous souhaitez obtenir ce fichier, contactez-moi sur [Linkedin](https://www.linkedin.com/in/alexandre-lemas).

Une fois ce fichier récupéré, placez le dans le dossier "backend" puis ouvrez le.

Dans ce fichier, il y a les clés de chiffrement, et aussi les données de connexion à la base de données SQL.

Je vous invite à rentrer votre username et mot de passe, mais aussi de vérifier que le nom de la base est bon.

### 5 - Lancer le projet 🚀

Je vous invite à ouvrir un terminal dans le dossier du projet, puis à exécuter les commandes suivantes, une par une :

`cd backend`

`nodemon serve`

Gardez votre terminal ouvert, et ouvrez en un deuxième à la racine du projet. Vous y exécuterez la commande ci-dessous :

`cd groupomania`

`npm start`

✨ Félicitations vous venez de terminer l'installation, et la configuration de ce projet. ✨

Je vous invite maintenant à l'ouvrir en cliquant sur le lien suivant => http://localhost:3001/

## 🔒 Respect du RGPD et des standards de l'OWASP 🔒

### 💾 Le RGPD 💾

La définition du RGPD selon la [CNIL](https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on) :

> Le sigle RGPD signifie « Règlement Général sur la Protection des Données » (en anglais « General Data Protection Regulation » ou GDPR). Le RGPD encadre le traitement des données personnelles sur le territoire de l’Union européenne.
> Le contexte juridique s’adapte pour suivre les évolutions des technologies et de nos sociétés (usages accrus du numérique, développement du commerce en ligne…).
> Ce nouveau règlement européen s’inscrit dans la continuité de la Loi française Informatique et Libertés de 1978 et renforce le contrôle par les citoyens de l’utilisation qui peut être faite des données les concernant.
> Il harmonise les règles en Europe en offrant un cadre juridique unique aux professionnels. Il permet de développer leurs activités numériques au sein de l’UE en se fondant sur la confiance des utilisateurs.

#### En quoi Groupomania respecte mes données ?

Chez Groupomania, nous sécurisons vos données, et cryptons votre mot de passe avec le puissant module [Bcrypt](https://fr.wikipedia.org/wiki/Bcrypt), et votre email avec [CryptoJS](https://cryptojs.gitbook.io/docs/). De plus, vous pouvez supprimer vos données et votre compte via l'app.

#### Je veux supprimer mes données !

Si vous souhaitez supprimer vos données, allez dans la page paramètre et suivez les instructions.

### 📝 Les standards de L'OWASP 📝

Définition de l'OWASP selon [l'OWASP](https://owasp.org/) :

> L'Open Web Application Security Project ® (OWASP) est une fondation à but non lucratif qui travaille à améliorer la sécurité des logiciels. Grâce à des projets de logiciels open source menés par la communauté, des centaines de sections locales dans le monde, des dizaines de milliers de membres et des conférences éducatives et de formation de premier plan, la Fondation OWASP est la source pour les développeurs et les technologues de sécuriser le Web.
> => Outils et ressources
> => Communauté et réseautage
> => Éducation et formation
> Pendant près de deux décennies, des entreprises, des fondations, des développeurs et des bénévoles ont soutenu la Fondation OWASP et son travail.

#### Groupomania respecte le Top 10 de l'OWASP ?

L'OWASP à créé le [Top 10 des principaux risques de sécurité des application Web](https://owasp.org/www-project-top-ten/) à respecter si on veut se prémunir des attaques les plus communes.

Voici une énumération de ces 10 principaux risques, et comment Groupomania les respectes :

1. [Contrôles d'accès défaillants](https://owasp.org/Top10/fr/A01_2021-Broken_Access_Control/)

   Les routes de l'API sont sécurisées, et accessibles seulement avec le TOKEN d'authentification. De plus, nous utilisons la dernière version d'EXPRESS.

2. [Défaillances cryptographiques ](https://owasp.org/Top10/fr/A02_2021-Cryptographic_Failures/)

   Utilisation du package BCRYPT, pour crypter les mots de passe.
   Utilisation du package CryptoJS, pour crypter les e-mails.

3. [Injection SQL](https://owasp.org/Top10/fr/A03_2021-Injection/)

   Utilisation d'une fonction utilisant du REGEX pour détecter les injections SQL.

4. [Conception non sécurisée](https://owasp.org/Top10/fr/A04_2021-Insecure_Design/)

   Mise en place de systèmes sécurisé via des tests, et de l'anticipation d'attaques.

5. [Mauvaise configuration de sécurité](https://owasp.org/Top10/fr/A05_2021-Security_Misconfiguration/)

   La dernière version d'EXPRESS est utilisée, et les requêtes en base de données sont contrôlées et sécurisées.

6. [Composants vulnérables et obsolètes](https://owasp.org/Top10/fr/A06_2021-Vulnerable_and_Outdated_Components/)

   Groupomania utilise les dernières versions d'EXPRESS et de ces packages.

7. [Identification et authentification de mauvaise qualité](https://owasp.org/Top10/fr/A07_2021-Identification_and_Authentication_Failures/)

   Les routes de l'API sont sécurisées, les routes fermées sont accessibles seulement avec le TOKEN d'authentification. De plus, nous utilisons la dernière version d'EXPRESS.

8. [Carence des systèmes de contrôle et de journalisation](https://owasp.org/www-project-top-ten/2017/A8_2017-Insecure_Deserialization)

   Packages connus et mis à jour régulièrement utilisé.

9. [Carence des systèmes de contrôle et de journalisation](https://owasp.org/Top10/fr/A09_2021-Security_Logging_and_Monitoring_Failures/)

   Contact avec les équipes en cas de problème, et une équipe de maintenance de l'application web est en place.

10. [Falsification de requête côté serveur](https://owasp.org/Top10/fr/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/)

Système sécurisé avec un TOKEN d'authentification valable 24H par utilisateur.
