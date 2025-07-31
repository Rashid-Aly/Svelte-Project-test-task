
export function setOperatorTokenCookie(token) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
  
    document.cookie = `operator_token=${token}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
  }