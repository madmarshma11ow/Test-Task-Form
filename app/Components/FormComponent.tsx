'use client'
import { Formik, Form } from "formik"
import { InputComponent } from "./InputComponent/InputComponent"
import { type Values } from "@/types/types"
import * as Yup from "yup"
import { SelectComponent } from "./SelectComponent/SelectComponent"
import { SubmitButton } from "./SubmitButton/SubmitButton"
import { useState } from "react"
import "./FormComponent.scss"

export function FormComponent() {
    const [isMailRequired, setIsMailRequired] = useState<boolean>(false);
    const [greetingName, setGreetingName] = useState<string>('Человек');
    const [date, setDate] = useState<Date | null>(null)

    const initialValues: Values = {
        firstName: '',
        cities: '',
        password: '',
        repeatPassword: '',
        phoneNumber: '',
        emailAddress: '',
    }


    const FormSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Имя должно содержать не менее 2 символов")
            .required("Обязательное поле")
            .matches(/[а-яА-Я]/, "Имя должно содержать только кирилицу"),
        cities: Yup.string()
            .required("Обязательное поле"),
        password: Yup.string()
            .min(6, "Пароль должен содержать не менее 6 символов")
            .required("Обязательное поле")
            .matches(/^[A-Za-z]{6,}$/, "Пароль должен содержать только латинские буквы"),
        repeatPassword: Yup.string()
            .required("Обязательное поле")
            .oneOf([Yup.ref("password")], "Пароли не совпадают"),
        phoneNumber: Yup.string().matches(/^\+7\d{10}$/, "Неверный формат"),
        emailAddress: isMailRequired ? (
            Yup.string()
                .email("Неверный формат email")
                .required("Введите email")
        ) : (
            Yup.string()
                .email("Неверный формат email")
                .notRequired()
        ),
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={FormSchema}
            onSubmit={async (values, actions) => {
                setGreetingName(values.firstName);
                setDate(new Date());
                try {
                    await fetch('/api/endpoint', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values)
                    })
                    console.log('Data sending successfully')
                } catch (error) {
                    console.log('Error while sending data to server', error)
                } finally {
                    actions.resetForm();
                }
            }}
        >
            {({ values }) => (
                <Form className="form">
                    <h1 className="form-greeting">
                        Здравствуйте, <span className="form-greeting__name">{greetingName}</span>
                    </h1>
                    <InputComponent
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Введите Имя"
                        label="Имя"
                        required={true}
                        value={values.firstName}
                    />
                    <SelectComponent
                        id="cities"
                        name="cities"
                        label="Ваш город"
                        required={true}
                    />
                    <hr className="form-separator" />
                    <InputComponent
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Введите Пароль"
                        label="Пароль"
                        required={true}
                        value={values.password}
                    />
                    <InputComponent
                        id="repeatPassword"
                        name="repeatPassword"
                        type="password"
                        placeholder="Повторите Пароль"
                        label="Пароль еще раз"
                        required={true}
                        value={values.repeatPassword}
                    />
                    <hr className="form-separator" />
                    <InputComponent
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="+7 (***) ***-**-**"
                        label="Номер телефона"
                        required={false}
                        value={values?.phoneNumber}
                    />
                    <InputComponent
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        placeholder="Введите email"
                        label="Электронная почта"
                        required={isMailRequired}
                        value={values?.emailAddress}
                    />
                    <div className="form-checkbox">
                        <label className="form-checkbox__label" htmlFor="email-checkbox">
                            Я согласен
                        </label>
                        <div className="form-checkbox__container">
                            <input id="email-checkbox" className="form-checkbox__container__checkbox" type="checkbox" onChange={(e) => e.target.checked ? setIsMailRequired(true) : setIsMailRequired(false)} />
                            принимать актуальную информацию на емейл
                        </div>
                    </div>
                    <SubmitButton date={date} />
                </Form>
            )}
        </Formik >
    )
}