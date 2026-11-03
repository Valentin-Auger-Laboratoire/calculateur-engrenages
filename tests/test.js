// Tests du moteur d'engrenages : node tests/test.js
const assert = require('assert');
const E = require('../engrenages.js');
const near = (a, b, msg) => assert.ok(Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b)), msg + ' : ' + a + ' au lieu de ' + b);

// 1. Train simple à 2 étages : (20/60)·(18/54) = 1/9, deux contacts extérieurs -> même sens
let r = E.simpleTrain({ stages: [{ z1: 20, z2: 60, m: 2 }, { z1: 18, z2: 54, m: 2.5 }], nIn: 1500, cIn: 10, eta: 0.98 });
near(r.ratio, 1 / 9, 'rapport');
assert.strictEqual(r.sign, 1);
near(r.nOut, 1500 / 9, 'vitesse de sortie');
near(r.cOut, (10 * 0.98 * 0.98) * 9, 'couple de sortie');
near(r.stages[0].a, 80, 'entraxe étage 1');
near(r.stages[1].a, 90, 'entraxe étage 2');

// 2. Un seul étage : sens inversé
r = E.simpleTrain({ stages: [{ z1: 72, z2: 24, m: 1.5 }], nIn: 300, cIn: 30, eta: 1 });
assert.strictEqual(r.sign, -1);
near(r.nOut, -900, 'multiplicateur');

// 3. Train épicycloïdal Zs = 24, Zp = 24, Zr = 72 : cas classiques
const base = { zs: 24, zp: 24, zr: 72, n: 3, m: 1, nIn: 1000 };
near(E.epicyclic({ ...base, fixed: 'r', input: 's' }).ratio, 24 / 96, 'couronne fixe');
near(E.epicyclic({ ...base, fixed: 'c', input: 's' }).ratio, -24 / 72, 'porte-satellites fixe');
near(E.epicyclic({ ...base, fixed: 's', input: 'r' }).ratio, 72 / 96, 'planétaire fixe');
near(E.epicyclic({ ...base, fixed: 'r', input: 'c' }).ratio, 4, 'couronne fixe, entrée porte-satellites');

// 4. Relation de Willis vérifiée sur 2 000 cas aléatoires
const roles = [['r', 's'], ['r', 'c'], ['s', 'r'], ['s', 'c'], ['c', 's'], ['c', 'r']];
for (let k = 0; k < 2000; k++) {
  const zs = 12 + Math.floor(Math.random() * 60), zr = zs + 2 * (12 + Math.floor(Math.random() * 40));
  const [fixed, input] = roles[k % roles.length];
  const w = E.solveEpi(zs, zr, fixed, input);
  near((w.s - w.c), (-zr / zs) * (w.r - w.c), 'Willis');
  assert.strictEqual(w[fixed], 0); assert.strictEqual(w[input], 1);
}

// 5. Conditions de montage
const codes = (o) => E.epicyclic({ m: 1, nIn: 1000, fixed: 'r', input: 's', ...o }).issues.map((i) => i.code);
assert.ok(codes({ zs: 24, zp: 24, zr: 70, n: 3 }).includes('coax'));
assert.ok(codes({ zs: 20, zp: 25, zr: 70, n: 4 }).includes('mount'));
assert.ok(codes({ zs: 12, zp: 30, zr: 72, n: 6 }).includes('neighbour'));
assert.deepStrictEqual(codes({ zs: 20, zp: 20, zr: 60, n: 4 }), []);

console.log('OK : tous les tests passent');
