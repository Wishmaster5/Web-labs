
export default function Task_8({ image, title, description, buttonUrl, buttonLabel }) {
    return (
        <>

            <h1>Задание 8</h1>
            <div className="card m-5">
                <img className="card-img-top" src={image} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={buttonUrl} className="btn btn-primary">{buttonLabel}</a>
                </div>
            </div>

        </>
    )
}