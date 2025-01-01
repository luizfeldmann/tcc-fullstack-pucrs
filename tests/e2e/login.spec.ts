import { test, expect } from "@playwright/test";

test("Link to Forgot", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("link", { name: "Forgot my password" }).click();
  await page.waitForURL("**/forgot-password");
});

test("Bad username", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("E-mail address").fill("bad.user@test.com");
  await page.getByLabel("Password").fill("Foobar123@");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("This user does not exist")).toBeVisible();
});

test("Bad password", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("E-mail address").fill("foo.bar@test.com");
  await page.getByLabel("Password").fill("Foobar123!");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("The password is incorrect")).toBeVisible();
});

test("Success", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("E-mail address").fill("foo.bar@test.com");
  await page.getByLabel("Password").fill("Foobar123@");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.waitForURL("**/dashboard");
});
