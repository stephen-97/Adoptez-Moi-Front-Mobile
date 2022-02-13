import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { COLORS, SIZES } from "../../constants";
import CloseModal from "./CloseModalButton";

const ConditionsUtilisation = (props) => {


  return (
    <>
      <View style={styles.header}>
        <View style={styles.closeModalView}>
          <CloseModal navigation={() =>props.navigation.goBack(null)}/>
        </View>
        <Text style={styles.title}>Conditions</Text>
      </View>
      <ScrollView style={styles.miniWindowContainer}>
        <Text>
          {`Conditions générales d'utilisation de l'application "Prenez moi"


ARTICLE 1 : Objet

Les présentes « conditions générales d'utilisation » ont pour objet l'encadrement juridique de l’utilisation de l'application "Prenez moi" et de ses services.

Ce contrat est conclu entre :

Le gérant du site internet, ci-après désigné Stephen Loiola Bastos,

Toute personne physique ou morale souhaitant accéder à l'application et à ses services, ci-après appelé « l’Utilisateur ».

Les conditions générales d'utilisation doivent être acceptées par tout Utilisateur, et son accès au site vaut acceptation de ces conditions.


ARTICLE 2 : Mentions légales

Pour les personnes morales :

L'applicaiton "Prenez moi" est édité par la société "Stephen 2iTech",  au capital de 0 €, dont le siège social est situé au 9bis rue Françoise Dolto 75013.

La société est représentée par Loiola Bastos Stephen.


Pour les personnes physiques : 

L'applicaition "Prenez moi" est édité par Loiola Bastos Stephen, domicilié au 9bis rue Françoise Dolto 75013.



ARTICLE 3 : accès aux services

L’Utilisateur de l'application "Prenez moi" a accès aux services suivants :
    • Consultation des annonces des autres utilisateurs. 
    • Contact avec les utilisateurs originaires de ces annonces si leurs coordonnées sont spécifiés

Tout Utilisateur ayant accès a internet peut accéder gratuitement et depuis n’importe où à l'application "Prenez moi". Les frais supportés par l’Utilisateur pour y accéder (connexion internet, matériel informatique, etc.) ne sont pas à la charge de l’Éditeur.

Les services suivants ne sont pas accessible pour l’Utilisateur que s’il est membre du site (c’est-à-dire qu’ile st identifié à l’aide de ses identifiants de connexion) :
    • Création d'un compte utilisateur à l'aide de son adresse mail personnel.
    • Création d'une annonce pour vendre ou faire adopter un animal si toutes les conditions sont conformes à la loi française. L'annonce devra être le plus détaillé possible, l'annonce affichera obligatoirement l'adresse mail de l'utilisateur, le numéro de téléphone est optionnel. 
    • Consultation des annonces des autres utilisateurs. 

Le site et ses différents services peuvent être interrompus ou suspendus par l’Éditeur, notamment à l’occasion d’une maintenance, sans obligation de préavis ou de justification.


ARTICLE 4 : Responsabilité de l’Utilisateur

L'Utilisateur est responsable des risques liés à l’utilisation de son identifiant de connexion et de son mot de passe. 

Le mot de passe de l’Utilisateur doit rester secret. En cas de divulgation de mot de passe, l’Éditeur décline toute responsabilité.

L’Utilisateur assume l’entière responsabilité de l’utilisation qu’il fait des informations et contenus présents sur l'application "Prenez moi".

Tout usage du service par l'Utilisateur ayant directement ou indirectement pour conséquence des dommages doit faire l'objet d'une indemnisation au profit du site.

Le site permet aux membres de publier sur le site :
    • Une annonce

Le membre s’engage à tenir des propos respectueux des autres et de la loi et accepte que ces publications soient modérées ou refusées par l’Éditeur, sans obligation de justification. 

En publiant sur le site, l’Utilisateur cède à la société éditrice le droit non exclusif et gratuit de représenter, reproduire, adapter, modifier, diffuser et distribuer sa publication, directement ou par un tiers autorisé.

L’Éditeur s'engage toutefois à citer le membre en cas d’utilisation de  sa publication



ARTICLE 5 : Responsabilité de l’Éditeur

Tout dysfonctionnement du serveur ou du réseau ne peut engager la responsabilité de l’Éditeur.

De même, la responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et insurmontable d'un tiers.

L'application "Prenez moi" s'engage à mettre en œuvre tous les moyens nécessaires pour garantir la sécurité et la confidentialité des données. Toutefois, il n’apporte pas une garantie de sécurité totale.

L’Éditeur se réserve la faculté d’une non-garantie de la fiabilité des sources, bien que les informations diffusées su le site soient réputées fiables.


ARTICLE 6 : Propriété intellectuelle

Les contenus de l'application "Prenez moi" (logos, textes, éléments graphiques, vidéos, etc.) son protégés par le droit d’auteur, en vertu du Code de la propriété intellectuelle.

L’Utilisateur devra obtenir l’autorisation de l’éditeur du site avant toute reproduction, copie ou publication de ces différents contenus.

Ces derniers peuvent être utilisés par les utilisateurs à des fins privées ; tout usage commercial est interdit.

L’Utilisateur est entièrement responsable de tout contenu qu’il met en ligne et il s’engage à ne pas porter atteinte à un tiers.

L’Éditeur du site se réserve le droit de modérer ou de supprimer librement et à tout moment les contenus mis en ligne par les utilisateurs, et ce sans justification.


ARTICLE 7 : Données personnelles

L’Utilisateur doit obligatoirement fournir des informations personnelles pour procéder à son inscription sur le site. 

L’adresse électronique (e-mail) de l’utilisateur pourra notamment être utilisée par le site [nom de votre site] pour la communication d’informations diverses et la gestion du compte.

"Prenez moi" garantie le respect de la vie privée de l’utilisateur, conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.

Le site est déclaré auprès de la CNIL sous le numéro suivant : [numéro].

En vertu des articles 39 et 40 de la loi en date du 6 janvier 1978, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur exerce ce droit via :

    • Son espace personnel sur le site ;
    • Un formulaire de contact ;
    • Par mail à "stephen.loiola@gmail.com" ;
    • Par voie postale au [votre adresse].


ARTICLE 8 : Liens hypertextes

Les domaines vers lesquels mènent les liens hypertextes présents sur le site n’engagent pas la responsabilité de l’Éditeur de [votre site], qui n’a pas de contrôle sur ces liens.

Il est possible pour un tiers de créer un lien vers une page du site [votre site] sans autorisation expresse de l’éditeur.


ARTICLE 9 : Évolution des conditions générales d’utilisation

L'application "Prenez moi" se réserve le droit de modifier les clauses de ces conditions générales d’utilisation à tout moment et sans justification.


ARTICLE 10 : Durée du contrat

La durée du présent contrat est indéterminée. Le contrat produit ses effets à l'égard de l'Utilisateur à compter du début de l’utilisation du service.


ARTICLE 11 : Droit applicable et juridiction compétente

Le présent contrat dépend de la législation française. 
En cas de litige non résolu à l’amiable entre l’Utilisateur et l’Éditeur, les tribunaux de Paris sont compétents pour régler le contentieux.
`}
        </Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  miniWindowContainer: {
    zIndex: 100,
    padding: 15,
    paddingBottom: 50,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: COLORS.secondary,
    height: 110,
    justifyContent: "center",
  },
  closeModalView: {
    position: "absolute",
    height: 20,
    backgroundColor: "red",
    top: 40,
    left: 50,
    zIndex: 1,
  },
  title: {
    fontSize: SIZES.h2,
    width: "100%",
    position: "absolute",
    textAlign: "center",
  }
});

export default ConditionsUtilisation;
