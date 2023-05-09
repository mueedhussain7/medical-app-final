function Select() {
    return (
        <>
            <div className="govuk-width-container ">
                <a href='/' className="govuk-back-link">Back</a>
                <main className="govuk-main-wrapper " id="main-content" role="main">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">

                            <h1 className="govuk-heading-xl">Register or Login using your National Health number</h1>
                            <div>
                            <a href='/register' role="button" draggable="false" className="govuk-button govuk-button--start govuk-!-margin-right-6" data-module="govuk-button">
                                Register
                                <svg className="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
                                    <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
                                </svg>
                            </a>

                            <a href='/login' role="button" draggable="false" className="govuk-button govuk-button--start" data-module="govuk-button">
                                Login
                                <svg className="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
                                    <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
                                </svg>
                            </a>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </>
    );
}

export default Select;