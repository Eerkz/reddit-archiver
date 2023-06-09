const logout = async () => {
  const response = await fetch("/api/logout");
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
};

export { logout };
