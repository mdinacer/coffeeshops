export default function getRoleName(value: string) {
    switch (value) {
        case "Admin":
            return 'Administrateur';
        case "Owner":
            return 'Propriétaire';
        case "Manager":
            return 'Manager';
        case "Moderator":
            return 'Modérateur';
        case "Agent":
            return 'Serveur';
        default:
            return null;
    }
}