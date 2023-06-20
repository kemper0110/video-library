import {useFormik} from "formik";
import NamedInputWithError from "./NamedInputWithError.tsx";
import {Errors, LoginForm, validateLoginPassword} from "./form.ts";
import {useNavigate} from "react-router";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {signIn} from "./authApi.ts";
import Spinner from "../../components/Spinner.tsx";
import useUser from "../../hooks/useUser.tsx";

type LoginFormErrors = Partial<Errors<LoginForm>>

const validateLoginForm = (values: Readonly<LoginForm>) => {
    return validateLoginPassword(values) as LoginFormErrors
}

export const Login = () => {
    const setUser = useUser(state => state.setUser)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const loginMutation = useMutation({
        mutationFn: (form: Readonly<LoginForm>) => signIn(form.login, form.password),
        onSuccess: async (response) => {
            setUser(response.data)
            await queryClient.invalidateQueries([])
            await queryClient.setQueryData(["user", "info"], response.data)
            navigate('/')
        }
    })
    const formik = useFormik({
        initialValues: {
            login: "",
            password: ""
        } as LoginForm,
        validate: validateLoginForm,
        validateOnBlur: true,
        validateOnChange: false,
        onSubmit: (values: Readonly<LoginForm>) => {
            loginMutation.mutate(values)
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}
              className='flex flex-col p-8 pt-10 bg-gray-200/70 w-[400px] mx-auto items-center rounded-lg border border-gray-50'>
            <h1 className='text-3xl font-medium'>Войти в систему</h1>
            <NamedInputWithError name='login' type='text' label='Логин' placeholder='12345'
                                 onChange={formik.handleChange} onBlur={formik.handleBlur}
                                 value={formik.values.login}
                                 error={formik.touched.login ? formik.errors.login : undefined}
            />
            <NamedInputWithError name='password' type='password' label='Пароль' placeholder='12345'
                                 onChange={formik.handleChange} onBlur={formik.handleBlur}
                                 value={formik.values.password}
                                 error={formik.touched.password ? formik.errors.password : undefined}
            />
            <button type='submit' className='w-full bg-white mt-10 font-medium p-2 h-[60px] rounded'
                    disabled={loginMutation.isLoading}>
                {loginMutation.isLoading ? <Spinner/> : "Войти"}
            </button>
            {
                loginMutation.isError ?
                    <span className='text-sm text-red-500'>
                        {loginMutation.error instanceof Error ? loginMutation.error.message : "Ошибка выполнения"}
                    </span> : null
            }
            <h2 className='font-light text-sm mt-1 cursor-pointer'
                onClick={() => navigate('/registration')}>Регистрация</h2>
        </form>
    )
}