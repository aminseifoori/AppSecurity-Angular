export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    clientURI: string;
}
