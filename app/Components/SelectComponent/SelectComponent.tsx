import { City, FieldProps } from "@/types/types";
import { getSortedCities } from "@/utils/cities_sorting";
import { useField } from "formik"
import { useEffect, useState } from "react"
import "./SelectComponent.scss"

export function SelectComponent({ ...props }: Omit<FieldProps, 'type' | 'placeholder' | 'value'>) {
    const [cities, setCities] = useState<City[]>([]);
    const [field, meta] = useField(props);
    useEffect(() => {
        getSortedCities().then(res => setCities(res));
    }, []);

    return (
        <div className="select-component">
            <label className="select-component__label select-component__label--required" htmlFor={props.id}>Ваш город</label>
            <div className="select-component__container">
                <select className={meta.touched && meta.error ? "select-component__select select-component__select--error" : "select-component__select"} {...field} {...props}>
                    <option value="">
                        Выберите город
                    </option>
                    {cities.map((el) => {
                        return <option id={props.id} key={el.city} value={el.city}>{el.city}</option>
                    })}
                </select>
                {meta.touched && meta.error && <div className="select-component__error">{meta.error}</div>}
            </div>
        </div>
    )
}