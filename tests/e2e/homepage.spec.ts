import { test } from "@playwright/test";

test("Link to login", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Login" }).click();
  await page.waitForURL("**/login");
});

test("Link to signup", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Signup" }).click();
  await page.waitForURL("**/signup");
});

test("Link to about", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "About" }).click();
  await page.waitForURL("**/about");
});
