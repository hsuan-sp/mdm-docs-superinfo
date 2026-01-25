/**
 * 統一的 Email 網域校驗邏輯
 * 確保與 AuthGuard 的正則表達式完全一致
 */
export function isAuthorizedEmail(email: string | undefined | null): boolean {
  if (!email) {
    console.log("[Auth Debug] No email provided to validation");
    return false;
  }
  const normalizedEmail = email.toLowerCase().trim();
  const isEdu = /\.edu\.tw$/i.test(normalizedEmail);
  const isOfficial = /@superinfo\.com\.tw$/i.test(normalizedEmail);

  console.log(
    `[Auth Debug] Validating: ${normalizedEmail} | Result: ${isEdu || isOfficial}`
  );
  return isEdu || isOfficial;
}
