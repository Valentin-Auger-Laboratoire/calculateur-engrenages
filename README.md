# Calculateur de trains d'engrenages

🇫🇷 [Français](#français) · 🇬🇧 [English](#english)

**Essayer l'outil :** https://valentin-auger-laboratoire.github.io/portfolio/outils/engrenages/

---

## Français

### Ce que fait l'outil
Outil web de calcul de trains d'engrenages à denture droite, en HTML / CSS / JavaScript pur (roues dentées dessinées et animées en SVG, aucune bibliothèque).

**Train simple (plusieurs étages)**
- rapport de réduction global et par étage, **sens de rotation** de la sortie ;
- vitesse et **couple de sortie** (avec un rendement par étage) ;
- **entraxes** et diamètres primitifs à partir du module ;
- animation des roues dans le bon rapport (les roues d'un même arbre tournent ensemble) ;
- avertissements : moins de 17 dents (interférence de taillage), rapport trop grand sur un seul étage.

**Train épicycloïdal**
- choix de l'élément fixe (couronne, planétaire ou porte-satellites) et de l'entrée ;
- rapport par la **relation de Willis**, sens de sortie, vitesse des satellites ;
- vérification des **conditions de coaxialité, de montage et de voisinage** ;
- animation du planétaire, des satellites, de la couronne et du porte-satellites.

### Formules
| Grandeur | Formule |
|---|---|
| Rapport d'un étage | ω menée / ω menante = Z menante / Z menée |
| Sens | inversé à chaque contact extérieur |
| Entraxe | a = m·(Z1 + Z2) / 2 |
| Willis | (ωs − ωc) / (ωr − ωc) = − Zr / Zs |
| Coaxialité | Zr = Zs + 2·Zp |
| Montage | (Zs + Zr) divisible par le nombre de satellites |
| Voisinage | (Zs + Zp)·sin(π / n) > Zp + 2 |

### Fichiers
| Fichier | Rôle |
|---|---|
| `engrenages.js` | Moteur de calcul (testable avec Node) |
| `index.html` | Interface, bilingue FR / EN |
| `tests/test.js` | Tests : trains simples, cas classiques d'épicycloïdal, relation de Willis sur 2 000 cas aléatoires, conditions de montage |

```bash
node tests/test.js
```

### Limites
Denture droite sans déport ; pas de calcul de résistance des dents (flexion, pression de contact) ; rendement supposé identique pour chaque étage.

---

## English

### What the tool does
Web tool for spur gear trains, in plain HTML / CSS / JavaScript (gears drawn and animated in SVG, no library).

**Simple train (several stages)**: overall and per-stage ratio, output **direction**, output speed and **torque** (with per-stage efficiency), **centre distances** and pitch diameters from the module, animated gears, warnings (fewer than 17 teeth, too large a ratio on one stage).

**Epicyclic train**: choice of fixed member (ring, sun or carrier) and input, ratio from the **Willis equation**, output direction, planet speed, **coaxiality, assembly and neighbouring** checks, animation of sun, planets, ring and carrier.

### Formulas
See the table above.

### Files
| File | Purpose |
|---|---|
| `engrenages.js` | Calculation engine (testable with Node) |
| `index.html` | User interface, bilingual FR / EN |
| `tests/test.js` | Tests: simple trains, classic epicyclic cases, Willis equation on 2,000 random cases, assembly conditions |

```bash
node tests/test.js
```

### Limitations
Spur gears without profile shift; no tooth strength calculation (bending, contact pressure); same efficiency assumed for every stage.
