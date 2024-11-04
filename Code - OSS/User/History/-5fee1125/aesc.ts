export function getFirstAndLastName(fullName: string): string {
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0];
    }
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    return `${firstName} ${lastName}`;
  }