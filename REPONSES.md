# Réponses — Partie 1 & Partie 2

## Partie 1

**Q1.1** Le dataProvider traduit les actions React-Admin en requêtes HTTP.
jsonServerProvider est une implémentation prête à l'emploi pour json-server.

**Q1.2** GET http://localhost:3002/employees?_sort=id&_order=ASC&_start=0&_end=5
Visible dans l'onglet Network → Fetch/XHR des DevTools (F12).

**Q2.1** rowClick="edit" rend chaque ligne cliquable et redirige vers le formulaire
de modification. On utilise rowClick="show" pour aller vers la fiche détail.

**Q2.2** Avec perPage=2, la liste n'affiche que 2 lignes. Des boutons de pagination
apparaissent pour naviguer vers les pages suivantes.

**Q3.1** React-Admin affiche "Required" en rouge sous le champ. Le formulaire
n'est pas soumis.

**Q3.2** Une erreur "Must be greater than or equal to 1500" s'affiche sous le
champ salaire. Le formulaire n'est pas soumis.

**Q4.1** La méthode PUT est utilisée. Ex: PUT http://localhost:3002/employees/1

**Q4.2** useRecordContext() est disponible dans tout composant enfant d'un
contexte Edit, Show ou ligne de Datagrid. Il retourne undefined si les
données ne sont pas encore chargées, d'où le test `if (!record) return null`.

**Q5.1** SimpleShowLayout affiche les champs verticalement sur une seule page.
TabbedShowLayout les organise en onglets, utile pour beaucoup de champs.

## Partie 2

**Q6.1** ReferenceField génère GET /employees/:id pour chaque managerId unique
rencontré dans la liste. React-Admin optimise en regroupant les IDs distincts
en un seul appel GET /employees?id=1&id=2&id=3.

**Q6.2** Si managerId ne correspond à aucun employé, ReferenceField affiche
une cellule vide ou un indicateur d'erreur à la place du nom du manager.

**Q7.1** POST http://localhost:3002/interns avec le corps JSON des données du
formulaire. C'est le dataProvider.create() qui déclenche cet appel.

**Q7.2** On utilise useWatch (de react-hook-form, intégré à React-Admin) pour
lire la valeur live du champ isRemunerate. Il est nécessaire car la validation
doit réagir en temps réel aux changements du formulaire — une simple prop
statique ne suffit pas.

**Q8.1** ReferenceField est un composant déclaratif dans un layout React-Admin :
il affiche automatiquement les données liées dans une colonne ou un champ Show.
useGetOne est un hook impératif utilisable dans n'importe quel composant custom,
avec contrôle total sur l'affichage des états (chargement, erreur, données).
On préfère useGetOne quand on veut une UI personnalisée ou quand on est en
dehors d'un contexte React-Admin standard.

**Q8.2** Sans `enabled`, useGetOne envoie GET /employees/undefined dès le
premier rendu (avant que le contexte soit chargé), ce qui provoque une erreur
404. `enabled: !!intern?.managerId` bloque la requête tant que l'ID est
undefined, puis la déclenche dès qu'il est disponible.

**Q9.1** ReferenceManyField est un composant déclaratif qui affiche
automatiquement une liste liée dans un layout Show. useGetList est un hook
impératif indispensable quand on veut afficher des données liées dans un
composant complètement custom, hors d'un layout React-Admin, ou avec une
logique d'affichage complexe (comme InternsByManager dans EmployeeShow).

**Q9.2** On passe pagination: { page: 1, perPage: 1 }. json-server renvoie
le total dans le header X-Total-Count même avec un seul résultat, ce qui
évite de charger tous les employés du département en mémoire pour rien.

**Q10.1** useUpdate utilise PUT par défaut. Pour forcer PATCH, on passe
`mutationOptions: { method: 'PATCH' }` ou on configure le dataProvider.

**Q10.2** previousData est nécessaire pour que le dataProvider puisse calculer
la différence entre l'état avant et après la modification. Sans lui, certains
providers envoient une requête incomplète ou lancent une erreur, car ils ont
besoin de l'objet complet original pour construire le body de la requête PUT.

**Q11.1** useCreate est un hook bas niveau utilisable dans n'importe quel
composant sans naviguer. Le composant <Create> de React-Admin est une page
complète avec routing, toolbar et redirect automatiques. useCreate convient
pour les formulaires rapides, modales, ou actions inline.

**Q11.2** On appelle useRefresh() après onSuccess dans le callback de useCreate.
useRefresh force React-Admin à relancer la requête getList, ce qui met à jour
la liste sans rechargement de page.

**Q12.1** Les 4 appels useGetList se font EN PARALLÈLE. React monte tous les
hooks simultanément au rendu du composant Dashboard, et chaque hook déclenche
sa propre requête HTTP indépendamment. Il n'y a pas d'attente entre eux.

**Q12.2** perPage:1 est préférable à perPage:100 car on n'a besoin que du total
(header X-Total-Count), pas des données elles-mêmes. Charger 100 enregistrements
pour n'utiliser que le count gaspille de la bande passante et de la mémoire.
