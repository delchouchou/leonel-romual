# Tester les billets QR

Le parcours fonctionne sans Supabase : la liste des invités est conservée côté serveur dans `src/config/guest-list.ts`. Les 20 entrées actuelles sont fictives.

## Essai

1. Déployez la dernière version sur Vercel en poussant le commit sur `main`.
2. Ouvrez `/mon-billet`, entrez un nom de la liste, par exemple **Aline Fotso**, puis affichez et téléchargez le billet PDF.
3. À l’entrée, ouvrez `/controle-acces` sur le téléphone de l’accueil et scannez le billet. Si le navigateur ne sait pas scanner avec sa caméra, ouvrez le QR avec l’appareil photo du téléphone ou collez son code/lien dans le champ.
4. Vérifiez le nom affiché, cherchez-le sur la feuille commune et cochez-le à l’entrée.

## Avant le mariage

Remplacez les noms fictifs dans `src/config/guest-list.ts` par les vrais invités. Chaque invitation doit avoir un `code` distinct ; `places` indique le nombre de personnes admises avec ce billet. Poussez ensuite cette mise à jour sur `main` pour la déployer.

Le site valide que le QR correspond à un nom de la liste, mais ne conserve pas les coches. La feuille commune de l’accueil sert à vérifier qu’un invité n’a pas déjà été admis. Les agents doivent donc la consulter et la mettre à jour ensemble.
