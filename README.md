# HACKATHON QUAI D'ORSAY NUMERIQUE 2017

Application web de démonstration

## Analyse

### Visa

* Nombre de Visas délivré par nationalité  (Fait coté donnée)
* Réfugié / Non réfugié
* Tri par date
* Couverture géographique des visas délivrés (Schengen, Métropole, Dom-Tom)
* Tranche d'âge (du demandeur)
* Sexe (du demandeur)
* Activité consulat (via table msv_service, msv_calendrier) - Délai de traitement
* Motif du visa (rapprochement fam,..) / durée du visa
* Nb Visas par type (court séjour, long séjour, ...)

### CEF

* Nombre des utilisateurs ayant fait une demande / pays  (Fait coté donnée)
* Catégoriser par cursus (niveau d'études) / matières (spécialisations)
* Flux (si dossier accepté)
* Maitrise de la langue
* Temps de traitement du dossier
* Vue globale par année / domaine
* Distribution etudes principale par pays via "camembert"

### REPRESENTATION UI

 * Intégration des données OCDE en base (OK)
 * Données OCDE (Compte Annee et Pays) (OK)
 * Données OCDE (Ranking France) (OK)
 * Mise en place du slider temps (changer l'année en cours) (OK)
 * Fonction de mise à jour (representation année / indicateur --> carte et pays) (OK)
 * Higlight pays sélectionné + affichage en bannière de l'année / pays  (OK)
 * Story déplacements [Odyssey.js]: https://cartodb.github.io/odyssey.js/ (OK)
 * Géocoder les points de déplacements (en Python) (OK)

 ### TODO

 * Titre dans les graphes
 * Taille texte dans Treemap
 * Tooltip sur Treemap (OK)
 * Fixer une couleur par sexe sur le "camembert" (OK)
 * Cacher la pyramide des âges mondiale lors du click sur un pays / ajout bouton pour la réafficher (OK)
 * Tooltip sur le polygon pour les visas
 * Tooltip sur les flux (OK)
 * Tooltip sur les camemberts (OK)
 * Visa / année sur la carte (OK)
 * pyramide des âges par année / pays
