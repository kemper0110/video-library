import {Errors, RegistrationForm, validateLoginPassword} from "./form.ts";
import {useFormik} from "formik";
import NamedInputWithError from "./NamedInputWithError.tsx";
import {useNavigate} from "react-router";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {signUp} from "./authApi.ts";
import Spinner from "../../components/Spinner.tsx";
import useUser from "../../hooks/useUser.tsx";

type RegistrationFormErrors = Partial<Errors<RegistrationForm>>

const validateRegistrationForm = (values: Readonly<RegistrationForm>) => {
    const errors: RegistrationFormErrors = validateLoginPassword(values)
    if (!values.password2) {
        errors.password = 'Обязательное поле'
    } else if (values.password !== values.password2) {
        errors.password2 = "Пароли должны совпадать"
    }
    return errors
}


const useRegistrationMutation = () => {
    const queryClient = useQueryClient()
    const setUser = useUser(state => state.setUser)
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (form: Readonly<RegistrationForm>) => signUp(form.login, form.password),
        onSuccess: async (response) => {
            setUser(response.data)
            await queryClient.invalidateQueries([])
            await queryClient.setQueryData(["user", "info"], response.data)
            navigate('/')
        }
    })
}

const Registration = () => {
    const navigate = useNavigate()
    const registrationMutation = useRegistrationMutation()
    const formik = useFormik({
        initialValues: {
            login: "",
            password: "",
            password2: ""
        } as RegistrationForm,
        validate: validateRegistrationForm,
        validateOnBlur: true,
        validateOnChange: false,
        onSubmit: (values: Readonly<RegistrationForm>) => {
            registrationMutation.mutate(values)
        }
    })
    return (
        <div className='pt-3'>
            <form onSubmit={formik.handleSubmit}
                  className='flex flex-col p-8 pt-10 bg-gray-200/70 w-[400px] mx-auto items-center rounded-lg border border-gray-50'>
                <h1 className='text-3xl font-medium'>Регистрация</h1>
                <NamedInputWithError name='login' type='text' label='Логин' placeholder='логин'
                                     onChange={formik.handleChange} onBlur={formik.handleBlur}
                                     value={formik.values.login}
                                     error={formik.touched.login ? formik.errors.login : undefined}
                />
                <NamedInputWithError name='password' type='password' label='Пароль' placeholder='пароль'
                                     onChange={formik.handleChange} onBlur={formik.handleBlur}
                                     value={formik.values.password}
                                     error={formik.touched.password ? formik.errors.password : undefined}
                />
                <NamedInputWithError name='password2' type='password' label='Повторите пароль' placeholder='пароль'
                                     onChange={formik.handleChange} onBlur={formik.handleBlur}
                                     value={formik.values.password}
                                     error={formik.touched.password ? formik.errors.password : undefined}
                />
                <button type='submit' className='w-full bg-white mt-10 font-medium p-3 h-[60px] rounded'
                        disabled={registrationMutation.isLoading}
                >
                    {registrationMutation.isLoading ? <Spinner/> : 'Зарегистрироваться'}
                </button>
                {
                    registrationMutation.isError ?
                        <span className='text-sm text-red-500'>{
                            registrationMutation.error instanceof Error ? registrationMutation.error.message : "Ошибка выполнения"}
                    </span> : null
                }
                <h2 className='font-light text-sm mt-1 cursor-pointer' onClick={() => navigate('/login')}>Вход</h2>
            </form>
        </div>
    );
};

export default Registration;