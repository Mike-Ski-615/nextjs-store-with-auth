/**
 * Generate a consistent color for a user based on their user ID
 * @param userId - The user's unique identifier
 * @returns A hex color string
 */
export function generateUserColor(userId: string): string {
  // Predefined color palette for collaboration
  const colors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#FFA07A', // Light Salmon
    '#98D8C8', // Mint
    '#F7DC6F', // Yellow
    '#BB8FCE', // Purple
    '#85C1E2', // Sky Blue
    '#F8B739', // Orange
    '#52B788', // Green
    '#E76F51', // Coral
    '#2A9D8F', // Dark Teal
  ];

  // Simple hash function to generate consistent index from userId
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Get color index
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
