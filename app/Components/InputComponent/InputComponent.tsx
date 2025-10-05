import { useField } from "formik";
import type { FieldProps } from "@/types/types";
import "./InputComponent.scss"

export function InputComponent({ ...props }: FieldProps) {
    const [field, meta] = useField(props);

    return (
        <div className="input-component">
            <label className={props.required ? "input-component__label input-component__label--required" : "input-component__label"} htmlFor={props.id}>{props.label}</label>
            <div className="input-component__container">
                <input className={meta.touched && meta.error ? "input-component__input input-component__input--error" : "input-component__input"} {...field} {...props} />
                {meta.touched && meta.error && <div className={`input-component__error`}>{meta.error}</div>}
            </div>
        </div >
    )
}