export const locationDisplayName = (location: string): string => {
  const map: Record<string, string> = {
    home: 'Home',
    hospital: 'Hospital',
    garage: 'Garage',
    road: 'Road',
    all: 'All Locations',
  };

  return map[location] ?? location;
};
