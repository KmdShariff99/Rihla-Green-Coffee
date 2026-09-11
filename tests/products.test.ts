import assert from "node:assert/strict";
import test from "node:test";

import { allProducts, categories } from "../lib/products";

const requiredSpecificationFields = [
  "family",
  "preparation",
  "origin",
  "moisture",
  "screen",
  "tolerance",
] as const;

const expectedGradeNames = [
  "Plantation PB",
  "Plantation A",
  "Plantation B",
  "Plantation C",
  "Plantation Blacks",
  "Plantation Bits",
  "Plantation Bulk",
  "Plantation AA",
  "Plantation PB Bold",
  "Arabica Cherry PB",
  "Arabica Cherry AB",
  "Arabica Cherry C",
  "Arabica Cherry Blacks/Browns",
  "Arabica Cherry Bits",
  "Arabica Cherry Bulk",
  "Arabica Cherry AA",
  "Arabica Cherry A",
  "Arabica Cherry PB Bold",
  "Robusta Parchment PB",
  "Robusta Parchment AB",
  "Robusta Parchment C",
  "Robusta Parchment Blacks/Browns",
  "Robusta Parchment Bits",
  "Robusta Parchment Bulk",
  "Robusta Parchment A",
  "Robusta Parchment PB Bold",
  "Robusta Cherry PB",
  "Robusta Cherry AB",
  "Robusta Cherry C",
  "Robusta Cherry Blacks/Browns",
  "Robusta Cherry Bits",
  "Robusta Cherry Bulk",
  "Robusta Cherry Clean/Bulk",
  "Robusta Cherry AA",
  "Robusta Cherry A",
  "Robusta Cherry PB Bold",
  "Mysore Nuggets Extra Bold",
  "Robusta Kaapi Royale",
  "Monsooned Malabar AAA",
  "Monsooned Malabar AA",
  "Monsooned Malabar A",
  "Monsooned Malabar Arabica Triage",
  "Monsooned Malabar Robusta RR",
  "Monsooned Malabar Robusta Triage",
  "Liberia Bulk",
  "Excelsia Bulk",
] as const;

test("catalogue contains the complete official grade register", () => {
  const actualNames = allProducts.map(product => product.name);
  const uniqueNames = new Set(actualNames);

  assert.equal(actualNames.length, 46, "catalogue must contain exactly 46 grades");
  assert.equal(uniqueNames.size, 46, "all grade names must be unique");
  assert.deepEqual(
    [...uniqueNames].sort(),
    [...expectedGradeNames].sort(),
    "official grade names must not be removed, added, or altered",
  );
});

test("official grade category totals remain unchanged", () => {
  const actualTotals = Object.fromEntries(
    categories.map(category => [category.slug, category.grades.length]),
  );

  assert.deepEqual(actualTotals, {
    arabica: 18,
    robusta: 18,
    specialty: 8,
    miscellaneous: 2,
  });
});

test("every grade has complete required specifications", () => {
  const incompleteFields = allProducts.flatMap(product =>
    requiredSpecificationFields
      .filter(field => product[field].trim().length === 0)
      .map(field => `${product.name}.${field}`),
  );

  assert.deepEqual(
    incompleteFields,
    [],
    `fill in required grade specifications: ${incompleteFields.join(", ")}`,
  );
});

test("grade specifications do not contain vague placeholder wording", () => {
  const vaguePlaceholder = /\bas per norms?\b/i;
  const vagueFields = allProducts.flatMap(product =>
    Object.entries(product)
      .filter(([, value]) => typeof value === "string" && vaguePlaceholder.test(value))
      .map(([field]) => `${product.name}.${field}`),
  );

  assert.deepEqual(
    vagueFields,
    [],
    `replace vague placeholder wording in: ${vagueFields.join(", ")}`,
  );
});