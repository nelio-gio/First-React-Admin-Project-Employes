# Réponses aux questions

## Exercice 1

**Q1.1 — Que représente le dataProvider ?**
Le dataProvider est l'interface entre React-Admin et l'API REST. Il traduit
chaque action de l'interface en requête HTTP : lister → GET, créer → POST,
modifier → PUT, supprimer → DELETE. jsonServerProvider est une implémentation
prête à l'emploi compatible avec json-server.

**Q1.2 — Quelle requête HTTP est envoyée au chargement de la liste ?**
GET http://localhost:3002/employees?_sort=id&_order=ASC&_start=0&_end=5
Visible dans l'onglet Network des DevTools du navigateur (F12 → Fetch/XHR).

## Exercice 2

**Q2.1 — Que fait rowClick="edit" sur le Datagrid ?**
Rend chaque ligne cliquable et redirige vers le formulaire de modification
de l'employé. Dans ce projet on utilise rowClick="show" pour aller
vers la fiche détail à la place.

**Q2.2 — Que se passe-t-il avec perPage=2 ?**
La liste n'affiche plus que 2 employés par page. Des boutons de pagination
apparaissent en bas pour naviguer vers les pages suivantes.

## Exercice 3

**Q3.1 — Soumettre sans remplir le prénom ?**
React-Admin affiche une erreur rouge sous le champ : "Required".
Le formulaire n'est pas soumis tant que le champ est vide.

**Q3.2 — Saisir un salaire de 500 € ?**
Une erreur de validation s'affiche sous le champ salaire :
"Must be greater than or equal to 1500". Le formulaire n'est pas soumis.

## Exercice 4

**Q4.1 — Quelle méthode HTTP lors de la sauvegarde ?**
La méthode PUT est utilisée. Ex: PUT http://localhost:3002/employees/1
avec le corps JSON contenant toutes les données de l'employé.

**Q4.2 — Quand useRecordContext() est-il disponible ?**
Uniquement à l'intérieur d'un composant enfant d'Edit, Show, ou d'une
ligne de Datagrid — là où React-Admin fournit un contexte d'enregistrement.
Si les données ne sont pas encore chargées, il retourne undefined,
d'où le test `if (!record) return null` pour éviter une erreur.

## Exercice 5

**Q5.1 — Différence entre SimpleShowLayout et TabbedShowLayout ?**
SimpleShowLayout affiche tous les champs verticalement sur une seule page.
TabbedShowLayout organise les champs en onglets, utile quand il y a
beaucoup de champs à regrouper par catégorie.
