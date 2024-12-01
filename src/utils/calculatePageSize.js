export const calculatePageSize = () => {
  const cardWidth = 220; // Width of each card in pixels
  const cardHeight = 238; // Height of each card in pixels
  const padding = 20; // Padding between cards in pixels

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const cardsPerRow = Math.floor(
    (screenWidth + padding) / (cardWidth + padding)
  ) - 1;
  const rowsPerPage = Math.floor(
    (screenHeight + padding) / (cardHeight + padding)
  ) - 1;

  return cardsPerRow * rowsPerPage;
};