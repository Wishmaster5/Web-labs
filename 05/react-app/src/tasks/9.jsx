const colorClasses = {
    'red': 'alert-danger',
    'yellow': 'alert-warning',
    'green': 'alert-success'
}

export default function SmarterAlert({ text, color, show }) {
    return (
        <>
            {show ? <div className={`alert ${colorClasses[color]}`} role="alert">
                {text}
            </div> : null}
        </>
    )
}