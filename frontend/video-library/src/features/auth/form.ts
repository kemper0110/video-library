
export type LoginForm = {
    login: string
    password: string
}
export type RegistrationForm = {
    login: string
    password: string
    password2: string
}
export type Errors<T> = {
    [K in keyof T]: string
}

export interface LoginPassword {
    login: string
    password: string
}
export type LoginPasswordErrors = Partial<Errors<LoginPassword>>
export const validateLoginPassword = (values: Readonly<LoginPassword>) => {
    const errors: LoginPasswordErrors = {}
    if (!values.login) {
        errors.login = 'Обязательное поле'
    } else if (!/^[A-Za-z0-9]{3,16}$/.test(values.login)) {
        errors.login = 'Логин должен быть от 3 до 16 букв или цифр'
    }
    if (!values.password) {
        errors.password = 'Обязательное поле'
    } else if (!/^[A-Za-z0-9]{3,16}$/.test(values.password)) {
        errors.password = 'Пароль должен быть от 3 до 16 букв или цифр'
    }
    return errors
}