import "./SubmitButton.scss"

export function SubmitButton({ date }: { date: Date | null }) {
    const monthes: string[] = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    return (
        <div className="submit-button">
            <button className="submit-button__button" type="submit">Изменить</button>
            {date && <div className="submit-date">последние изменения {date?.getDate()} {monthes[date && date?.getMonth()]} в {date?.getHours() < 10 ? '0' + date?.getHours() : date?.getHours()}:{date?.getMinutes() < 10 ? '0' + date?.getMinutes() : date?.getMinutes()}</div>}
        </div>
    )
}