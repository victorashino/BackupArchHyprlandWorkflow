export default function getFirstAndLastName(fullName: string): string {
    if (!fullName.trim()) {
        return "Nome inválido";
    }
    
    const nameParts = fullName.trim().split(/\s+/);
    
    if (nameParts.length === 1) {
        return nameParts[0]; 
    }
    
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    
    return `${firstName} ${lastName}`;
}
