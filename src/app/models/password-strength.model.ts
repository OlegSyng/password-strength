export enum PasswordStrength {
    Easy,
    Medium,
    Strong,
}

export class StrengthResult {
    public strength: PasswordStrength | null = null;
    public isBelowMinLength: boolean = false;
}