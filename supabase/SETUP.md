# Billets nominatifs et contrôle d'entrée

Le système utilise Supabase pour garder les billets et les entrées dans une base partagée. La liste locale contient 20 noms fictifs pour tester le parcours de bout en bout.

## Préparer Supabase

1. Créez un projet Supabase.
2. Dans **SQL Editor**, exécutez tout le fichier `wedding_tickets.sql`. Il crée la table privée des billets et ajoute les 20 invités fictifs.
3. Dans les paramètres du projet Supabase, copiez l’URL du projet et sa clé secrète `sb_secret_...` (clé API secrète, à garder privée).
4. Dans Vercel, ouvrez **Settings → Environment Variables** et ajoutez `SUPABASE_URL`, `SUPABASE_SECRET_KEY` et `CHECKIN_PIN`. Choisissez un code long que seule l’équipe d’accueil connaît. Ces valeurs sont des variables serveur ; ne les préfixez jamais par `NEXT_PUBLIC_`.
5. Redéployez le site.

La clé Supabase secrète ne doit jamais apparaître dans le navigateur ou dans le dépôt Git. Les routes API du site l’utilisent uniquement côté serveur et exigent le code d’équipe pour lister des billets ou valider une entrée.

## Parcours de test

- **Invité :** ouvre `/mon-billet`, saisit son nom complet (par exemple « Aline Fotso »), voit son billet et l’enregistre en PDF avec le QR.
- **Accueil :** ouvre `/controle-acces`, saisit le code d’équipe et scanne le QR. La page affiche le nom et le nombre de places, puis enregistre l’entrée.
- **Second scan :** le billet est refusé comme déjà utilisé, même depuis un autre téléphone, car l’état est conservé dans Supabase.
- **Équipe des mariés :** `/gestion-billets` permet de consulter la liste, d’ajouter les vrais invités et de créer un QR nominatif pour chacun.

Si le navigateur de scan ne prend pas en charge la caméra intégrée, l’accueil peut scanner le QR avec l’appareil photo du téléphone, ouvrir le billet, puis choisir « Équipe d’accueil : vérifier ce billet ». Le code d’équipe reste requis pour enregistrer l’entrée.

Les 20 entrées SQL sont marquées comme fictives et peuvent servir à répéter les scans. Avant le mariage, ajoutez les vrais invités depuis `/gestion-billets`, puis retirez les billets de démonstration dans le SQL Editor :

```sql
delete from public.wedding_tickets where is_demo = true;
```

Un QR nominatif est un billet personnel : l’accueil doit vérifier que le nom affiché correspond à la personne qui le présente. Le contrôle empêche une seconde utilisation après le premier scan. Comme pour tout billet transmissible, il ne peut pas empêcher quelqu’un de partager son QR avant le premier scan ; la vérification du nom par l’équipe est donc nécessaire.
